import { React, useState, useEffect } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import axios from "axios";
import Table from "react-bootstrap/Table";
import jsPDF from "jspdf";
import "jspdf-autotable";
// import Pagination from "./pagination";
import Button from "react-bootstrap/Button";
import DeleteModal from "./DeleteModal";
import TransModal from "./TransModal";

export const TransactionTable = ({ typeState }) => {
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

  // Dummy account data split on account type
  const dummySplitAccountData = [
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

  const accountIds = [];

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

  console.log("Account ids:", accountIds);

  // State to handle transactions
  console.log("Type state", typeState);
  const [transactions, setTransactions] = useState(filteredDummyData);

  // Handling of global state change
  const [transactionState, setTransactionState] = useState(false);
  const updateTransactionState = () => {
    setTransactionState(false);
  };

  // Handling of delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleClose = () => setDeleteModalOpen(false);
  const handleShow = () => setDeleteModalOpen(true);

  // Handling of add modal state
  const [showAddTransModal, setShowAddTransModal] = useState(false);

  // Handle PDF button
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait"; // portrait or landscape
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Table results";
    const headers = [
      [
        "TransactionID",
        "AccountID",
        "ReceivingAccountID",
        "Date",
        "TransactionAmount",
        "Comment",
      ],
    ];
    const data = transactions.map((elt) => [
      elt.TransactionID,
      elt.AccountID,
      elt.ReceivingAccountID,
      elt.Date,
      elt.TransactionAmount,
      elt.Comment,
    ]);
    let content = {
      startY: 50,
      head: headers,
      body: data,
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Results.pdf");
  };

  // Handle fetching
  //   useEffect(() => {
  //     const fetchTransactions = async () => {
  //       const response = await axios.get("/api/transactions");

  //       if (response.status === 200) {
  //         console.log(response);
  //         setTransactions(() => [...response.data]);
  //       }

  //       setTransactionState(true);
  //     };

  //     fetchTransactions();
  //   }, [transactions]);

  // Skeleton mapping
  return (
    <>
      <div style={{ marginTop: 40 }}>
        <div className="col-md-12"></div>
        <div
          className="col-md-8"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button variant="dark" onClick={() => exportPDF()}>
            Export as PDF
          </Button>
          <Button variant="danger" onClick={() => setShowAddTransModal(true)}>
            Add Transaction
          </Button>
        </div>
        <Table striped bordered hover style={{ marginTop: 20 }}>
          <thead>
            <tr>
              {/* <th>TransactionID</th> */}
              {/* <th>AccountID</th> */}
              <th>Receiving Account ID</th>
              <th>Date</th>
              <th>Transaction Amount</th>
              <th>Comment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => {
              return (
                <tr key={item.TransactionID}>
                  {/* <td>{item.TransactionID}</td> */}
                  {/* <td>{item.AccountID}</td> */}
                  <td>{item.ReceivingAccountID}</td>
                  <td>
                    {formatDistanceToNow(new Date(item.Date), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>{item.TransactionAmount}</td>
                  <td>{item.Comment}</td>
                  <td>
                    <Button onClick={handleShow}>Delete</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <DeleteModal show={deleteModalOpen} handleClose={handleClose} />
      <TransModal
        show={showAddTransModal}
        handleClose={() => setShowAddTransModal(false)}
      />
    </>
  );
};
