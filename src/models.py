# models.py
from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    phone_number: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str = "user"  # "user" or "admin"

class CheckoutRequest(BaseModel):
    user_email: str
    cart_items: list
    total_amount: float
    payment_method: str