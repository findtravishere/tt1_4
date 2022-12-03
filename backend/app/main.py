from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from app.schemas.responses import User
from app.auth.oauth2 import get_current_user
from app.routers import auth, users
from app.config import settings

app = FastAPI(root_path=f"{settings.root_path}")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Routers
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/users/me", response_model=User)
async def readUsersMe(currentUser: User = Depends(get_current_user)):
    return User(**currentUser.__dict__)
