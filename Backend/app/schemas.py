from pydantic import BaseModel, Field
from datetime import date, datetime


# =========================
# Expense Schemas
# =========================

class ExpenseCreate(BaseModel):
    amount: float = Field(gt=0)
    category: str = Field(min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=255)
    expense_date: date


class ExpenseResponse(BaseModel):
    id: int
    amount: float
    category: str
    description: str | None
    expense_date: date
    created_at: datetime

    class Config:
        from_attributes = True


# =========================
# User Schemas
# =========================

class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: str
    password: str = Field(min_length=6, max_length=100)


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    email: str
    password: str


class CategorySummary(BaseModel):
    category: str
    total: float


class DashboardResponse(BaseModel):
    total_expenses: float
    monthly_expenses: float
    today_expenses: float
    category_breakdown: list[CategorySummary]
    recent_expenses: list[ExpenseResponse]