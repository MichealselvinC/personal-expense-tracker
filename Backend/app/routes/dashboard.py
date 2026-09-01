from datetime import date

from fastapi import APIRouter, Depends
from sqlalchemy import func, extract
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_user
from ..models import Expense, User
from ..schemas import DashboardResponse


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary", response_model=DashboardResponse)
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Total expenses
    total_expenses = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(Expense.user_id == current_user.id)
        .scalar()
    )

    # Current month
    today = date.today()

    monthly_expenses = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(
            Expense.user_id == current_user.id,
            func.extract("month", Expense.expense_date) == today.month,
            func.extract("year", Expense.expense_date) == today.year
        )
        .scalar()
    )

    # Today
    today_expenses = (
        db.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(
            Expense.user_id == current_user.id,
            Expense.expense_date == today
        )
        .scalar()
    )

    # Category breakdown
    category_data = (
        db.query(
            Expense.category,
            func.sum(Expense.amount).label("total")
        )
        .filter(Expense.user_id == current_user.id)
        .group_by(Expense.category)
        .order_by(func.sum(Expense.amount).desc())
        .all()
    )

    category_breakdown = [
        {
            "category": category,
            "total": float(total)
        }
        for category, total in category_data
    ]

    # Recent expenses
    recent_expenses = (
        db.query(Expense)
        .filter(Expense.user_id == current_user.id)
        .order_by(Expense.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "total_expenses": float(total_expenses),
        "monthly_expenses": float(monthly_expenses),
        "today_expenses": float(today_expenses),
        "category_breakdown": category_breakdown,
        "recent_expenses": recent_expenses
    }
@router.get("/monthly")
def monthly_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    results = (
        db.query(
            extract("month", Expense.expense_date).label("month"),
            func.sum(Expense.amount).label("total")
        )
        .filter(Expense.user_id == current_user.id)
        .group_by(
            extract("month", Expense.expense_date)
        )
        .order_by(
            extract("month", Expense.expense_date)
        )
        .all()
    )


    month_names = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]


    return [
        {
            "month": month_names[int(month) - 1],
            "total": float(total)
        }
        for month, total in results
    ]