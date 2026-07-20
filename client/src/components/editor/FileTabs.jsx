export default function FileTabs({
  files,
  activeFile,
  setActiveFile,
}) {
  return (
    <div
      style={{
        display: "flex",
        background: "#1e293b",
        borderBottom: "1px solid #334155",
      }}
    >
      {files.map((file) => (
        <div
          key={file.id}
          onClick={() => setActiveFile(file.id)}
          style={{
            padding: "12px 18px",
            cursor: "pointer",
            color:
              activeFile === file.id
                ? "#fff"
                : "#94a3b8",
            background:
              activeFile === file.id
                ? "#0f172a"
                : "#1e293b",
            borderBottom:
              activeFile === file.id
                ? "3px solid #3b82f6"
                : "3px solid transparent",
          }}
        >
          {file.icon} {file.name}
        </div>
      ))}
    </div>
  );
}