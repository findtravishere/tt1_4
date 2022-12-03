from ..schemas import schemas
from ..models import models
from ..auth.oauth2 import pwd_context, create_access_token
from fastapi import status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from .. import main
router = APIRouter(prefix="/login", tags=["Authentication"])


@router.post("")
def login(credentials: OAuth2PasswordRequestForm = Depends()):

    userCheck = list(filter(lambda x:x["Email"]== credentials.username, main.user))
    
    if not userCheck: 
        return {"ERROR":"INVALID CREDENTIALS"}
    else:
        userCheck = userCheck[0]
    token = create_access_token(data=schemas.TokenData(
        **{"id": userCheck["UserID"],
        "email": userCheck["Email"],
"name": userCheck["Firstname"] + userCheck["Lastname"]
        }
    ).dict())

    return {"access_token": token, "token_type": "bearer"}
