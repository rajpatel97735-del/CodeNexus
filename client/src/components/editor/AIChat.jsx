import { useState } from "react";
import { Send } from "lucide-react";

export default function AIChat({ onGenerate }) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    await onGenerate(prompt);

    setLoading(false);

    setPrompt("");
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#111827",
        color: "white",
      }}
    >
      <div
        style={{
          padding: 15,
          borderBottom: "1px solid #334155",
          fontWeight: "bold",
        }}
      >
        🤖 CodeNexus AI
      </div>

      <div
        style={{
          flex: 1,
          padding: 15,
          overflowY: "auto",
          color: "#94a3b8",
        }}
      >
        Ask AI to build or improve your website...
      </div>

      <div
        style={{
          display: "flex",
          padding: 10,
          borderTop: "1px solid #334155",
        }}
      >
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Create landing page..."
          style={{
            flex: 1,
            background: "#1e293b",
            color: "white",
            border: "none",
            padding: 10,
            borderRadius: 8,
          }}
        />

        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            marginLeft: 8,
            background: "#2563eb",
            border: "none",
            color: "white",
            padding: "0 16px",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}