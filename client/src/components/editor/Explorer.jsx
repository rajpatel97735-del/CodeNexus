import { useState } from "react";
import { FilePlus2, Trash2, Pencil } from "lucide-react";
import { useFiles } from "../../context/FileContext";


export default function Explorer({
  activeFile,
  setActiveFile,
}) {
  const {
    files,
    addFile,
    deleteFile,
    renameFile,
  } = useFiles();

  const [fileName, setFileName] = useState("");

  const createFile = () => {
    if (!fileName.trim()) return;

    let language = "javascript";

    if (fileName.endsWith(".html")) language = "html";
    else if (fileName.endsWith(".css")) language = "css";

    addFile(fileName, language);

    setFileName("");
  };

  return (
    <div
      style={{
        height: "100%",
        background: "#111827",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "12px",
          borderBottom: "1px solid #334155",
          fontWeight: "bold",
        }}
      >
        EXPLORER
      </div>

      <div
        style={{
          display: "flex",
          gap: 5,
          padding: 10,
        }}
      >
        <input
          placeholder="new file..."
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          style={{
            flex: 1,
            background: "#1e293b",
            border: "none",
            color: "white",
            padding: 6,
            borderRadius: 5,
          }}
        />

        <button
          onClick={createFile}
          style={{
            background: "#2563eb",
            border: "none",
            color: "white",
            padding: "6px 8px",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          <FilePlus2 size={16} />
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {files.map((file) => (
          <div
            key={file.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "8px 12px",
              cursor: "pointer",
              background:
                activeFile === file.id
                  ? "#1d4ed8"
                  : "transparent",
            }}
          >
            <div
              onClick={() => setActiveFile(file.id)}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
              }}
            >
              <span>{file.icon}</span>
              <span>{file.name}</span>
            </div>

            <div
              style={{
                display: "flex",
                gap: 6,
              }}
            >
              <Pencil
                size={14}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const name = prompt(
                    "Rename File",
                    file.name
                  );

                  if (name) {
                    renameFile(file.id, name);
                  }
                }}
              />

              <Trash2
                size={14}
                style={{ cursor: "pointer" }}
                onClick={() => deleteFile(file.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}