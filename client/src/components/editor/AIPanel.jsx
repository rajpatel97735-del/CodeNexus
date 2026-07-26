
import AIHeader from "../AIHeader";
import AIPrompt from "../AIPrompt";
import AIConversation from "./AIConversation";

import { useState, useEffect } from "react";

function AIPanel({
  onAgent,
  history,
  aiTyping,
  startupPrompt,
}){
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);


useEffect(() => {
  if (startupPrompt) {
    setPrompt(startupPrompt);
  }
}, [startupPrompt]);
  const quickPrompts = [
    "Create Portfolio Website",
    "Create Netflix Clone",
    "Create Admin Dashboard",
    "Build Restaurant Website",
    "Build E-Commerce Store",
    "Create Login Page",
  ];

const components = [
  {
    title: "Navbar",
    prompt: "Create a modern responsive navbar with logo, menu and CTA button."
  },
  {
    title: "Hero Section",
    prompt: "Create a beautiful hero section with heading, subtitle, CTA button and illustration."
  },
  {
    title: "Features",
    prompt: "Create a modern features section with 3 feature cards and icons."
  },
  {
    title: "Pricing",
    prompt: "Create a responsive pricing section with three pricing cards."
  },
  {
    title: "Testimonials",
    prompt: "Create a testimonials section with customer cards."
  },
  {
    title: "FAQ",
    prompt: "Create an accordion FAQ section."
  },
  {
    title: "Contact Form",
    prompt: "Create a responsive contact form with validation."
  },
  {
    title: "Footer",
    prompt: "Create a professional footer with social links."
  }
];

  const handleSubmit = async (request) => {
    const data =
      typeof request === "string"
        ? {
            prompt: request,
            mode: "chat",
          }
        : request;

    if (!data?.prompt?.trim() && !data?.image) return;

    setLoading(true);

    try {
      if (data.mode === "vision") {
        console.log("🖼 Vision Request");
        await onAgent(data);
      } else {
        await onAgent(data.prompt);
      }

      setPrompt("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #334155",
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      {/* Header */}
      <AIHeader />

      {/* Chat */}
      <AIConversation
        history={history}
        aiTyping={aiTyping}
      />

      {/* AI Components */}
      <h3
        style={{
          color: "#fff",
          marginTop: "20px",
          marginBottom: "12px",
          fontSize: "16px",
        }}
      >
        ✨ AI Components
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {components.map((item) => (
          <button
key={item.title}
         onClick={() => handleSubmit(item.prompt)}
            style={{
              padding: "12px",
              borderRadius: "10px",
              cursor: "pointer",
              background: "#1e293b",
              color: "#fff",
              border: "1px solid #334155",
              fontWeight: "600",
              transition: "0.2s",
            }}
          >
        {item.title}
          </button>
        ))}
      </div>

      {/* Prompt */}
      <AIPrompt
        prompt={prompt}
        setPrompt={setPrompt}
        loading={loading}
        quickPrompts={quickPrompts}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AIPanel;