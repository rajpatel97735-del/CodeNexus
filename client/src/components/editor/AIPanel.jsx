import { useState } from "react";
import AIHeader from "../AIHeader";
import AIPrompt from "../AIPrompt";
import AIConversation from "./AIConversation";
function AIPanel({
    onAgent,
    history,
    aiTyping,
}) {
  const [prompt, setPrompt] = useState("");
 
  const [loading, setLoading] = useState(false);

 const quickPrompts = [
  "Create Portfolio Website",
  "Create Netflix Clone",
  "Create Admin Dashboard",
  "Build Restaurant Website",
  "Build E-Commerce Store",
  "Create Login Page",
];
  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
    await onAgent(prompt);

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
      <AIConversation
    history={history}
    aiTyping={aiTyping}
/>

     

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