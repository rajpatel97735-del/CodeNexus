import { Bot, User } from "lucide-react";
import MessageActions from "./MessageActions";
import MarkdownMessage from "./MarkdownMessage";


export default function ChatMessage({ message }) {
  const isAI = message.sender === "ai";

  return (
    <div
      className={`chat-message ${
        isAI ? "ai" : "user"
      }`}
    >
      <div className="avatar">
        {isAI ? (
          <Bot size={18} />
        ) : (
          <User size={18} />
        )}
      </div>

      <div className="message-content">

       <div className="message-text">
  <MarkdownMessage
    content={message.message}
  />
</div>

        {isAI && (
          <MessageActions
            text={message.message}
          />
        )}

      </div>
    </div>
  );
}