import { Bot, Sparkles, Bug, FileCode } from "lucide-react";

function AIQuickActions() {
  const actions = [
    {
      title: "Generate Project",
      icon: <Sparkles size={28} />,
      color: "#8b5cf6",
    },
    {
      title: "Analyze Code",
      icon: <FileCode size={28} />,
      color: "#2563eb",
    },
    {
      title: "Debug Error",
      icon: <Bug size={28} />,
      color: "#ef4444",
    },
    {
      title: "Ask AI",
      icon: <Bot size={28} />,
      color: "#22c55e",
    },
  ];

  return (
    <div className="ai-section">
      <h2>🤖 AI Studio</h2>

      <div className="ai-grid">
        {actions.map((item, index) => (
          <div
            key={index}
            className="ai-card"
            style={{ borderTop: `4px solid ${item.color}` }}
          >
            {item.icon}
            <h3>{item.title}</h3>
            <button>Open</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIQuickActions;