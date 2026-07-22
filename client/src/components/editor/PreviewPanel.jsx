import { useState } from "react";
import { Monitor, Tablet, Smartphone } from "lucide-react";

export default function PreviewPanel({ srcDoc }) {
  const [device, setDevice] = useState("desktop");
const [pendingChanges, setPendingChanges] = useState(null);
  const getWidth = () => {
    switch (device) {
      case "mobile":
        return "390px";
      case "tablet":
        return "768px";
      default:
        return "100%";
    }
  };

  return (
    
    <div
      style={{
        flex: 1,
        background: "#ffffff",
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          height: "50px",
          background: "#1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 15px",
          color: "#fff",
          borderBottom: "1px solid #334155",
        }}
      >
        {/* Left */}
        <div
          style={{
            display: "flex",
            gap: 8,
          }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />

          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#f59e0b",
            }}
          />

          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
        </div>

        {/* Center */}
        <div
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <button
            onClick={() => setDevice("desktop")}
            style={buttonStyle(device === "desktop")}
          >
            <Monitor size={17} />
          </button>

          <button
            onClick={() => setDevice("tablet")}
            style={buttonStyle(device === "tablet")}
          >
            <Tablet size={17} />
          </button>

          <button
            onClick={() => setDevice("mobile")}
            style={buttonStyle(device === "mobile")}
          >
            <Smartphone size={17} />
          </button>
        </div>

        {/* Right */}
        <div
          style={{
            fontSize: 12,
            color: "#94a3b8",
          }}
        >
          {device.toUpperCase()}
        </div>
      </div>

      {/* Preview Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "auto",
          background: "#dbeafe",
          padding: 20,
        }}
      >
        <iframe
          title="preview"
          srcDoc={srcDoc}
          style={{
            width: getWidth(),
            height: "100%",
            border: "none",
            background: "#fff",
            transition: "0.35s",
            borderRadius: 10,
            boxShadow: "0 10px 30px rgba(0,0,0,.2)",
          }}
        />
      </div>
    </div>
  );
}


const buttonStyle = (active) => ({
  border: "none",
  cursor: "pointer",
  background: active ? "#2563eb" : "#334155",
  color: "white",
  width: 36,
  height: 36,
  borderRadius: 8,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});