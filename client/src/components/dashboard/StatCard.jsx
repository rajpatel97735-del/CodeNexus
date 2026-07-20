function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "16px",
        padding: "22px",
        color: "white",
        borderLeft: `5px solid ${color}`,
      }}
    >
      <h3 style={{ color: "#94a3b8", marginBottom: "10px" }}>
        {title}
      </h3>

      <h1>{value}</h1>
    </div>
  );
}

export default StatCard;