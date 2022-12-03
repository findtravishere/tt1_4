from ..database import Base
from sqlalchemy import ARRAY, Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.dialects.mysql import FLOAT
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text


class User(Base):
    __tablename__ = "user"
    user_id = Column(Integer, primary_key=True, nullable=False)
    username = Column(String(20), nullable = True, default = None)
    password = Column(String(20), nullable = True, default = None)
    first_name = Column(String(255), nullable = True, default = None)
    last_name = Column(String(255), nullable = True, default = None)
    email = Column(String(255), nullable=True, default = None)
    address = Column(String(255), nullable=True, default = None)
    opt_into_phy_statements = Column(Boolean, nullable=True, default = None)

    
class BankAccount(Base):
    __tablename__ = "bank_account"
    account_id = Column(Integer, primary_key = True, nullable = False)
    user_id = Column(Integer, ForeignKey("User.user_id"), primary_key = True, nullable = False)
    account_type = Column(String(255), nullable = True, default = None)
    account_balance = Column(FLOAT(precision=10, scale=2), nullable = True, default = None)
    
    
class ScheduledTransactions(Base):
    __tablename__ = "scheduled_transactions"
    transaction_id = Column(Integer, primary_key = True, nullable = False)
    account_id = Column(Integer, ForeignKey("User.user_id"), primary_key = True, nullable = False)
    receiving_account_id = Column(Integer, nullable = True, default = None)
    date = Column(String(255), nullable = True, default = None)
    transaction_amount = Column(FLOAT(precision=10, scale=2), nullable = True, default = None)
    comment = Column(String(255), nullable = True, default = None)
    
    
