from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer
from app.schemas.responses import User, Account
from app.auth.oauth2 import get_current_user
from app.routers import auth, users
from app.config import settings

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
        "Date": "2022-11-25T04:00:00.000Z",
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

# @app.get("/users/get")
# async def get_user()

@app.get("/accounts/")
def get_account_by_userid(id: int):
    res  = list(filter(lambda x: x["UserID"] == id, accounts))
    return res

@app.get("/users/")
def get_user_by_id(id: int):
    res  = list(filter(lambda x: x["UserID"] == id, user))
    return res

@app.get("/accounts/")
async def get_all_accounts():
    return accounts

@app.post("/users")
async def delete_user_address(id: int):

    for user in users:
        if user["UserID"] == id:
            user["Address"] = ""
            return user

@app.post("/users")
async def delete_user_email(id: int):

    for user in users:
        if user["UserID"] == id:
            user["Email"] = "", ""
            return user

    