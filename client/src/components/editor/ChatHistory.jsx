
export default function ChatHistory({ history }) {
  return (
    <div
      style={{
        width: 300,
        background: "#111827",
        borderLeft: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 15,
          fontWeight: "bold",
          color: "white",
          borderBottom: "1px solid #334155",
        }}
      >
        💬 AI Conversation
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 15,
        }}
      >
        {history.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>
            No conversation yet...
          </p>
        ) : (
          history.map((chat) => (
            <div
              key={chat.id}
              style={{
                marginBottom: 20,
                background:
                  chat.sender === "user"
                    ? "#1e40af"
                    : "#14532d",
                padding: 10,
                borderRadius: 8,
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {chat.sender === "user" ? "👤 You" : "🤖 AI"}
              </div>

              <div
                style={{
                  color: "white",
                  marginTop: 5,
                }}
              >
                {chat.message}
              </div>

              <div
                style={{
                  color: "#cbd5e1",
                  fontSize: 11,
                  marginTop: 6,
                }}
              >
                {chat.time}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}