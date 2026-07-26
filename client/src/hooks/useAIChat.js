import { useState, useCallback } from "react";
import axios from "../services/axios";

const WELCOME_MESSAGE = {
  id: crypto.randomUUID(),
  sender: "ai",
  message:
    "👋 Hi! I'm CodeNexus AI. I can help you build websites, write code, debug errors and explain concepts. What would you like to create today?",
};

export default function useAIChat() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [conversationId, setConversationId] = useState(
    crypto.randomUUID()
  );

  const addMessage = useCallback((sender, message) => {
    const msg = {
      id: crypto.randomUUID(),
      sender,
      message,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, msg]);

    return msg;
  }, []);

  const clearError = () => {
    setError(null);
  };

  const newChat = () => {
    setConversationId(crypto.randomUUID());

    setMessages([
      {
        ...WELCOME_MESSAGE,
        id: crypto.randomUUID(),
      },
    ]);

    setError(null);
  };
    const sendMessage = async (prompt) => {
    if (!prompt?.trim()) return;

    clearError();

    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      message: prompt.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    setLoading(true);

    try {
      const { data } = await axios.post("/ai/chat", {
        messages: updatedMessages,
        conversationId,
      });

      const aiMessage = {
        id: crypto.randomUUID(),
        sender: "ai",
        message: data.reply,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (err) {

      console.error(err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong."
      );

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "ai",
          message:
            "❌ Sorry, I couldn't process your request.",
          createdAt: new Date().toISOString(),
        },
      ]);

    } finally {
      setLoading(false);
    }
  };
    return {
    conversationId,

    messages,

    loading,

    error,

    sendMessage,

    addMessage,

    newChat,

    clearError,
  };
}