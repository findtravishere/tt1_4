import Balance from "../components/Balance";
import { TransactionTable } from "../components/TransactionsTable";
import { useState } from "react";
import { dummyData, dummySplitAccountData } from "../data/data";
const Current = () => {
  const accountIds = [];
  const typeState = "Current";
  const checkAccountType = (typeState) => {
    if (typeState === "Saving") {
      dummySplitAccountData.map((account) => {
        if (account.AccountType === "Saving") {
          accountIds.push(account.AccountID);
        }
      });
    } else if (typeState === "Current") {
      dummySplitAccountData.map((account) => {
        if (account.AccountType === "Current") {
          accountIds.push(account.AccountID);
        }
      });
    } else if (typeState === "Multiplier") {
      dummySplitAccountData.map((account) => {
        if (account.AccountType === "Multiplier") {
          accountIds.push(account.AccountID);
        }
      });
    }
  };

  checkAccountType(typeState);

  const filteredDummyData = [];

  dummyData.map((transaction) => {
    if (accountIds.includes(transaction.AccountID)) {
      filteredDummyData.push(transaction);
    }
  });
  // State to handle transactions
  console.log("Type state", typeState);
  const [transactions, setTransactions] = useState(filteredDummyData);
  return (
    <div style={{ marginTop: 20 }}>
      <Balance amount="954.20" />
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Current;