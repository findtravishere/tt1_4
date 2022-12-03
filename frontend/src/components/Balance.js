const Balance = ({ amount }) => {
  return (
    <div style={{ marginTop: 40 }}>
      <h2 style={{ fontSize: 56 }}>${amount}</h2>
      <p style={{ textTransform: "uppercase", color: "#7A7A7A" }}>Balance</p>
    </div>
  );
};

export default Balance;
