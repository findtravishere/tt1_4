from ..database import Base
from sqlalchemy import ARRAY, Column, Integer, String, ForeignKey, Boolean, Float
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class Users(Base):
    __tablename__ = "User"
    UserID = Column(String, primary_key=True, nullable=True, unique=True)
    Username = Column(String, nullable=True, unique=True)
    Password = Column(String, nullable=True)
    FirstName = Column(String, nullable=True)
    LastName = Column(String, nullable=True)
    Email = Column(String, nullable=True, unique=True)
    Address = Column(String, nullable=True, unique=True)
    OptIntoPhyStatements = Column(Boolean, nullable=True, default=True)

class BankAccounts(Base):
    __tablename__ = "BankAccount"
    AccountID = Column(String, primary_key=True, nullable=False, unique=True)
    user_id = Column(String, ForeignKey("User.UserID"), nullable=False)
    AccountType = Column(String, nullable=True)
    AccountBalance = Column(ARRAY(Integer), nullable=True)

class ScheduledTransactions(Base):
    __tablename__ = "scheduled_transactions"
    TransactionId = Column(String, primary_key=True, nullable=False, unique=True)
    AccountID = Column(String, ForeignKey("BankAccount.AccountID"), nullable=False)
    ReceivingAccountID = Column(ARRAY(Integer), nullable=True)
    Date = Column(TIMESTAMP(timezone=True), nullable=True, server_default=text("now()"))
    TransationAmount = Column(Float(precision=10, scale=2, nullable=True))
    Comment = Column(String, nullable=True, unique=True)