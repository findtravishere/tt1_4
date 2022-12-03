export const dummyData = [
  {
    TransactionID: 1,
    AccountID: 621156213,
    ReceivingAccountID: 339657462,
    Date: "2022-11-08T04:00:00.000Z",
    TransactionAmount: 500.0,
    Comment: "Monthly Pocket Money",
  },
  {
    TransactionID: 2,
    AccountID: 958945214,
    ReceivingAccountID: 621156213,
    Date: "2022-11-08T04:00:00.000Z",
    TransactionAmount: 8996.0,
    Comment: "School Fees",
  },
  {
    TransactionID: 3,
    AccountID: 828120424,
    ReceivingAccountID: 322798030,
    Date: "2022-11-25T04:00:00.000Z",
    TransactionAmount: 3000.0,
    Comment: "Driving Centre Top-up",
  },
  {
    TransactionID: 4,
    AccountID: 353677039,
    ReceivingAccountID: 785703027,
    Date: "2022-11-17T06:21:00.000Z",
    TransactionAmount: 255.0,
    Comment: "Tuition Fee Payment",
  },
  {
    TransactionID: 5,
    AccountID: 259555772,
    ReceivingAccountID: 828120424,
    Date: "2022-11-08T04:00:00.000Z",
    TransactionAmount: 32.0,
    Comment: "Books Payment",
  },
];

// Dummy account data split on account type
export const dummySplitAccountData = [
  {
    AccountID: 621156213,
    UserID: 1,
    AccountType: "Saving",
    AcccountBalance: 70200.71,
  },
  {
    AccountID: 958945214,
    UserID: 1,
    AccountType: "Current",
    AcccountBalance: 99720.46,
  },
  {
    AccountID: 828120424,
    UserID: 2,
    AccountType: "Multiplier",
    AcccountBalance: 50640.12,
  },
  {
    AccountID: 322798030,
    UserID: 3,
    AccountType: "Multiplier",
    AcccountBalance: 39740.17,
  },
  {
    AccountID: 353677039,
    UserID: 3,
    AccountType: "Saving",
    AcccountBalance: 76660.21,
  },
  {
    AccountID: 259555772,
    UserID: 4,
    AccountType: "Saving",
    AcccountBalance: 14020.58,
  },
  {
    AccountID: 339657462,
    UserID: 1,
    AccountType: "Current",
    AcccountBalance: 47380.33,
  },
  {
    AccountID: 785703027,
    UserID: 5,
    AccountType: "Current",
    AcccountBalance: 42460.32,
  },
];
