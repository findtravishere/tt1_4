from ..database import Base
from sqlalchemy import ARRAY, Column, Integer, String, Boolean, Float
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Users(Base):
    __tablename__ = "users"
    UserID = Column(Integer, primary_key=True, nullable=False)
    Username = Column(String, nullable=False, unique=True)
    Firstname = Column(String, nullable=True)
    Lastname = Column(String, nullable=True)
    Email = Column(String, nullable=True)
    Address = Column(String, nullable=True)
    OptIntoPhyStatements = Column(Boolean, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))

class ScheduledTransactions(Base):
    __tablename__ = "scheduledtransactions"
    TransactionID = Column(Integer, primary_key=True, nullable=False, unique=True)
    AccountID = Column(String, primary_key=True, nullable=False, unique=True)
    ReceivingAccountID = Column(String, nullable=True)
    Date = Column(String, nullable=True)
    TransactionAmount = Column(String, nullable=True)
    Comment = Column(Boolean, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))

class BankAccount(Base):
    __tablename__ = "backaccounts"
    AccountID = Column(Integer, primary_key=True, nullable=False, unique=True)
    UserID = Column(String, primary_key=True, nullable=False, unique=True)
    AccountType = Column(String, nullable=True)
    AccountBalance = Column(Float, nullable=True)