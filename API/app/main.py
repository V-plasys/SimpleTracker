import json
import os
import threading
from pathlib import Path
from uuid import UUID, uuid4

from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware

from .schemas import Expense

DATA_FILE = Path(__file__).resolve().parent.parent / "db" / "expenses.json"
lock = threading.Lock()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def load_expenses() -> list[Expense]:
    data = []
    if not DATA_FILE.exists() or DATA_FILE.stat().st_size == 0:
        return data
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)
    return [Expense(**item) for item in data]


def save_expenses(expenses) -> None:
    tmp = DATA_FILE.with_suffix(".tmp")
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump([expense.model_dump(mode="json") for expense in expenses], f, indent=4)
    os.replace(tmp, DATA_FILE)


@app.get("/expenses", response_model=list[Expense])
def get_expenses():
    with lock:
        return load_expenses()

@app.post("/expenses", response_model=Expense, status_code=201)
def create_expense(expense: Expense):
    expense.id = uuid4()
    with lock:
        expenses = load_expenses()
        expenses.append(expense)
        save_expenses(expenses)
    return expense

@app.delete("/expenses/{expense_id}", status_code=204)
def delete_expense(expense_id: UUID):
    with lock:
        expenses = load_expenses()
        new_expenses = [expense for expense in expenses if expense.id != expense_id]
        if len(new_expenses) == len(expenses):
            raise HTTPException(status_code=404, detail="Expense not found")
        save_expenses(new_expenses)
    return Response(status_code=204)