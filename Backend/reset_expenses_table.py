from app.database import Base, engine
from app.models import Expense


if __name__ == "__main__":
    confirmation = input(
        "This will permanently delete every row in the expenses table. "
        "Type RESET to continue: "
    )

    if confirmation != "RESET":
        print("Cancelled. The expenses table was not changed.")
        raise SystemExit(0)

    Expense.__table__.drop(bind=engine, checkfirst=True)
    Expense.__table__.create(bind=engine, checkfirst=True)

    print("The expenses table was dropped and recreated successfully.")
