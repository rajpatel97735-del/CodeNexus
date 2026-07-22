import TypingIndicator from "./TypingIndicator";
export default function ChatHistory({
  history,
  aiTyping,
}) {
  return (
    <div
      style={{
        width: 340,
        background: "#0f172a",
        borderLeft: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "18px",
          borderBottom: "1px solid #334155",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
              color: "white",
            }}
          >
            🤖 AI Conversation
          </h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#94a3b8",
              fontSize: 13,
            }}
          >
            {history.length} Messages
          </p>
        </div>

        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#22c55e",
          }}
        />
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "18px",
        }}
      >
        {history.length === 0 ? (
          <div
            style={{
              color: "#64748b",
              textAlign: "center",
              marginTop: 80,
            }}
          >
            <div style={{ fontSize: 50 }}>💬</div>

            <h3 style={{ color: "#cbd5e1" }}>
              No Conversation
            </h3>

            <p>
              Start chatting with CodeNexus AI.
            </p>
          </div>
        ) : (
          history.map((chat) => (
            <div
              key={chat.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems:
                  chat.sender === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  maxWidth: "90%",
                  background:
                    chat.sender === "user"
                      ? "#2563eb"
                      : "#1e293b",
                  color: "white",
                  padding: "12px 15px",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    fontWeight: "bold",
                    marginBottom: 6,
                  }}
                >
                  {chat.sender === "user"
                    ? "👤 You"
                    : "🤖 CodeNexus AI"}
                </div>

                <div
                  style={{
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.6,
                  }}
                >
                  {chat.message}
                </div>

                <div
                  style={{
                    marginTop: 8,
                    fontSize: 11,
                    color: "#cbd5e1",
                  }}
                >
                  {chat.time}
                </div>
              </div>
            </div>
          ))
        )}
        {aiTyping && <TypingIndicator />}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: 14,
          borderTop: "1px solid #334155",
          color: "#64748b",
          textAlign: "center",
          fontSize: 12,
        }}
      >
        Powered by Groq AI ⚡
      </div>
    </div>
  );
}