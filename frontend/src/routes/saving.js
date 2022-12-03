import { useState } from "react";
import Balance from "../components/Balance";
import { TransactionTable } from "../components/TransactionsTable";
import { Button } from "react-bootstrap";
import TransModal from "../components/TransModal";

const Saving = () => {
  // const [showAddTransModal, setShowAddTransModal] = useState(false);

  return (
    <div style={{ marginTop: 20 }}>
      <Balance amount="1813.56" />
      <TransactionTable typeState={"Saving"} />
      {/* <Button variant="danger" onClick={() => setShowAddTransModal(true)}>
        Add Transaction
      </Button>
      <TransModal
        show={showAddTransModal}
        handleClose={() => setShowAddTransModal(false)}
      /> */}
    </div>
  );
};

export default Saving;
