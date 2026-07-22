function TypingIndicator() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "12px 16px",
        background: "#1e293b",
        color: "white",
        borderRadius: 12,
        width: "fit-content",
      }}
    >
      <span>🤖 CodeNexus AI</span>

      <div
        style={{
          display: "flex",
          gap: 4,
        }}
      >
        <span className="typing-dot">•</span>
        <span className="typing-dot">•</span>
        <span className="typing-dot">•</span>
      </div>
    </div>
  );
}

export default TypingIndicator;