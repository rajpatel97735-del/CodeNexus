import React from "react";

export default function TopBar({
  onSave,
  onExport,
  saveStatus,
}) {
  return (
    <div
      style={{
        height: "55px",
        background: "#1e293b",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #334155",
      }}
    >
      <h2 style={{ margin: 0 }}>🚀 CodeNexus AI</h2>

      <div style={{ display: "flex", gap: "12px" }}>
        <button onClick={onSave}>💾 Save</button>

        <button onClick={onExport}>📦 Export ZIP</button>

        <button>🌙 Theme</button>

        <button>▶ Run</button>
      </div>

      <span style={{ color: "#22c55e" }}>
        {saveStatus}
      </span>
    </div>
  );
}