import { useEffect, useMemo, useState } from "react";
import styles from "./CommandPalette.module.css";

export default function CommandPalette({
  open,
  onClose,
  commands = [],
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [open, onClose]);

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;

    return commands.filter((command) =>
      command.label
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [commands, search]);

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <input
  autoFocus
  placeholder="Search files or commands..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter" && filteredCommands.length > 0) {
      filteredCommands[0].action?.();
      onClose();
    }
  }}
  className={styles.input}
/>

        <div className={styles.list}>
          {filteredCommands.length === 0 ? (
            <div className={styles.empty}>
              🔍 No files or commands found
            </div>
          ) : (
            filteredCommands.map((command) => (
            <button
  key={command.label}
  className={styles.item}
  onClick={() => {
    command.action?.();
    onClose();
  }}
>
  <span style={{ fontSize: 22 }}>
    {command.icon}
  </span>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  >
    <strong>{command.label}</strong>

    <small
      style={{
        color: "#94a3b8",
      }}
    >
      Quick Action
    </small>
  </div>
</button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}