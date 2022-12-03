import Balance from "../components/Balance";
import { TransactionTable } from "../components/TransactionsTable";
import { useState } from "react";
import { dummyData, dummySplitAccountData } from "../data/data";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

const Saving = () => {
  const { data: accountData } = useSWR(
    "http://ec2-3-143-238-200.us-east-2.compute.amazonaws.com/accounts?id=1",
    fetcher
  );
  const { data: txnData } = useSWR(
    "http://ec2-3-143-238-200.us-east-2.compute.amazonaws.com/getUserTxn?id=1",
    fetcher
  );

  console.log("look here: ", accountData, txnData);

  const accountIds = [];
  const typeState = "Saving";
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

  // console.log("Account ids:", accountIds);

  // State to handle transactions
  console.log("Type state", typeState);
  const [transactions, setTransactions] = useState(filteredDummyData);
  return (
    accountData &&
    txnData && (
      <div style={{ marginTop: 20 }}>
        <Balance
          amount={
            accountData.find((d) => d.AccountType === "Saving").AcccountBalance
          }
        />
        <TransactionTable transactions={transactions} />
      </div>
    )
  );
};

export default Saving;
