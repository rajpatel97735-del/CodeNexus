import { Bug } from "lucide-react";

export default function DebugPanel() {
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
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Bug size={24} />
        Debug Project
      </h2>

      <div
        style={{
          background: "#0f172a",
          borderRadius: "12px",
          border: "1px solid #334155",
          padding: "18px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#fff" }}>Detected Issues</h3>

        <ul
          style={{
            marginTop: "15px",
            color: "#cbd5e1",
            lineHeight: "2",
          }}
        >
          <li>❌ Missing alt attribute.</li>
          <li>❌ Unused CSS classes.</li>
          <li>❌ Console warnings detected.</li>
          <li>❌ Duplicate styles found.</li>
        </ul>
      </div>

      <button
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          background: "linear-gradient(90deg,#ef4444,#dc2626)",
          color: "#fff",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        🛠 Fix Automatically
      </button>
    </div>
  );
}