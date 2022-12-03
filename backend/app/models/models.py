from ..database import Base
from sqlalchemy import ARRAY, Column, Integer, String, Boolean, Float,ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Users(Base):
    __tablename__ = "users"
    UserID = Column(Integer, primary_key=True, nullable=False,autoincrement=True)
    Username = Column(String, nullable=False, unique=True)
    Firstname = Column(String, nullable=False)
    Lastname = Column(String, nullable=False)
    Password = Column(String, nullable=False)
    Email = Column(String, nullable=False)
    Address = Column(String, nullable=False)
    OptIntoPhyStatements = Column(Boolean, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))

class ScheduledTransactions(Base):
    __tablename__ = "scheduledtransactions"
    TransactionID = Column(Integer, primary_key=True, nullable=False, unique=True,autoincrement=True)
    AccountID = Column(String,ForeignKey( "bankaccounts.AccountID", ondelete="CASCADE"), nullable=True,  unique=True)
    ReceivingAccountID = Column(String, nullable=True)
    Date = Column(String, nullable=True)
    TransactionAmount = Column(String, nullable=True)
    Comment = Column(Boolean, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))

class BankAccount(Base):
    __tablename__ = "bankaccounts"
    AccountID = Column(Integer, primary_key=True, nullable=False, unique=True,autoincrement=True)
    UserID = Column(String,ForeignKey( "users.UserID", ondelete="CASCADE"), nullable=False, unique=True)
    AccountType = Column(String, nullable=True)
    AccountBalance = Column(Float, nullable=True)