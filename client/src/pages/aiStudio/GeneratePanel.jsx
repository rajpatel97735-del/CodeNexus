import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function GeneratePanel() {
  const [prompt, setPrompt] = useState("");
  const [type, setType] = useState("Portfolio");
  const [theme, setTheme] = useState("Modern");

  const handleGenerate = () => {
    console.log({
      prompt,
      type,
      theme,
    });

    // Next Step:
    // AI API yahin connect karenge.
  };

  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #334155",
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: "20px",
        }}
      >
        ✨ Generate Website
      </h2>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your website..."
        style={{
          width: "100%",
          height: "140px",
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #334155",
          borderRadius: "10px",
          padding: "15px",
          resize: "none",
          marginBottom: "20px",
        }}
      />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            background: "#0f172a",
            color: "#fff",
            borderRadius: "10px",
            border: "1px solid #334155",
          }}
        >
          <option>Portfolio</option>
          <option>E-Commerce</option>
          <option>Dashboard</option>
          <option>Restaurant</option>
          <option>Landing Page</option>
        </select>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            background: "#0f172a",
            color: "#fff",
            borderRadius: "10px",
            border: "1px solid #334155",
          }}
        >
          <option>Modern</option>
          <option>Glassmorphism</option>
          <option>Minimal</option>
          <option>Dark</option>
        </select>
      </div>

      <button
        onClick={handleGenerate}
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "10px",
          border: "none",
          background: "linear-gradient(90deg,#6366f1,#9333ea)",
          color: "#fff",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        <Sparkles size={18} />
        Generate Website
      </button>
    </div>
  );
}