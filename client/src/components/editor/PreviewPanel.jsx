import { useState } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  RefreshCw,
  ExternalLink,
  Maximize2,
} from "lucide-react";

export default function PreviewPanel({ srcDoc }) {
  const [device, setDevice] = useState("desktop");
  const [refreshKey, setRefreshKey] = useState(0);

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

  const refreshPreview = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const openPreview = () => {
    const win = window.open("", "_blank");
    if (!win) return;

    win.document.open();
    win.document.write(srcDoc);
    win.document.close();
  };

  const fullscreenPreview = () => {
    const iframe = document.getElementById("preview-frame");

    if (!iframe) return;

    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  return (
    <div
      style={{
        flex: 1,
        background: "#ffffff",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Browser Header */}
      <div
        style={{
          height: 56,
          background: "#1e293b",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          borderBottom: "1px solid #334155",
          gap: 16,
        }}
      >
        {/* Browser Dots */}
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

        {/* Address Bar */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "70%",
              height: 36,
              background: "#334155",
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#cbd5e1",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            🌐 localhost:5173
          </div>
        </div>

        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: "center",
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

          <button
            onClick={refreshPreview}
            style={iconButton}
            title="Refresh"
          >
            <RefreshCw size={17} />
          </button>

          <button
            onClick={fullscreenPreview}
            style={iconButton}
            title="Fullscreen"
          >
            <Maximize2 size={17} />
          </button>

          <button
            onClick={openPreview}
            style={iconButton}
            title="Open in New Tab"
          >
            <ExternalLink size={17} />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div
        style={{
          flex: 1,
          background: "#e2e8f0",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "auto",
          padding: 24,
        }}
      >
        <iframe
          key={refreshKey}
          id="preview-frame"
          title="preview"
          srcDoc={srcDoc}
          style={{
            width: getWidth(),
            height: "100%",
            border: "1px solid #cbd5e1",
            background: "#fff",
            borderRadius: 12,
            transition: "all .3s ease",
            boxShadow: "0 18px 40px rgba(0,0,0,.25)",
          }}
        />
      </div>
    </div>
  );
}

const buttonStyle = (active) => ({
  width: 36,
  height: 36,
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  background: active ? "#2563eb" : "#334155",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const iconButton = {
  width: 36,
  height: 36,
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  background: "#334155",
  color: "#fff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};