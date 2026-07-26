import { Bot, Sparkles, Plus } from "lucide-react";

export default function ChatHeader({
  onNewChat,
}) {
  return (
    <div className="chat-header">

      <div className="chat-title">

        <Bot size={24} />

        <div>

          <h3>CodeNexus AI</h3>

          <span>Powered by Gemini 2.5 Flash</span>

        </div>

      </div>

      <div className="chat-header-actions">

        <button
          className="new-chat-btn"
          onClick={onNewChat}
        >
          <Plus size={18} />
          New Chat
        </button>

        <Sparkles
          color="#8b5cf6"
        />

      </div>

    </div>
  );
}