import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatMessages({
  messages,
  loading,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="chat-messages">

      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
        />
      ))}

     {loading && (
  <div className="typing-indicator">
    <div className="typing-avatar">🤖</div>

    <div className="typing-bubble">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
)}

      <div ref={bottomRef} />

    </div>
  );
}