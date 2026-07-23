"""
Thrumline backend.

Small FastAPI service that receives Fit-form submissions and stores them in Mongo.
On Cloudflare Pages deployment, this endpoint will be replaced by a Cloudflare
Function (or Worker) that writes to KV/D1 and forwards to the conversation@thrumline.com
inbox. Keep the shape identical so the frontend does not change.
"""
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from html import escape as html_escape
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Emergent-managed Resend proxy — constant, do NOT read from env so it
# survives deployment (the platform injects only EMERGENT_EMAIL_KEY).
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Thrumline")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "hello@thrumline.com")

app = FastAPI(title="Thrumline API")
api_router = APIRouter(prefix="/api")


# ─────────────────────────────────────────────────────────────
# Models
# ─────────────────────────────────────────────────────────────
class FitSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(min_length=1, max_length=120)
    business: str = Field(min_length=1, max_length=160)
    email: EmailStr
    prompt: str = Field(min_length=1, max_length=600)  # "one line on what prompted the visit"
    referrer: Optional[str] = None
    submitted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class FitSubmissionCreate(BaseModel):
    name: str
    business: str
    email: EmailStr
    prompt: str
    referrer: Optional[str] = None


# ─────────────────────────────────────────────────────────────
# Routes
# ─────────────────────────────────────────────────────────────
@api_router.get("/")
async def root():
    return {"service": "Thrumline API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/fit/submit", response_model=FitSubmission)
async def submit_fit(payload: FitSubmissionCreate):
    """Receive a fit-check form submission. Persist to Mongo, then forward to
    OWNER_EMAIL via the Emergent-managed Resend proxy. Email send failures
    never block the response — the submission is already saved."""
    try:
        submission = FitSubmission(**payload.model_dump())
        doc = submission.model_dump()
        doc['submitted_at'] = doc['submitted_at'].isoformat()
        await db.fit_submissions.insert_one(doc)
        logger.info(
            "Fit submission: name=%s business=%s email=%s prompt=%s",
            submission.name, submission.business, submission.email, submission.prompt,
        )

        # Forward to the business inbox. Non-blocking failure — we do not
        # surface send errors to the visitor.
        if EMAIL_KEY:
            try:
                await _forward_fit_submission(submission)
            except Exception as send_err:
                logger.warning("Fit email forward failed (submission still saved): %s", send_err)

        return submission
    except Exception as e:
        logger.exception("Fit submission failed: %s", e)
        raise HTTPException(status_code=500, detail="Could not save submission")


async def _forward_fit_submission(s: "FitSubmission") -> None:
    """Send the fit submission to OWNER_EMAIL via the Emergent-managed Resend
    proxy. Uses inline CSS + a table layout so it renders cleanly across the
    long tail of desktop and mobile email clients."""
    submitted_local = s.submitted_at.strftime("%b %d, %Y  %H:%M UTC")
    referrer = s.referrer or "—"
    subject = f"New fit request · {s.business}"

    def row(label: str, value: str) -> str:
        return (
            f'<tr><td style="padding:14px 0;border-bottom:1px solid #E5E7EB;'
            f'font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:1.4px;'
            f'text-transform:uppercase;color:#6B7280;width:150px;vertical-align:top;">{label}</td>'
            f'<td style="padding:14px 0;border-bottom:1px solid #E5E7EB;'
            f'font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;'
            f'color:#111827;vertical-align:top;">{value}</td></tr>'
        )

    html = f"""\
<!doctype html><html><body style="margin:0;background:#F4F5F7;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F5F7;">
  <tr><td align="center" style="padding:40px 20px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0"
      style="background:#FFFFFF;border:1px solid #E5E7EB;border-radius:6px;max-width:600px;">
      <tr><td style="padding:36px 40px 12px 40px;">
        <div style="font-family:Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:2px;
          text-transform:uppercase;color:#184887;font-weight:600;">Signal · New fit</div>
        <h1 style="margin:14px 0 4px 0;font-family:Georgia,'Times New Roman',serif;
          font-size:26px;line-height:1.2;color:#111827;font-weight:500;">
          A new conversation started.
        </h1>
        <p style="margin:0;font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#6B7280;">
          Submitted {html_escape(submitted_local)}
        </p>
      </td></tr>
      <tr><td style="padding:8px 40px 32px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          {row("Name",     html_escape(s.name))}
          {row("Business", html_escape(s.business))}
          {row("Email",    f'<a href="mailto:{html_escape(s.email)}" style="color:#184887;text-decoration:none;">{html_escape(s.email)}</a>')}
          {row("Prompt",   html_escape(s.prompt).replace(chr(10), '<br>'))}
          {row("Referrer", html_escape(referrer))}
        </table>
        <p style="margin:28px 0 0 0;font-family:Helvetica,Arial,sans-serif;font-size:12px;
          color:#9CA3AF;">Sent by the Thrumline site. Reply directly to reach the visitor.</p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>"""

    payload = {
        "to": [OWNER_EMAIL],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
        "contact_email": s.email,  # sets Reply-To → visitor's inbox
    }
    async with httpx.AsyncClient(timeout=30) as http:
        resp = await http.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    logger.info("Fit email forwarded → %s (id=%s)", OWNER_EMAIL, resp.json().get("id"))


@api_router.get("/fit/submissions", response_model=List[FitSubmission])
async def list_fit_submissions():
    """Read-only listing (for build-time verification). Not exposed in navigation."""
    rows = await db.fit_submissions.find({}, {"_id": 0}).sort("submitted_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('submitted_at'), str):
            r['submitted_at'] = datetime.fromisoformat(r['submitted_at'])
    return rows


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("thrumline")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
