import { useEffect, useRef } from "react";

export default function ConsolePanel({
  logs = [],
  onClear,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [logs]);

  const getColor = (type) => {
    switch (type) {
      case "error":
        return "#ef4444";

      case "success":
        return "#22c55e";

      case "warning":
        return "#facc15";

      default:
        return "#38bdf8";
    }
  };

  return (
    <div
      style={{
        height: "220px",
        background: "#0f172a",
        borderTop: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          height: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 15px",
          color: "white",
          borderBottom: "1px solid #334155",
        }}
      >
        <b>🖥 CodeNexus Console</b>

        <button
          onClick={onClear}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          🗑 Clear
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 12,
          fontFamily: "Consolas, monospace",
          fontSize: 14,
        }}
      >
        {logs.length === 0 ? (
          <div style={{ color: "#64748b" }}>
            No Logs...
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              style={{
                color: getColor(log.type),
                marginBottom: 8,
                display: "flex",
                gap: 10,
              }}
            >
              <span style={{ color: "#64748b" }}>
                {log.time}
              </span>

              <span>
                {">"} {log.message}
              </span>
            </div>
          ))
        )}

        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}