import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, Outlet } from "react-router-dom";

const Home = () => {
  const [account, setAccount] = useState("saving");
  const navigate = useNavigate();

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

  useEffect(() => {
    navigate(`/${account}`);
  }, [account]);

  return (
    <div>
      <div style={{ marginTop: 40, display: "flex" }}>
        <h1 style={{ width: "70%" }}>Welcome Vance</h1>
        <Form.Select
          aria-label="accounts"
          value={account}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
          size="sm"
          style={{ width: "30%" }}
        >
          <option value="Saving">Saving Account</option>
          <option value="Current">Current Account</option>
          <option value="Multiplier">Multiplier Account</option>
        </Form.Select>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
