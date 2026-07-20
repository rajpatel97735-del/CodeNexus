export default function Explorer({
  files,
  activeFile,
  setActiveFile,
}) {
  return (
    <div
      style={{
        width: "220px",
        background: "#1e293b",
        color: "#fff",
        borderRight: "1px solid #334155",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: "15px",
          fontWeight: "bold",
          borderBottom: "1px solid #334155",
        }}
      >
        📁 Explorer
      </div>

      <div style={{ padding: "10px" }}>
        <div style={{ marginBottom: "10px", color: "#94a3b8" }}>
          ▼ Project
        </div>

        {files.map((file) => (
          <div
            key={file.id}
            onClick={() => setActiveFile(file.id)}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderRadius: "6px",
              marginBottom: "5px",
              background:
                activeFile === file.id
                  ? "#2563eb"
                  : "transparent",
            }}
          >
            {file.icon} {file.name}
          </div>
        ))}
      </div>
    </div>
  );
}