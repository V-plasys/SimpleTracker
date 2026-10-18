import datetime
from uuid import UUID, uuid4

from pydantic import BaseModel, Field

class Expense(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    description: str = Field(min_length=1)
    amount: float = Field(gt=0)
    date: datetime.date