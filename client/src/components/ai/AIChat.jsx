import ChatHeader from "./ChatHeader";
import SuggestedPrompts from "./SuggestedPrompts";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatSidebar from "./ChatSidebar";
import useAIChat from "../../hooks/useAIChat";

import "./AIChat.css";

export default function AIChat() {
  const {
    messages,
    loading,
    error,
    sendMessage,
    newChat,
  } = useAIChat();

  const handlePrompt = async (prompt) => {
    await sendMessage(prompt);
  };
return (
  <div className="ai-chat-container">

    <ChatSidebar />

    <div className="chat-main">

      <ChatHeader onNewChat={newChat} />

      <SuggestedPrompts
        onSelect={handlePrompt}
      />

      <div className="chat-body">

        <ChatMessages
          messages={messages}
          loading={loading}
        />

      </div>

      {error && (
        <div className="chat-error">
          {error}
        </div>
      )}

      <ChatInput
        loading={loading}
        onSend={handlePrompt}
      />

    </div>

  </div>
);
}