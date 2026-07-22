import { X } from "lucide-react";
import { useFiles } from "../../context/FileContext";

export default function EditorTabs({
  openTabs,
  setOpenTabs,
  activeFile,
  setActiveFile,
}) {
  const { files } = useFiles();

  return (
    <div
      style={{
        display: "flex",
        background: "#1e293b",
        borderBottom: "1px solid #334155",
        overflowX: "auto",
      }}
    >
      {openTabs.map((id) => {
        const file = files.find((f) => f.id === id);

        if (!file) return null;

        return (
          <div
            key={id}
            onClick={() => setActiveFile(id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              cursor: "pointer",
              background:
                activeFile === id
                  ? "#2563eb"
                  : "#0f172a",
              color: "white",
              borderRight:
                "1px solid #334155",
            }}
          >
            {file.name}

            <X
              size={14}
              onClick={(e) => {
                e.stopPropagation();

                setOpenTabs((prev) =>
                  prev.filter((x) => x !== id)
                );
              }}
            />
          </div>
        );
      })}
    </div>
  );
}