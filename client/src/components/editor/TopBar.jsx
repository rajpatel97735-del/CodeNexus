import { useFiles } from "../../context/FileContext";
import { exportProject } from "../../utils/exportProject";

import {
  Save,
  Download,
  Play,
  Undo2,
  Redo2,
  Wrench,
  Rocket,
  Settings,
  BarChart3,
  Zap,
  Pencil,
} from "lucide-react";

export default function TopBar({
  onSave,
  onExport,
  onDeploy,
  onRun,
  onUndo,
  onRedo,
  onFix,
  onAnalyze,
  onOptimize,
  onSettings,
  onRename,
  saveStatus,
  projectTitle,
}) {
  const { files } = useFiles();

  const handleExport = () => {
    exportProject(
      files,
      projectTitle || "CodeNexus-Project"
    );

    onExport?.();
  };

  return (
    <div
      style={{
        height: "60px",
        background: "rgba(17,24,39,.82)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #334155",
        boxShadow: "0 10px 35px rgba(0,0,0,.35)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      {/* ================= Left ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            🚀 {projectTitle || "Untitled Project"}
          </h2>

          <button
            type="button"
            title="Rename Project"
            onClick={onRename}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pencil size={18} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "6px 12px",
            borderRadius: 999,
            background: "#1e293b",
            border: "1px solid #334155",
          }}
        >
          <span
            style={{
              color: "#22c55e",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            🟢 {saveStatus}
          </span>

          <span
            style={{
              padding: "5px 10px",
              borderRadius: 999,
              background: "#2563eb22",
              border: "1px solid #2563eb55",
              color: "#60a5fa",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            🤖 AI Online
          </span>
        </div>
      </div>

      {/* ================= Right ================= */}
            <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <button
          type="button"
          title="Undo (Ctrl + Z)"
          onClick={onUndo}
          style={buttonStyle("#ea580c")}
        >
          <Undo2 size={17} />
          Undo
        </button>

        <button
          type="button"
          title="Redo (Ctrl + Y)"
          onClick={onRedo}
          style={buttonStyle("#0891b2")}
        >
          <Redo2 size={17} />
          Redo
        </button>

        <button
          type="button"
          title="Analyze Code"
          onClick={onAnalyze}
          style={buttonStyle("#2563eb")}
        >
          <BarChart3 size={17} />
          Analyze
        </button>

        <button
          type="button"
          title="AI Fix"
          onClick={onFix}
          style={buttonStyle("#dc2626")}
        >
          <Wrench size={17} />
          Fix AI
        </button>

        <button
          type="button"
          title="Optimize Code"
          onClick={onOptimize}
          style={buttonStyle("#ca8a04")}
        >
          <Zap size={17} />
          Optimize
        </button>

        <button
          type="button"
          title="Run Project"
          onClick={onRun}
          style={buttonStyle("#16a34a")}
        >
          <Play size={17} />
          Run
        </button>

        <button
          type="button"
          title="Save Project (Ctrl + S)"
          onClick={() => onSave?.()}
          style={buttonStyle("#2563eb")}
        >
          <Save size={17} />
          Save
        </button>

        <button
          type="button"
          title="Deploy Project"
          onClick={() => onDeploy?.()}
          style={buttonStyle("#14b8a6")}
        >
          <Rocket size={17} />
          Deploy
        </button>

        <button
          type="button"
          title="Export ZIP"
          onClick={handleExport}
          style={buttonStyle("#7c3aed")}
        >
          <Download size={17} />
          Export ZIP
        </button>

        <button
          type="button"
          title="Editor Settings"
          onClick={() => onSettings?.()}
          style={buttonStyle("#475569")}
        >
          <Settings size={17} />
          Settings
        </button>
      </div>
    </div>
  );
}

const buttonStyle = (background) => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 14px",
  border: "none",
  borderRadius: 10,
  background,
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
  transition: "all .25s ease",
  whiteSpace: "nowrap",
});