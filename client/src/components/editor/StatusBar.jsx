export default function StatusBar({
   currentFile,
   saveStatus,
   aiLoading,
   cursorPosition,
}){
  return (
    <div
      style={{
        height: "32px",
        background: "#111827",
        borderTop: "1px solid #334155",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 14px",
        color: "#cbd5e1",
        fontSize: 13,
      }}
    >
      <div style={{ display: "flex", gap: 18 }}>
        <span>📄 {currentFile?.name}</span>
        <span>UTF-8</span>
        <span>Spaces: 2</span>
      </div>

      <div style={{ display: "flex", gap: 18 }}>
        <span>
  Ln {cursorPosition.line},
  Col {cursorPosition.column}
</span>
        <span>{saveStatus}</span>
        <span>
          {aiLoading ? "🤖 AI Working..." : "🤖 AI Ready"}
        </span>
      </div>
    </div>
  );
}