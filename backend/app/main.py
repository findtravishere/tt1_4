from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from app.schemas.responses import User, Account
from app.auth.oauth2 import get_current_user
from app.routers import auth, users
from app.config import settings
from datetime import datetime

import datetime

app = FastAPI(root_path=f"{settings.root_path}")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Routers
app.include_router(auth.router)
app.include_router(users.router)

accounts = [
    {
        "AccountID": 621156213,
        "UserID": 1,
        "AccountType": "Saving",
        "AcccountBalance": 70200.71
    },
    {
        "AccountID": 958945214,
        "UserID": 1,
        "AccountType": "Current",
        "AcccountBalance": 99720.46
    },
    {
        "AccountID": 828120424,
        "UserID": 2,
        "AccountType": "Multiplier",
        "AcccountBalance": 50640.12
    },
    {
        "AccountID": 322798030,
        "UserID": 3,
        "AccountType": "Multiplier",
        "AcccountBalance": 39740.17
    },
    {
        "AccountID": 353677039,
        "UserID": 3,
        "AccountType": "Saving",
        "AcccountBalance": 76660.21
    },
    {
        "AccountID": 259555772,
        "UserID": 4,
        "AccountType": "Saving",
        "AcccountBalance": 14020.58
    },
    {
        "AccountID": 339657462,
        "UserID": 1,
        "AccountType": "Current",
        "AcccountBalance": 47380.33
    },
    {
        "AccountID": 785703027,
        "UserID": 5,
        "AccountType": "Current",
        "AcccountBalance": 42460.32
    }
]

txn = [
    {
        "TransactionID": 1,
        "AccountID": 621156213,
        "ReceivingAccountID": 339657462,
        "Date": "2022-11-08T04:00:00.000Z",
        "TransactionAmount": 500.00,
        "Comment": "Monthly Pocket Money"
    },
    {
        "TransactionID": 2,
        "AccountID": 958945214,
        "ReceivingAccountID": 621156213,
        "Date": "2022-11-08T04:00:00.000Z",
        "TransactionAmount": 8996.00,
        "Comment": "School Fees"
    },
    {
        "TransactionID": 3,
        "AccountID": 828120424,
        "ReceivingAccountID": 322798030,
        "Date": "2022-12-25T04:00:00.000Z",
        "TransactionAmount": 3000.00,
        "Comment": "Driving Centre Top-up"
    },
    {
        "TransactionID": 4,
        "AccountID": 353677039,
        "ReceivingAccountID": 785703027,
        "Date": "2022-11-17T06:21:00.000Z",
        "TransactionAmount": 255.00,
        "Comment": "Tuition Fee Payment"
    },
    {
        "TransactionID": 5,
        "AccountID": 259555772,
        "ReceivingAccountID": 828120424,
        "Date": "2022-11-08T04:00:00.000Z",
        "TransactionAmount": 32.00,
        "Comment": "Books Payment"
    }
]

user =[
    {
        "UserID": 1,
        "Username": "ExecutiveDBS",
        "Password": "DBSBestBank2022",
        "Firstname": "Tom",
        "Lastname": "Lim",
        "Email": "TomLim@easymail.com",
        "Address": "Block 123 Serangoon Garden #10-129",
        "OptIntoPhyStatements": 0
    },
    {
        "UserID": 2,
        "Username": "SeederDBS",
        "Password": "iWant2JoinDBS",
        "Firstname": "Mary",
        "Lastname": "Tan",
        "Email": "MaryTan@simplemail.com",
        "Address": "Block 234 Changi Business Park #50-123",
        "OptIntoPhyStatements": 1
    },
    {
        "UserID": 3,
        "Username": "AcerDBS",
        "Password": "Top5Seeder",
        "Firstname": "Gary",
        "Lastname": "Ong",
        "Email": "GaryOng@easymail.com",
        "Address": "Block 345 Jurong Business Park #25-214",
        "OptIntoPhyStatements": 0
    },
    {
        "UserID": 4,
        "Username": "AssociateDBS",
        "Password": "Whatis2Years",
        "Firstname": "Harry",
        "Lastname": "Goh",
        "Email": "HarryGoh@bestbank.com",
        "Address": "Block 456 One North Fusionopolis #34-743",
        "OptIntoPhyStatements": 0
    },
    {
        "UserID": 5,
        "Username": "PresidentDBS",
        "Password": "Multiplier3.5%",
        "Firstname": "Cheryl",
        "Lastname": "Chia",
        "Email": "CherylChia@bestbank.com",
        "Address": "Block 567 Marina Bay Sands #63-743",
        "OptIntoPhyStatements": 1
    }
]

@app.get("/accounts/")
def get_account_by_userid(id: int):
    res  = list(filter(lambda x: x["UserID"] == id, accounts))
    return res

@app.get("/users/")
def get_user_by_id(id: int):
    res  = list(filter(lambda x: x["UserID"] == id, user))
    return res


@app.post("/transaction/")
async def add_transaction(
    TransactionID: int,
    AccountID: int,
    ReceivingAccountID: int | None=None,
    Date: str | None=None,
    TransactionAmount: float | None=None,
    Comment: str | None=None):

    TransactionID = txn[-1, "TransactionID"] + 1
    # AccountID = AccountID
    # ReceivingAccountID = ReceivingAccountID
    DateTime = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    
    return {
        "TransactionID": TransactionID,
        "AccountID": AccountID,
        "ReceivingAccountID": ReceivingAccountID,
        "Date": DateTime,
        "TransactionAmount": TransactionAmount,
        "Comment": Comment
    }
    
@app.patch("/users/addr")
def update_user_addr(id: int, addr: str):
    
    for u in user:
        if u["UserID"] == id:
            u["Address"] = addr
            return u


@app.patch("/users/email")
def update_user_email(id: int, email: str):

    for u in user:
        if u["UserID"] == id:
            u["Email"] = email
            return u

@app.get("/accounts/getall")
async def get_all_accounts():
    return accounts

@app.post("/deleteUserAdd")
async def delete_user_address(id: int):

    for user in users:
        if user["UserID"] == id:
            user["Address"] = ""
            return user

    return "User not found"

@app.post("/deleteUserEmail")
async def delete_user_email(id: int):

    for u in users:
        if u["UserID"] == id:
            u["Email"] = ""
            return u
    return "User not found"

@app.get("/getUserTxn")
async def get_txns_by_user_id(id: int):

    account_id = [acc['AccountID'] for acc in accounts if acc['UserID'] == id][0]
    if not account_id:
        return "No transactions found"
    return [tx for tx in txn if tx["AccountID"] == account_id]

@app.post("/transactions/del")
async def delete_transaction(id: int):
    target_txn = list(filter(lambda x: x["TransactionID"] == id, txn))[0]
    now = datetime.datetime.now()
    
    s = target_txn["Date"]
    f = "%Y-%m-%dT%H:%M:%S.%fZ"
    txn_time = datetime.datetime.strptime(s, f)
    
    
    if txn_time > now:
        txn.remove(target_txn)
        print("Success")
        

