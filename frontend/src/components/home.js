import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, Outlet } from "react-router-dom";

const Home = () => {
  const [account, setAccount] = useState("saving");
  const navigate = useNavigate();

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
          <option value="saving">Saving Account</option>
          <option value="current">Current Account</option>
          <option value="multiplier">Multiplier Account</option>
        </Form.Select>
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
