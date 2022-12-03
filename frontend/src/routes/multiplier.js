import Balance from "../components/Balance";
import { TransactionTable } from "../components/TransactionsTable";

const Multiplier = () => {
  return (
    <div style={{ marginTop: 20 }}>
      <Balance amount="776.85" />
      <TransactionTable typeState={"Multiplier"} />
    </div>
  );
};

export default Multiplier;
