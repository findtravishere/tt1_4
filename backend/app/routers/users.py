from ..models.models import User
from ..schemas import responses, inputs
from app.auth.oauth2 import pwd_context
from fastapi import status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["User"])

from .. import main


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_user(password: str):
    print(main.user)
    hashed_pwd = pwd_context.hash(password)
    print(hashed_pwd)

    return hashed_pwd


@router.delete("/delete", status_code=status.HTTP_200_OK)
async def delete_user(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == id).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id:{id} was not found")

    try:
        db.delete(user)
        db.commit()
    except Exception as error:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Error deleting user --> {error}")

    return {"message": f"User with id={id} was deleted successfully"}


@router.get("/by-id", response_model=responses.User)
async def get_user_by_id(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user with id={id} was not found")
    return responses.User(**user.__dict__)


@router.post("/seed")
async def seed_users(db: Session = Depends(get_db)):
    # 1234: normie rights,
    # 2354: admin rights
    seed_users = [
        User(
            **{
                "email": "normie@example.com",
                "name": "Normie",
                "password": pwd_context.hash("password"),
                "roles": [1234],
            }
        ),
        User(
            **{
                "email": "admin@example.com",
                "name": "Admin",
                "password": pwd_context.hash("password"),
                "roles": [1234, 2345],
            }
        ),
    ]

    try:
        db.add_all(seed_users)
        db.commit()

    except Exception as error:
        db.rollback()
        raise HTTPException(error)

    response = list(map(lambda user: responses.User(**user.__dict__), seed_users))
    return response
