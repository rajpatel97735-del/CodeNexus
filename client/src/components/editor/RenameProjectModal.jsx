import { useEffect, useState } from "react";

export default function RenameProjectModal({
  open,
  onClose,
  currentTitle,
  onSave,
}) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (open) setTitle(currentTitle || "");
  }, [open, currentTitle]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 420,
          background: "#111827",
          border: "1px solid #334155",
          borderRadius: 12,
          padding: 24,
        }}
      >
        <h2 style={{ color: "#fff", marginTop: 0 }}>
          Rename Project
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Name"
          style={{
            width: "100%",
            padding: 12,
            marginTop: 10,
            marginBottom: 20,
            borderRadius: 8,
            border: "1px solid #475569",
            background: "#1e293b",
            color: "#fff",
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
          }}
        >
          <button onClick={onClose}>
            Cancel
          </button>

          <button
            onClick={() => onSave(title)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}