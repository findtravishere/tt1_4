from pydantic import BaseModel


class CreateUser(BaseModel):
    email: str
    name: str
    password: str
