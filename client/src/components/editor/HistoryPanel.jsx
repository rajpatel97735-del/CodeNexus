function HistoryPanel({
  history,
  historyIndex,
  onRestore,
}) {
  return (
    <div
      style={{
        width: "250px",
        background: "#111827",
        borderLeft: "1px solid #334155",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: 15,
          color: "white",
          fontWeight: "bold",
          borderBottom: "1px solid #334155",
        }}
      >
        📜 Version History
      </div>

      {history.length === 0 && (
        <div
          style={{
            padding: 15,
            color: "#94a3b8",
          }}
        >
          No versions yet
        </div>
      )}

      {history.map((item, index) => (
        <div
          key={index}
          onClick={() => onRestore(index)}
          style={{
            padding: 15,
            cursor: "pointer",
            borderBottom: "1px solid #1e293b",
            background:
              historyIndex === index
                ? "#1d4ed8"
                : "transparent",
          }}
        >
          <div
            style={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Version {index + 1}
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {item.createdAt}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistoryPanel;