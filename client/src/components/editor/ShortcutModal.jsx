export default function ShortcutModal({
  open,
  onClose,
}) {
  if (!open) return null;

  const shortcuts = [
    ["Ctrl + S", "Save Project"],
    ["Ctrl + P", "Command Palette"],
    ["Ctrl + Z", "Undo"],
    ["Ctrl + Shift + Z", "Redo"],
    ["Esc", "Close Dialog"],
    ["Enter", "Run Command"],
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 500,
          background: "#111827",
          borderRadius: 14,
          padding: 24,
          border: "1px solid #334155",
          color: "white",
        }}
      >
        <h2>⌨️ Keyboard Shortcuts</h2>

        {shortcuts.map(([key, action]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #334155",
            }}
          >
            <kbd>{key}</kbd>

            <span>{action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}