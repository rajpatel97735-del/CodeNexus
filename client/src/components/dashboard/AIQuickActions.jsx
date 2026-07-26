import { Bot, Sparkles, Bug, FileCode } from "lucide-react";

 function AIQuickActions({ onOpen }){
const actions = [
  {
    id: "generate",
    title: "Generate Website",
    description: "Create a complete website using AI.",
    icon: <Sparkles size={30} />,
    color: "#8b5cf6",
  },
  
  {
    id: "analyze",
    title: "Analyze Code",
    description: "Review your project for improvements.",
    icon: <FileCode size={30} />,
    color: "#2563eb",
  },
  {
    id: "debug",
    title: "Debug Errors",
    description: "Detect and fix coding issues instantly.",
    icon: <Bug size={30} />,
    color: "#ef4444",
  },
  
  {
    id: "chat",
    title: "Ask AI",
    description: "Chat with AI for coding help.",
    icon: <Bot size={30} />,
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
>

  <div
    className="ai-icon"
    style={{
      background: item.color,
    }}
  >
    {item.icon}
  </div>

  <h3>{item.title}</h3>

  <p>{item.description}</p>
<button
  onClick={() => onOpen(item.id)}
>
  Open →
</button>



           
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIQuickActions;