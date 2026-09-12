from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database import get_db
from ..dependencies import get_current_user
from ..models import Income, User
from ..schemas import IncomeCreate, IncomeResponse


router = APIRouter(
    prefix="/income",
    tags=["Income"]
)


@router.post("/", response_model=IncomeResponse)
def create_income(
    income: IncomeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_income = Income(
        user_id=current_user.id,
        amount=income.amount,
        source=income.source,
        description=income.description,
        income_date=income.income_date
    )

    db.add(new_income)
    db.commit()
    db.refresh(new_income)

    return new_income


@router.get("/", response_model=list[IncomeResponse])
def get_income(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Income)
        .filter(Income.user_id == current_user.id)
        .order_by(Income.income_date.desc())
        .all()
    )


@router.delete("/{income_id}")
def delete_income(
    income_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    income = (
        db.query(Income)
        .filter(
            Income.id == income_id,
            Income.user_id == current_user.id
        )
        .first()
    )

    if not income:
        raise HTTPException(status_code=404, detail="Income not found")

    db.delete(income)
    db.commit()

    return {"message": "Income deleted successfully"}