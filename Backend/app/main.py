from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from . import models
from .routes import auth, expenses, income, dashboard


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Personal Expense Tracker API",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(income.router)
app.include_router(dashboard.router)


@app.get("/")
def home():
    return {
        "message": "Expense Tracker API is running 🚀"
    }