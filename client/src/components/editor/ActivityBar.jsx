import { Files, Bot, Settings } from "lucide-react";

export default function ActivityBar({ active, onChange }) {
  const items = [
    {
      id: "explorer",
      icon: <Files size={22} />,
      title: "Explorer",
    },
    {
      id: "ai",
      icon: <Bot size={22} />,
      title: "AI Assistant",
    },
    {
      id: "settings",
      icon: <Settings size={22} />,
      title: "Settings",
    },
  ];

  return (
    <div
      style={{
        width: "55px",
        background: "#111827",
        borderRight: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "12px",
        gap: "12px",
      }}
    >
      {items.map((item) => (
        <button
          key={item.id}
          title={item.title}
          onClick={() => onChange(item.id)}
          style={{
            width: "42px",
            height: "42px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              active === item.id ? "#2563eb" : "transparent",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}