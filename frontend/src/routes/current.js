import Balance from "../components/Balance";
import { TransactionTable } from "../components/TransactionsTable";
import { useState } from "react";
import { dummyData, dummySplitAccountData } from "../data/data";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const Current = () => {
  const { data: accountData } = useSWR(
    "http://ec2-3-143-238-200.us-east-2.compute.amazonaws.com/accounts?id=1",
    fetcher
  );
  const { data: txnData } = useSWR(
    "http://ec2-3-143-238-200.us-east-2.compute.amazonaws.com/getUserTxn?id=1",
    fetcher
  );

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
      <Balance
        amount={
          accountData.find((d) => d.AccountType === "Current").AcccountBalance
        }
      />
      <TransactionTable transactions={transactions} />
    </div>
  );
};

export default Current;
