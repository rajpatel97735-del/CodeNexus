function AIHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "15px",
      }}
    >
      <h2 style={{ color: "white", margin: 0 }}>
        🤖 CodeNexus AI Assistant
      </h2>

      <span
        style={{
          color: "#22c55e",
          fontSize: "13px",
        }}
      >
        Groq AI Connected
      </span>
    </div>
  );
}

export default AIHeader;