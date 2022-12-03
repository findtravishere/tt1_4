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
def login(email:str, password:str):

    userCheck = list(filter(lambda x:x["Email"]== email, main.user))
    


    if not userCheck: 
        return {"ERROR":"INVALID CREDENTIALS"}
    else:
        userCheck = userCheck[0]
        if userCheck["Password"] != password:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    token = create_access_token(data=schemas.TokenData(
        **{"id": userCheck["UserID"],
        "email": userCheck["Email"],
"name": userCheck["Firstname"] + userCheck["Lastname"]
        }
    ).dict())

    data = userCheck.copy()
    del data["Password"]

    return {"access_token": token, "token_type": "bearer", "data": data}
