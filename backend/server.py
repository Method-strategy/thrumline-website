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


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

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
    """Receive a fit-check form submission. Stored in Mongo; also logged so the
    inbox at conversation@thrumline.com can be wired up at Cloudflare deploy."""
    try:
        submission = FitSubmission(**payload.model_dump())
        doc = submission.model_dump()
        doc['submitted_at'] = doc['submitted_at'].isoformat()
        await db.fit_submissions.insert_one(doc)
        logger.info(
            "Fit submission: name=%s business=%s email=%s prompt=%s",
            submission.name, submission.business, submission.email, submission.prompt,
        )
        # TODO(cloudflare): forward to conversation@thrumline.com via Resend/Postmark.
        return submission
    except Exception as e:
        logger.exception("Fit submission failed: %s", e)
        raise HTTPException(status_code=500, detail="Could not save submission")


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
