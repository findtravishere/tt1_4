from ..schemas import schemas
from ..models import models
from ..auth.oauth2 import pwd_context, create_access_token
from fastapi import status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

router = APIRouter(prefix="/login", tags=["Authentication"])


@router.post("", response_model=schemas.Token)
def login(credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):

    user = db.query(models.Users).filter(models.Users.email == credentials.username).first()

    if not user or not pwd_context.verify(credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    token = create_access_token(data=schemas.TokenData(**user.__dict__).dict())

    return {"access_token": token, "token_type": "bearer"}
