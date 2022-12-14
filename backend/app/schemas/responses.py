from pydantic import BaseModel


class CreateUser(BaseModel):
    id: int
    email: str
    name: str
    roles: list[str]


class User(BaseModel):
    id: int
    email: str
    username: str
    firstname: str
    lastname: str

