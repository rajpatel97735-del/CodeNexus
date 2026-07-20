import { useState } from "react";

function AIPanel({ onGenerate }) {

  const [prompt, setPrompt] = useState("");

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2 style={{ color: "white" }}>
        🤖 AI Website Generator
      </h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Create a Portfolio Website..."
        style={{
          width: "100%",
          height: "120px",
          marginTop: "15px",
          padding: "10px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={() => onGenerate(prompt)}
        style={{
          marginTop: "15px",
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "12px 25px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        🚀 Generate
      </button>
    </div>
  );
}

export default AIPanel;