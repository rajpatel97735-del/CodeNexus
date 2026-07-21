import { Save, Download, Play } from "lucide-react";

export default function TopBar({
  onSave,
  onExport,
  onRun,
  saveStatus,
}) {
  return (
    <div
      style={{
        height: "60px",
        background: "#111827",
        borderBottom: "1px solid #334155",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      {/* Left */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <h2
          style={{
            color: "white",
            margin: 0,
          }}
        >
          🚀 CodeNexus AI
        </h2>

        <span
          style={{
            color: "#94a3b8",
            fontSize: 14,
          }}
        >
          {saveStatus}
        </span>
      </div>

      {/* Right */}

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button
          onClick={onRun}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            border: "none",
            borderRadius: 6,
            background: "#16a34a",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Play size={17} />
          Run
        </button>

        <button
          onClick={onSave}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            border: "none",
            borderRadius: 6,
            background: "#2563eb",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Save size={17} />
          Save
        </button>

        <button
          onClick={onExport}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            border: "none",
            borderRadius: 6,
            background: "#9333ea",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Download size={17} />
          Export
        </button>
      </div>
    </div>
  );
}