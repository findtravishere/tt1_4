from pydantic import BaseModel


class CreateUser(BaseModel):
    userId: str
    username: str
    password: str
    firstName: str
    lastName: str
    email: str
    address: str
    optIntoPhyStatements: str

