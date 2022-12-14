from ..database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey, Date
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    username = Column(String, nullable=False, unique=True)
    firstname = Column(String, nullable=False)
    lastname = Column(String, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, nullable=False)
    address = Column(String, nullable=False)
    opt_into_physical_statements = Column(Boolean, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))


class ScheduledTransactions(Base):
    __tablename__ = "scheduledtransactions"
    id = Column(Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    account_id = Column(Integer, ForeignKey("bankaccounts.id"), nullable=False)
    receiving_account_id = Column(Integer, ForeignKey("bankaccounts.id"), nullable=False)
    date = Column(Date, nullable=False, server_default=text("now()"))
    transaction_amount = Column(String, nullable=True)
    comment = Column(Boolean, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))


class BankAccount(Base):
    __tablename__ = "bankaccounts"
    id = Column(Integer, primary_key=True, nullable=False, unique=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    account_type = Column(String, nullable=False)
    balance = Column(Float, nullable=False, server_default=text("0"))
