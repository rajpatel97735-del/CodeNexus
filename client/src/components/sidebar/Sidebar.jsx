import { sidebarItems } from "./sidebarItems";

export default function Sidebar({
  active,
  onChange,
}) {
  return (
    <div
      style={{
        width: 60,
        background: "#0f172a",
        borderRight: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 10,
        gap: 10,
      }}
    >
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          title={item.title}
          onClick={() => onChange(item.id)}
          style={{
            width: 42,
            height: 42,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontSize: 20,
            background:
              active === item.id
                ? "#2563eb"
                : "transparent",
            color: "white",
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}