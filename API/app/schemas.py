import datetime as dt
from uuid import UUID

from pydantic import BaseModel, Field

class Expense(BaseModel):
    id: UUID = Field(default_factory=UUID)
