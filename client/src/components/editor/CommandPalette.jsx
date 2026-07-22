import { useEffect, useState } from "react";

export default function CommandPalette({
  open,
  onClose,
  commands,
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  if (!open) return null;

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: 80,
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 650,
          background: "#111827",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #334155",
        }}
      >
        <input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type a command..."
          style={{
            width: "100%",
            padding: 16,
            background: "#1e293b",
            color: "white",
            border: "none",
            outline: "none",
            fontSize: 16,
          }}
        />

        <div
          style={{
            maxHeight: 350,
            overflow: "auto",
          }}
        >
          {filtered.map((cmd) => (
            <div
              key={cmd.label}
              onClick={() => {
                cmd.action();
                onClose();
              }}
              style={{
                padding: 14,
                cursor: "pointer",
                borderBottom:
                  "1px solid #1f2937",
              }}
            >
              ⚡ {cmd.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}