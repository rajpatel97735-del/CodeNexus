function AIConversation({
  history,
  aiTyping,
}) {
  return (
    <div
      style={{
        maxHeight: "320px",
        overflowY: "auto",
        marginBottom: "20px",
        padding: "10px",
        border: "1px solid #334155",
        borderRadius: "12px",
        background: "#0f172a",
      }}
    >
      {history.map((msg) => (
        <div
          key={msg.id}
          style={{
            display: "flex",
            justifyContent:
              msg.sender === "user"
                ? "flex-end"
                : "flex-start",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              maxWidth: "75%",
              background:
                msg.sender === "user"
                  ? "#2563eb"
                  : "#1e293b",
              color: "white",
              padding: "12px",
              borderRadius: "12px",
            }}
          >
            <div>{msg.message}</div>

            <div
              style={{
                marginTop: "6px",
                fontSize: "11px",
                color: "#94a3b8",
              }}
            >
              {msg.time}
            </div>
          </div>
        </div>
      ))}

      {aiTyping && (
        <div
          style={{
            color: "#94a3b8",
            fontStyle: "italic",
          }}
        >
          🤖 CodeNexus AI is thinking...
        </div>
      )}
    </div>
  );
}

export default AIConversation;