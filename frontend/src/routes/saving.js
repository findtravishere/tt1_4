import Balance from "../components/Balance";
import { TransactionTable } from "../components/TransactionsTable";

const Saving = () => {
  return (
    <div style={{ marginTop: 20 }}>
      <Balance amount="1813.56" />
      <TransactionTable />
    </div>
  );
};

export default Saving;
