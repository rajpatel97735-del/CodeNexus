import { useState } from "react";

function AIPanel({ onGenerate, onEdit }) {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("generate");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      if (mode === "generate") {
        await onGenerate(prompt);
      } else {
        await onEdit(prompt);
      }

      setPrompt("");
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

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
        🤖 CodeNexus AI
      </h2>

      {/* Mode Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >
        <button
          onClick={() => setMode("generate")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              mode === "generate" ? "#2563eb" : "#334155",
            color: "white",
          }}
        >
          🚀 Generate
        </button>

        <button
          onClick={() => setMode("edit")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              mode === "edit" ? "#2563eb" : "#334155",
            color: "white",
          }}
        >
          ✏️ Edit
        </button>
      </div>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={
          mode === "generate"
            ? "Create a Portfolio Website..."
            : "Make navbar black..."
        }
        style={{
          width: "100%",
          height: "120px",
          marginTop: "10px",
          padding: "10px",
          borderRadius: "8px",
          resize: "none",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
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
        {loading
          ? "Generating..."
          : mode === "generate"
          ? "🚀 Generate"
          : "✏️ Edit Website"}
      </button>
    </div>
  );
}

export default AIPanel;