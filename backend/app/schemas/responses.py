from pydantic import BaseModel
from datetime import datetime


class CreateUser(BaseModel):
    id: int
    email: str
    name: str
    roles: list[str]


class User(BaseModel):
    id: int
    username: str
    firstname: str
    lastname: str
    password: str
    email: str
    address: str
    opt_into_physical_statements: bool
    created_at: datetime
