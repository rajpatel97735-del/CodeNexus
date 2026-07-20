export default function PreviewPanel({ srcDoc }) {
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
      {/* Browser Header */}
      <div
        style={{
          height: "45px",
          background: "#1e293b",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 15px",
          color: "#fff",
          borderBottom: "1px solid #334155",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#ef4444",
            }}
          />
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#f59e0b",
            }}
          />
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          />
        </div>

        <div style={{ fontWeight: "bold" }}>
          🌐 Live Preview
        </div>

        <div style={{ fontSize: "12px", color: "#94a3b8" }}>
          Running...
        </div>
      </div>

      {/* Preview */}
      <iframe
        title="preview"
        srcDoc={srcDoc}
        style={{
          flex: 1,
          border: "none",
          background: "#fff",
        }}
      />
    </div>
  );
}