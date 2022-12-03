from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: int | None = None
    email: str | None = None
    name: str | None = None
    roles: list[str] | None = None
