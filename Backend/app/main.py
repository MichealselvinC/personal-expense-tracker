from fastapi import FastAPI

from .database import engine, Base
from . import models
from .routes import expenses, auth, dashboard

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Personal Expense Tracker API",
    version="1.0.0"
)


app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(dashboard.router)


@app.get("/")
def home():
    return {
        "message": "Expense Tracker API is running 🚀"
    }