from ..models.models import Users
from ..schemas import responses, inputs
from app.auth.oauth2 import pwd_context
from fastapi import status, HTTPException, Depends, APIRouter
from ..database import get_db
from sqlalchemy.orm import Session

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_user(user: inputs.CreateUser, db: Session = Depends(get_db)):
    hashed_pwd = pwd_context.hash(user.Password)
    new_user = Users(**user.dict())
    new_user.Password = hashed_pwd
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    except Exception as error:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=f"Email already in use --> {error}")
    return responses.User(**new_user.__dict__)


@router.delete("/delete", status_code=status.HTTP_200_OK)
async def delete_user(id: int, db: Session = Depends(get_db)):
    user = db.query(Users).filter(Users.id == id).first()

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
    user = db.query(Users).filter(Users.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"user with id={id} was not found")
    return responses.User(**user.__dict__)


@router.post("/seed", response_model=list[responses.User])
async def seed_users(db: Session = Depends(get_db)):
    # 1234: normie rights,
    # 2354: admin rights
    seed_users = [
        Users(
            **{
                "email": "normie@example.com",
                "username": "Normie",
                "firstname": "Normie",
                "lastname": "Normie",
                "address": "block 1",
                "opt_into_physical_statements": False,
                "password": pwd_context.hash("password"),
            }
        ),
        Users(
            **{
                "email": "admin@example.com",
                "username": "Admin",
                "firstname": "Admin",
                "lastname": "Admin",
                "address": "block 2",
                "address": "block 2",
                "opt_into_physical_statements": True,
                "password": pwd_context.hash("password"),
            }
        ),
    ]

    try:
        db.add_all(seed_users)
        db.commit()
    except ValueError:
        db.rollback()
        raise HTTPException("Value Error: probably already created")
    except Exception as error:
        db.rollback()
        raise HTTPException(error)

    added = db.query(Users).all()
    print(type(added[0].created_at))
    response = list(map(lambda user: responses.User(**user.__dict__), added))
    return response
