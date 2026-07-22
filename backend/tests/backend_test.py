"""Backend API tests for Thrumline Fit-form submission service."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://thrumline-web-build.preview.emergentagent.com").rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health check
def test_health(api):
    r = api.get(f"{BASE_URL}/api/health")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


def test_root(api):
    r = api.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json().get("service") == "Thrumline API"


# Fit submission - valid
def test_fit_submit_valid_and_persistence(api):
    payload = {
        "name": "TEST_Ranger",
        "business": "TEST_Thrumline QA",
        "email": "test_ranger@example.com",
        "prompt": "TEST_prompt line for automated verification",
    }
    r = api.post(f"{BASE_URL}/api/fit/submit", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["name"] == payload["name"]
    assert data["business"] == payload["business"]
    assert data["email"] == payload["email"]
    assert data["prompt"] == payload["prompt"]
    assert isinstance(data.get("id"), str) and len(data["id"]) > 0
    assert "submitted_at" in data

    # Verify via listing
    r2 = api.get(f"{BASE_URL}/api/fit/submissions")
    assert r2.status_code == 200
    ids = [row["id"] for row in r2.json()]
    assert data["id"] in ids


# Fit submission - missing email
def test_fit_submit_missing_email(api):
    r = api.post(f"{BASE_URL}/api/fit/submit", json={
        "name": "TEST_A", "business": "TEST_B", "prompt": "x"
    })
    assert r.status_code == 422


# Fit submission - invalid email
def test_fit_submit_invalid_email(api):
    r = api.post(f"{BASE_URL}/api/fit/submit", json={
        "name": "TEST_A", "business": "TEST_B", "email": "not-an-email", "prompt": "x"
    })
    assert r.status_code == 422


# Fit submission - missing required (name)
def test_fit_submit_missing_name(api):
    r = api.post(f"{BASE_URL}/api/fit/submit", json={
        "business": "TEST_B", "email": "a@b.com", "prompt": "x"
    })
    assert r.status_code == 422
