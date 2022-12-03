import { React, useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";
import Table from "react-bootstrap/Table";

export const TransactionTable = () => {
  // Current dummy data
  const dummyData = [
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

  // State to handle transactions
  const [transactions, setTransactions] = useState(dummyData);

  // Handling of global state change
  const [transactionState, setTransactionState] = useState(false);
  const updateTransactionState = () => {
    setTransactionState(false);
  };

  // Handle fetching
  // useEffect(() => {
  // 	const fetchTransactions = async () => {
  // 		const response = await axios.get("/api/transactions");

  // 		if (response.status === 200) {
  // 			console.log(response);
  // 			setTransactions(() => [...response.data]);
  // 		}

  // 		setTransactionState(true);
  // 	};

  // 	fetchTransactions();
  // }, [transactions]);

  // Skeleton mapping
  return (
    // <div>
    // 	{transactions.map((item) => (
    // 		<li key={item.TransactionID}>
    // 			<p>{item.TransactionID}</p>
    // 			<p>{item.AccountID}</p>
    // 			<p>{item.ReceivingAccountID}</p>
    // 			<p>{formatDistanceToNow(new Date(item.Date), { addSuffix: true })}</p>
    // 			<p>{item.TransactionAmount}</p>
    // 			<p>{item.Comment}</p>
    // 		</li>
    // 	))}
    // </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>TransactionID</th>
          <th>AccountID</th>
          <th>ReceivingAccountID</th>
          <th>Date</th>
          <th>TransactionAmount</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((item) => (
          <tr key={item.TransactionID}>
            <td>{item.TransactionID}</td>
            <td>{item.AccountID}</td>
            <td>{item.ReceivingAccountID}</td>
            <td>
              {formatDistanceToNow(new Date(item.Date), { addSuffix: true })}
            </td>
            <td>{item.TransactionAmount}</td>
            <td>{item.Comment}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
