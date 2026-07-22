import { useState } from "react";

function AIPanel({
  onGenerate,
  onEdit,
  onExplain,
  onOptimize,
  onFix,
}) {
  const [prompt, setPrompt] = useState("");
  
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
  "Create Portfolio Website",
  "Create Netflix Clone",
  "Create Admin Dashboard",
  "Build Restaurant Website",
  "Build E-Commerce Store",
  "Create Login Page",
];

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

   try {
  await onGenerate(prompt);
  setPrompt("");
}catch (err) {
      console.error(err);
    }

    setLoading(false);
  };
const toolButtonStyle = {
  background: "#1e293b",
  color: "white",
  border: "1px solid #334155",
  borderRadius: "8px",
  padding: "10px 16px",
  cursor: "pointer",
  transition: "0.2s",
};
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #334155",
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            onClick={() => setPrompt(item)}
            style={{
              border: "none",
              background: "#1e293b",
              color: "#cbd5e1",
              borderRadius: "30px",
              padding: "8px 14px",
              cursor: "pointer",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div
  style={{
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "18px",
  }}
>
  
  <button
    style={toolButtonStyle}
    onClick={() => onExplain && onExplain()}
  >
    📖 Explain
  </button>

  <button
    style={toolButtonStyle}
    onClick={() => onOptimize && onOptimize()}
  >
    ⚡ Optimize
  </button>

  <button
    style={toolButtonStyle}
    onClick={() => onFix && onFix()}
  >
    🛠 Fix
  </button>
</div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === "Enter") {
            handleSubmit();
          }
        }}
      placeholder={`Ask CodeNexus AI...

Examples:

Create Portfolio Website

Add Hero Section

Fix Navbar

Optimize CSS

Explain my code`}
        style={{
          marginTop: "20px",
          width: "100%",
          height: "140px",
          background: "#1e293b",
          color: "white",
          border: "1px solid #334155",
          borderRadius: "10px",
          padding: "14px",
          resize: "none",
          outline: "none",
          fontSize: "15px",
        }}
      />

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
          Ctrl + Enter
        </span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
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
        }}
      >
       {loading ? "⏳ Thinking..." : "Send"}
      </button>
    </div>
  );
}

export default AIPanel;