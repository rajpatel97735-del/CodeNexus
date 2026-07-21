import { components } from "./components";

export default function ComponentLibrary({ onSelect }) {
  return (
    <div
      style={{
        width: 220,
        background: "#111827",
        borderLeft: "1px solid #334155",
        color: "white",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: 15,
          fontWeight: "bold",
          borderBottom: "1px solid #334155",
        }}
      >
        🧩 Components
      </div>

      {components.map((item) => (
        <div
          key={item.id}
          onClick={() => onSelect(item)}
          style={{
            padding: 14,
            cursor: "pointer",
            borderBottom: "1px solid #1e293b",
          }}
        >
          {item.emoji} {item.name}
        </div>
      ))}
    </div>
  );
}