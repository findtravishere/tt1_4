from ..database import Base
from sqlalchemy import ARRAY, Column, Integer, String, ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    username = Column(String, nullable=False, unique=True)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    password = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))

class Accounts(Base):
    __tablename__ = "accounts"
    id = Column(Integer, primary_key=True, nullable=False)
    account_type = Column(Integer, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    balance = Column(Integer, nullable=False)

class Transactions(Base):
    __tablename__ = "transactions"
    id = Column(Integer, primary_key=True, nullable=False)
    account_id = Column(Integer, ForeignKey("accounts.id"))
    amount = Column(Integer, nullable=False)

