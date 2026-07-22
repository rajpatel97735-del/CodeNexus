function AIToolbar({
  mode,
  setMode,
  onExplain,
  onOptimize,
  onFix,
}) {
  const toolButtonStyle = {
    background: "#1e293b",
    color: "white",
    border: "1px solid #334155",
    borderRadius: "8px",
    padding: "10px 16px",
    cursor: "pointer",
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "18px",
        }}
      >
        

        <button
          onClick={() => onExplain?.()}
          style={toolButtonStyle}
        >
          📖 Explain
        </button>

        <button
          onClick={() => onOptimize?.()}
          style={toolButtonStyle}
        >
          ⚡ Optimize
        </button>

        <button
          onClick={() => onFix?.()}
          style={toolButtonStyle}
        >
          🛠 Fix
        </button>
      </div>
    </>
  );
}

export default AIToolbar;