import os
import requests
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional

app = FastAPI(title="AuraMart API")

# Update origins to allow local development and your Vercel frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://aura-mart-beta.vercel.app", 
        "https://aura-mart-d2x6m9nzr-daniels-projects-198c9652.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paystack Secret Key (best loaded from environment variable or set test key fallback)
PAYSTACK_SECRET_KEY = os.getenv("PAYSTACK_SECRET_KEY", "sk_test_YOUR_PAYSTACK_SECRET_KEY")

# Mock user database
USERS_DB = {
    "admin@auramart.com": {
        "name": "Store Admin",
        "email": "admin@auramart.com",
        "password": "adminpassword",
        "phone": "+1234567890",
        "role": "admin"
    }
}

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class VerifyPaymentRequest(BaseModel):
    reference: str
    user_email: str
    cart_items: List[dict]
    total_amount: float

@app.get("/")
def home():
    return {"status": "success", "message": "AuraMart FastAPI backend is active"}

@app.post("/api/auth/signup")
def signup(data: SignupRequest):
    if data.email in USERS_DB:
        raise HTTPException(status_code=400, detail="An account with this email already exists.")
    
    new_user = {
        "name": data.name,
        "email": data.email,
        "password": data.password,
        "phone": data.phone or "",
        "role": "user"
    }
    USERS_DB[data.email] = new_user

    return {
        "status": "success",
        "user": {
            "name": new_user["name"],
            "email": new_user["email"],
            "role": new_user["role"],
            "token": f"mock-jwt-token-{data.email}"
        }
    }

@app.post("/api/auth/login")
def login(data: LoginRequest):
    user = USERS_DB.get(data.email)
    
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {
        "status": "success",
        "user": {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "token": f"mock-jwt-token-{data.email}"
        }
    }

@app.get("/api/admin/dashboard")
def get_admin_dashboard(x_user_role: Optional[str] = Header(None, alias="X-User-Role")):
    if x_user_role != "admin":
        raise HTTPException(status_code=403, detail="Access denied. Admin privileges required.")
    
    return {
        "status": "success",
        "stats": {
            "total_sales": "$12,450.00",
            "active_orders": 8,
            "total_customers": len(USERS_DB)
        }
    }

@app.post("/api/checkout/verify")
def verify_paystack_payment(data: VerifyPaymentRequest):
    if not data.user_email:
        raise HTTPException(status_code=401, detail="Authentication required to process order.")

    # 1. Call Paystack Verification API
    url = f"https://api.paystack.co/transaction/verify/{data.reference}"
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}"
    }

    try:
        response = requests.get(url, headers=headers)
        res_data = response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to connect to payment server: {str(e)}")

    if not res_data.get("status"):
        raise HTTPException(status_code=400, detail=res_data.get("message", "Invalid transaction reference."))

    tx_data = res_data.get("data", {})

    # 2. Check if transaction was successful
    if tx_data.get("status") != "success":
        raise HTTPException(status_code=400, detail="Transaction was not successful.")

    # 3. Verify paid amount matches (Paystack amounts are in kobo/lowest unit)
    expected_amount_kobo = int(round(data.total_amount * 100))
    paid_amount_kobo = tx_data.get("amount", 0)

    if paid_amount_kobo < expected_amount_kobo:
        raise HTTPException(status_code=400, detail="Paid amount is less than expected total.")

    return {
        "status": "success",
        "message": "Payment verified and order processed successfully",
        "order_id": f"AM-2026-{tx_data.get('id')}",
        "transaction_reference": data.reference,
        "amount_paid": paid_amount_kobo / 100
    }