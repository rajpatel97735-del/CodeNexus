function AIPrompt({
  prompt,
  setPrompt,
  loading,
  quickPrompts,
  onSubmit,
}) {
  return (
    <>
      {/* Quick Prompts */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "18px",
        }}
      >
        {quickPrompts.map((item) => (
          <button
            key={item}
          onClick={() => {
  setPrompt(item);
}}
            style={{
              border: "1px solid #334155",
              background: "#1e293b",
              color: "#cbd5e1",
              borderRadius: "30px",
              padding: "8px 14px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Prompt Input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
       onKeyDown={(e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    onSubmit();
  }
}}
onInput={(e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
}}
        placeholder={`Ask CodeNexus AI anything...

Examples:
• Create Portfolio Website
• Add Hero Section
• Fix Navbar
• Optimize CSS
• Explain my code`}
        style={{
          
          marginTop: "20px",
          width: "100%",
        minHeight: "120px",
maxHeight: "280px",
overflowY: "auto",
          background: "#1e293b",
          color: "white",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "14px",
          resize: "none",
          outline: "none",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      />

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
          {prompt.length} characters
        </span>

        <span
          style={{
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
        Enter ↵ Send • Shift + Enter New Line
        </span>
      </div>

      {/* Send Button */}
      <button
        onClick={onSubmit}
        disabled={loading}
        disabled={loading || !prompt.trim()}
        style={{
          marginTop: "20px",
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "14px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          opacity: loading || !prompt.trim() ? 0.6 : 1,
cursor:
  loading || !prompt.trim()
    ? "not-allowed"
    : "pointer",
        }}
      >
       {loading ? "🤖 CodeNexus AI Thinking..." : "✨ Generate"}
      </button>
    </>
  );
}

export default AIPrompt;