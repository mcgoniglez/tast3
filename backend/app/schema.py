from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
import enum

class UserRole(str, enum.Enum):
    admin = "Admin"
    manager = "Manager"
    employee = "Employee"

class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: UserRole

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True

class TaskStatus(str, enum.Enum):
    pending = "Pending"
    in_progress = "In Progress"
    completed = "Completed"

class TaskBase(BaseModel):
    title: str
    description: Optional[str]
    due_date: datetime
    status: TaskStatus = TaskStatus.pending
    assigned_to_id: Optional[int]

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class TaskOut(TaskBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str
