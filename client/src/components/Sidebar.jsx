import {
  FolderOpen,
  History,
  MessageSquare,
  Terminal,
  LayoutTemplate,
  Boxes,
  Settings,
} from "lucide-react";

export default function Sidebar({
  active,
  onChange,
}) {
  const menus = [
    {
      id: "explorer",
      icon: <FolderOpen size={18} />,
      title: "Explorer",
    },
    {
      id: "chat",
      icon: <MessageSquare size={18} />,
      title: "AI Chat",
    },
    {
      id: "history",
      icon: <History size={18} />,
      title: "History",
    },
    {
      id: "console",
      icon: <Terminal size={18} />,
      title: "Console",
    },
    {
      id: "templates",
      icon: <LayoutTemplate size={18} />,
      title: "Templates",
    },
    {
      id: "components",
      icon: <Boxes size={18} />,
      title: "Components",
    },
    {
      id: "settings",
      icon: <Settings size={18} />,
      title: "Settings",
    },
  ];

  return (
    <div
      style={{
        width: "58px",
        background: "#0f172a",
        borderRight: "1px solid #334155",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "15px",
        gap: "12px",
      }}
    >
      {menus.map((item) => (
        <button
          key={item.id}
          title={item.title}
          onClick={() => onChange(item.id)}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "0.2s",
            background:
              active === item.id
                ? "#2563eb"
                : "transparent",
            color:
              active === item.id
                ? "#fff"
                : "#94a3b8",
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}