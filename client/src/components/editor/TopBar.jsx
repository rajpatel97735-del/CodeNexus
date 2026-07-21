import {
  Save,
  Download,
  Play,
  Undo2,
  Redo2,
  Wrench,
} from "lucide-react";

export default function TopBar({
  onSave,
  onExport,
  onRun,
  onUndo,
  onRedo,
  onFix,
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
          onClick={onUndo}
          style={buttonStyle("#ea580c")}
        >
          <Undo2 size={17} />
          Undo
        </button>

        <button
          onClick={onRedo}
          style={buttonStyle("#0891b2")}
        >
          <Redo2 size={17} />
          Redo
        </button>

        <button
          onClick={onFix}
          style={buttonStyle("#dc2626")}
        >
          <Wrench size={17} />
          Fix AI
        </button>

        <button
          onClick={onRun}
          style={buttonStyle("#16a34a")}
        >
          <Play size={17} />
          Run
        </button>

        <button
          onClick={onSave}
          style={buttonStyle("#2563eb")}
        >
          <Save size={17} />
          Save
        </button>

        <button
          onClick={onExport}
          style={buttonStyle("#9333ea")}
        >
          <Download size={17} />
          Export
        </button>
      </div>
    </div>
  );
}

const buttonStyle = (bg) => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 14px",
  border: "none",
  borderRadius: 6,
  background: bg,
  color: "white",
  cursor: "pointer",
});