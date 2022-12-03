from fastapi import Depends, status, HTTPException
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import models
from app.schemas import schemas
from ..config import settings
from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = f"{settings.secret_key}"
ALGORITHM = f"{settings.algorithm}"
ACCESS_TOKEN_EXPIRE_MINUTES = int(f"{settings.access_token_expire_minutes}")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.root_path}/login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(data: dict):
    to_encode = data.copy()
    expiration_time = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expiration_time})

    encoded_token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_token


def verify_access_token(token: str, credentials_exception) -> schemas.TokenData | Exception:
    try:
        payload = jwt.decode(token, SECRET_KEY)
        tokenData = schemas.TokenData(**payload)

        if not tokenData.id or not tokenData.roles:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    return tokenData


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail=f"could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    tokenData = verify_access_token(token=token, credentials_exception=credentials_exception)
    user = db.query(models.Users).filter(models.Users.id == tokenData.id).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id:{tokenData.id} was not found")

    return user
