import Balance from "../components/Balance";
import { TransactionTable } from "../components/TransactionsTable";

const Current = () => {
  return (
    <div style={{ marginTop: 20 }}>
      <Balance amount="954.20" />
      <TransactionTable typeState={"Current"} />
    </div>
  );
};

export default Current;
