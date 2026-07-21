import { useEffect, useRef } from "react";
import { Trash2, Terminal } from "lucide-react";
import { useConsole } from "../../context/ConsoleContext";

export default function ConsolePanel() {
  const { logs, clearLogs } = useConsole();

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [logs]);

  const getColor = (type) => {
    switch (type) {
      case "success":
        return "#22c55e";

      case "error":
        return "#ef4444";

      case "warning":
        return "#f59e0b";

      default:
        return "#60a5fa";
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          height: 45,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 15px",
          borderBottom: "1px solid #334155",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          <Terminal size={18} />
          Console
        </div>

        <button
          onClick={clearLogs}
          style={{
            border: "none",
            background: "transparent",
            color: "#cbd5e1",
            cursor: "pointer",
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: 15,
          fontFamily: "Consolas",
          fontSize: 14,
        }}
      >
        {logs.length === 0 && (
          <div style={{ color: "#64748b" }}>
            No logs available...
          </div>
        )}

        {logs.map((log) => (
          <div
            key={log.id}
            style={{
              color: getColor(log.type),
              marginBottom: 8,
            }}
          >
            [{log.time}] {log.message}
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>
    </div>
  );
}