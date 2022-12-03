from pydantic import BaseModel


class CreateUser(BaseModel):
    id: int
    email: str
    name: str
    roles: list[str]


class User(BaseModel):
    id: int
    username: str
    password: str
    firstName: str
    secondName: str
    email: str
    address: str
    optIntoPhyStatements: int
    
class Account(BaseModel):
    accntId: int
    userId: int
