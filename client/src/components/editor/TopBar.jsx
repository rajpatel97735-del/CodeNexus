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
}){
  return (
    <div
      style={{
        height: "60px",
       background: "rgba(17,24,39,.82)",

backdropFilter: "blur(14px)",
boxShadow:"0 10px 35px rgba(0,0,0,.35)",
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
     <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 8,
  }}
>
  <h2
    style={{
      color: "white",
      margin: 0,
      fontSize: 22,
      fontWeight: 700,
    }}
  >
    🚀 {projectTitle || "Untitled Project"}
  </h2>

  <button
    onClick={onRename}
    style={{
      background: "transparent",
      border: "none",
      color: "#94a3b8",
      cursor: "pointer",
      fontSize: 18,
    }}
  >
    ✏️
  </button>
</div>

      <span
  style={{
    padding: "6px 12px",
    borderRadius: 999,
    background: "#1e293b",
    color: "#22c55e",
    fontSize: 13,
    fontWeight: 600,
    border: "1px solid #334155",
  }}
>
🟢 {saveStatus}
<span
style={{

padding:"6px 12px",

background:"#2563eb22",

border:"1px solid #2563eb55",

borderRadius:999,

color:"#60a5fa",

fontSize:12,

fontWeight:600

}}

>

🤖 AI Online

</span>
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
  onClick={onAnalyze}
  style={buttonStyle("#2563eb")}
>
  <BarChart3 size={17} />
  Analyze
</button>
        <button
          onClick={onFix}
          style={buttonStyle("#dc2626")}
        >
          <Wrench size={17} />
          Fix AI
        </button>
<button
  onClick={onOptimize}
  style={buttonStyle("#ca8a04")}
>
  <Zap size={17} />
  Optimize
</button>
        <button
          onClick={onRun}
          style={buttonStyle("#16a34a")}
        >
          <Play size={17} />
          Run
        </button>
<button
  onClick={() => onSave()}
  style={buttonStyle("#2563eb")}
>
          <Save size={17} />
          Save
        </button>

        <button
  onClick={onDeploy}
  style={buttonStyle("#14b8a6")}
>
  <Rocket size={17} />
  Deploy
</button>

<button
  onClick={onExport}
  style={buttonStyle("#9333ea")}
>
  <Download size={17} />
  Export
</button>
<button
  onClick={onSettings}
  style={buttonStyle("#475569")}
>
  <Settings size={17} />
  Settings
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
  borderRadius: 10,
  background: bg,
  color: "white",
  cursor: "pointer",
  transition:"all .25s ease",

fontWeight:600,
});