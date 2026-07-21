import { useState } from "react";
import { Send, Sparkles, Pencil } from "lucide-react";

export default function AIChat({
  onGenerate,
  onEdit,
}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("generate");

  const handleSend = async () => {
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
        background: "#111827",
        borderBottom: "1px solid #334155",
        padding: 15,
      }}
    >
      {/* Mode Buttons */}
      <div
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <button
          onClick={() => setMode("generate")}
          style={{
            background:
              mode === "generate"
                ? "#2563eb"
                : "#1e293b",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Sparkles size={16} />
          Generate
        </button>

        <button
          onClick={() => setMode("edit")}
          style={{
            background:
              mode === "edit"
                ? "#2563eb"
                : "#1e293b",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Pencil size={16} />
          Edit
        </button>
      </div>

      {/* Prompt */}
      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={
            mode === "generate"
              ? "Create a portfolio website..."
              : "Make navbar blue..."
          }
          style={{
            flex: 1,
            background: "#1e293b",
            color: "white",
            border: "none",
            outline: "none",
            padding: 12,
            borderRadius: 8,
          }}
        />

        <button
          disabled={loading}
          onClick={handleSend}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "0 18px",
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