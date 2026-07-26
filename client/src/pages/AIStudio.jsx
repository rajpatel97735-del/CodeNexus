import { useState, useEffect } from "react";
import { generateWebsite } from "../services/ai.service";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useLocation } from "react-router-dom";
import AIChat from "../components/ai/AIChat";

import GeneratePanel from "./aiStudio/GeneratePanel";
import AnalyzePanel from "./aiStudio/AnalyzePanel";
import DebugPanel from "./aiStudio/DebugPanel";

import "../styles/aiStudio.css";

export default function AIStudio() {
 const location = useLocation();

const [activeTool, setActiveTool] = useState("generate");

useEffect(() => {
  if (location.state?.mode) {
    setActiveTool(location.state.mode);
  }
}, [location]);
const [loading, setLoading] = useState(false);
const handleGenerateWebsite = async (data) => {
  try {
    setLoading(true);

    const prompt = `
Website Type : ${data.type}

Theme : ${data.theme}

Description :
${data.prompt}
`;

    const res = await generateWebsite(prompt);

    console.log(res);

    alert("Website Generated Successfully");

    // Next step:
    // Editor me bhejna hai

  } catch (err) {
    console.error(err);

    alert("Generation Failed");
  } finally {
    setLoading(false);
  }
};
const handleAnalyze = async () => {
    alert("AI Analyze Coming...");
};
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="ai-container">

          {/* Header */}

     <div className="ai-header">

  <div>

    <span className="ai-badge">
      ⚡ Powered by Groq + Llama 3.3
    </span>

    <h1>🤖 AI Studio</h1>

    <p>
      Build, debug, optimize and analyze websites with AI.
    </p>

  </div>

  <div className="ai-header-actions">

    <button className="secondary-btn">
      📜 History
    </button>

    <button className="primary-btn">
      + New Chat
    </button>

  </div>

</div>

            <div>
              <h1>🤖 AI Studio</h1>

              <p>
                Build websites, debug code, analyze projects and chat with AI.
              </p>
            </div>

            <button className="primary-btn">
              + New Chat
            </button>

          </div>

          {/* Main Grid */}

          <div className="ai-grid">
            {/* Left Panel */}

<div className="card">
  <h2 style={{ marginBottom: "20px" }}>
    🧠 AI Workspace
  </h2>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    }}
  >
    <button
      className={`primary-btn ${
        activeTool === "generate" ? "active-tool" : ""
      }`}
      onClick={() => setActiveTool("generate")}
    >
      ✨ Generate Website
    </button>

    <button
      className={`primary-btn ${
        activeTool === "analyze" ? "active-tool" : ""
      }`}
      onClick={() => setActiveTool("analyze")}
    >
      📊 Analyze Code
    </button>

    <button
      className={`primary-btn ${
        activeTool === "debug" ? "active-tool" : ""
      }`}
      onClick={() => setActiveTool("debug")}
    >
      🐞 Debug Errors
    </button>

    <button
      className={`primary-btn ${
        activeTool === "chat" ? "active-tool" : ""
      }`}
      onClick={() => setActiveTool("chat")}
    >
      🤖 Ask AI
    </button>
  </div>

  <hr
    style={{
      margin: "25px 0",
      borderColor: "#334155",
    }}
  />

  <h3 style={{ color: "#94a3b8" }}>
    Quick Tips
  </h3>

  <ul
    style={{
      marginTop: "12px",
      color: "#94a3b8",
      lineHeight: "1.9",
      fontSize: "14px",
    }}
  >
    <li>⚡ Use detailed prompts.</li>
    <li>🎨 Mention color palette.</li>
    <li>📱 Ask for responsive design.</li>
    <li>✨ Generate section by section.</li>
  </ul>
</div>

{/* Workspace */}

<div className="card large">
  {activeTool === "generate" && <GeneratePanel
    onGenerate={handleGenerateWebsite}
/>}

  {activeTool === "analyze" && <AnalyzePanel
    onAnalyze={handleAnalyze}
    loading={loading}
/>}

  {activeTool === "debug" && <DebugPanel />}

{activeTool === "chat" && <AIChatPanel />}
</div>
{/* Prompt Library */}

<div className="card">
  <h2>📚 Prompt Library</h2>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "15px",
    }}
  >
    <button className="primary-btn">
      🚀 Create Portfolio Website
    </button>

    <button className="primary-btn">
      🛍 Build Ecommerce Store
    </button>

    <button className="primary-btn">
      🎨 Design Landing Page
    </button>

    <button className="primary-btn">
      📊 Create Admin Dashboard
    </button>
  </div>
</div>

{/* Recent Chats */}

<div className="card">
  <h2>🕒 Recent Chats</h2>
<div style={{ marginTop: "15px" }}>

  <div className="recent-chat">
    💬 Create Portfolio Website
  </div>

  <div className="recent-chat">
    💬 Fix Navbar
  </div>

  <div className="recent-chat">
    💬 Optimize CSS
  </div>

  <div className="recent-chat">
    💬 Explain JavaScript
  </div>

</div>

{/* AI Usage */}

<div className="card">

  <h2>📈 AI Usage</h2>

  <div className="usage-grid">

    <div className="usage-box">
      <h3>18</h3>
      <span>Projects</span>
    </div>

    <div className="usage-box">
      <h3>143</h3>
      <span>AI Requests</span>
    </div>

    <div className="usage-box">
      <h3>61</h3>
      <span>Components</span>
    </div>

    <div className="usage-box">
      <h3>98%</h3>
      <span>Success</span>
    </div>

  </div>


</div>

</div>

</div>

</div>

</div>
);
}