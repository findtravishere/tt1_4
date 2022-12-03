import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [account, setAccount] = useState("saving");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${account}`);
  }, [account]);

  return (
    <>
      <h1>Welcome Vance</h1>
      <Form.Select
        aria-label="accounts"
        value={account}
        onChange={(e) => {
          setAccount(e.target.value);
        }}
      >
        <option value="saving">Saving Account</option>
        <option value="current">Current Account</option>
        <option value="multiplier">Multiplier Account</option>
      </Form.Select>
    </>
  );
};

export default Home;
