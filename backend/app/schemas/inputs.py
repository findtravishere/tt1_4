from pydantic import BaseModel


class CreateUser(BaseModel):
    Username: str
    Email: str
    Address: str
    Firstname: str
    Lastname: str
    Email: str
    Address: str
    OptIntoPhyStatements: bool
