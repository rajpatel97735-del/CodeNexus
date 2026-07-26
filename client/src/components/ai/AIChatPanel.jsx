import { useState } from "react";
import "./AIChatPanel.css";

function AIChatPanel() {
  const [prompt, setPrompt] = useState("");

  return (
    <div className="ai-chat-panel">

      <div className="ai-header">
        <h2>🤖 CodeNexus AI</h2>
        <span>AI Assistant</span>
      </div>

      <div className="ai-messages">

        <div className="ai-message">
          👋 Hi! What would you like to build today?
        </div>

      </div>

      <div className="ai-input">

        <textarea
          placeholder="Describe your website..."
          value={prompt}
          onChange={(e)=>setPrompt(e.target.value)}
        />

        <button>
          Generate
        </button>

      </div>

    </div>
  );
}

export default AIChatPanel;