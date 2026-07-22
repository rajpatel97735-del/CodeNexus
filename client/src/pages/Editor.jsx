import { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import ChangesPreview from "../components/editor/ChangesPreview";
import useHistory from "../hooks/useHistory";
import ConsolePanel from "../components/editor/ConsolePanel";
import AIPlanner from "../components/editor/AIPlanner";
import useDeploy from "../hooks/useDeploy";
import toast from "react-hot-toast";
import useProject from "../hooks/useProject";
import useEditorAI from "../hooks/useEditorAI";
import useConsole from "../hooks/useConsole";
import useAutoSave from "../hooks/useAutoSave";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import AIPanel from "../components/editor/AIPanel";
import TopBar from "../components/editor/TopBar";
import Explorer from "../components/editor/Explorer";
import FileTabs from "../components/editor/FileTabs";
import PreviewPanel from "../components/editor/PreviewPanel";
import HistoryPanel from "../components/editor/HistoryPanel";
import ChatHistory from "../components/editor/ChatHistory";
import TemplatesPanel from "../templates/TemplatesPanel";
import Sidebar from "../components/sidebar/Sidebar";
import ComponentLibrary from "../components/library/ComponentLibrary";
import usePreview from "../hooks/usePreview";
import { useFiles } from "../context/FileContext";
import useEditorSettings from "../hooks/useEditorSettings";
import useAIStatus from "../hooks/useAIStatus";
import useCodeReview from "../hooks/useCodeReview";



function Editor() {
  const {
  files,
  updateContent,
  getContent,
  replaceContent,
} = useFiles();
const {
  html,
  css,
  javascript,
} = getContent();
  const { id } = useParams();

const aiStatus = useAIStatus();
const { issues, analyze } = useCodeReview();
const {
  consoleLogs,
  addConsoleLog,
  clearConsole,
} = useConsole();
  const { handleDeploy } = useDeploy({
  getContent,
  addConsoleLog,
});

const [pendingChanges, setPendingChanges] = useState(null);
const [chatHistory, setChatHistory] = useState([]);
const {
  versionHistory,
  historyIndex,
  saveVersion,
  handleUndo,
  handleRedo,
  restoreVersion,
} = useHistory(updateContent, addConsoleLog);

  
 //const [openTabs, setOpenTabs] = useState([]);
 
const [activePanel, setActivePanel] =
    useState("explorer");
  const [plan, setPlan] = useState(null);
  const [saveStatus, setSaveStatus] = useState("Saved");

const {
  loadProject,
  saveChatHistory,
  handleSave,
} = useProject({
  id,
  getContent,
  replaceContent,
  setChatHistory,
  setSaveStatus,
});
const {
  srcDoc,
  previewErrors,
} = usePreview(files);
const [aiTyping, setAiTyping] = useState(false);
const loadingSteps = [
  "🧠 Understanding Prompt...",
  "🎨 Planning UI...",
  "📄 Generating HTML...",
  "🎨 Styling CSS...",
  "⚡ Writing JavaScript...",
  "🚀 Finalizing Website...",
];

const [loadingIndex, setLoadingIndex] = useState(0);
const {
  editorTheme,
  setEditorTheme,
  fontSize,
  setFontSize,
  wordWrap,
  setWordWrap,
  minimap,
  setMinimap,
  previewMode,
  setPreviewMode,
} = useEditorSettings();
// ================= Resize Panel =================

const containerRef = useRef(null);

const [editorWidth, setEditorWidth] = useState(45);

const [isResizing, setIsResizing] = useState(false);
useEffect(() => {
  addConsoleLog("🚀 CodeNexus Editor Started", "info");
}, []);

useEffect(() => {
  if (id) {
    loadProject();
  }
}, [id]);

useEffect(() => {
  if (!aiTyping) {
    setLoadingIndex(0);
    return;
  }

  const timer = setInterval(() => {
    setLoadingIndex((prev) =>
      prev >= loadingSteps.length - 1 ? prev : prev + 1
    );
  }, 800);

  return () => clearInterval(timer);
}, [aiTyping]);

useEffect(() => {
  const handleMouseMove = (e) => {
    if (!isResizing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    let percentage =
      ((e.clientX - rect.left) / rect.width) * 100;

    if (percentage < 25) percentage = 25;
    if (percentage > 75) percentage = 75;

    setEditorWidth(percentage);
  };
  
  const stopResize = () => {
    setIsResizing(false);
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", stopResize);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", stopResize);
  };
}, [isResizing]);
  
 const addMessage = (sender, message) => {
  const newHistory = [
    ...chatHistory,
    {
      id: Date.now(),
      sender,
      message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ];

  setChatHistory(newHistory);

  return newHistory;

};

const openPlanner = () => {
  setPlan({
    title: "E-Commerce Website",
    steps: [
      "Create React Project",
      "Create Navbar",
      "Create Hero Section",
      "Create Product Grid",
      "Create Shopping Cart",
      "Create Footer",
      "Responsive CSS",
      "JavaScript Logic",
    ],
    estimatedFiles: 8,
    estimatedTime: "25 sec",
  });
};
const handleGenerateProject = () => {
  setPlan(null);

  // Yaha baad me AI Generate call hoga
};

const handleCancelPlanner = () => {
  setPlan(null);
};
const [activeFile, setActiveFile] = useState("html");
const currentFile = files.find(
  (file) => file.id === activeFile
);

const { autoSave } = useAutoSave(
  handleSave,
  setSaveStatus
);
 
  const {
  handleGenerate: aiGenerate,
  handleEdit: aiEdit,
  handleFix: aiFix,
  handleOptimize: aiOptimize,
  handleExplain: aiExplain,
  handleAgent: aiAgent,
} = useEditorAI({
  getContent,
  replaceContent,
  addConsoleLog,
  addMessage,
  saveVersion,
  saveChatHistory,
  setChatHistory,
  aiStatus,
  setAiTyping,

  // NEW
  setPendingChanges,
});



  const handleDownload = async () => {
    try {
      const zip = new JSZip();

      zip.file(
        "index.html",
        `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CodeNexus AI Project</title>

<link rel="stylesheet" href="style.css">
</head>

<body>

${html}

<script src="script.js"></script>


</body>
</html>`
      );

      zip.file("style.css", css);
      zip.file("script.js", javascript);
zip.file(
  "README.md",
`# CodeNexus AI Project

Generated by CodeNexus AI

## Files

- index.html
- style.css
- script.js

## Run

Simply open index.html in your browser.

Generated on: ${new Date().toLocaleString()}
`
);
      const content = await zip.generateAsync({
        type: "blob",
      });

      saveAs(content, "CodeNexus_Project.zip");
        toast.success("Project exported successfully");
    } catch (error) {
      console.error(error);
     toast.error("Failed to export project");
    }
  };
  const applyChanges = () => {
  if (!pendingChanges) return;

  replaceContent(pendingChanges);

  saveVersion(
    pendingChanges.html,
    pendingChanges.css,
    pendingChanges.javascript
  );

  setPendingChanges(null);

  addConsoleLog("AI changes applied", "success");

};
const rejectChanges = () => {
  setPendingChanges(null);

  addConsoleLog("AI changes rejected", "info");
};
//console.log("HTML:", html);
//console.log("CSS:", css);
//console.log("JS:", javascript);

  return (
       <div
  style={{
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    background: "#0f172a",
  }}
>
  {aiTyping && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,.82)",
      backdropFilter: "blur(6px)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: 500,
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: 18,
        padding: 35,
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 55,
          marginBottom: 20,
        }}
      >
        🤖
      </div>

      <h2
        style={{
          color: "#22c55e",
          marginBottom: 20,
        }}
      >
        CodeNexus AI
      </h2>

      <p
        style={{
          fontSize: 18,
          marginBottom: 25,
        }}
      >
        {loadingSteps[loadingIndex]}
      </p>

      <div
        style={{
          height: 8,
          background: "#1e293b",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${((loadingIndex + 1) / loadingSteps.length) * 100}%`,
            height: "100%",
            background: "#22c55e",
            transition: "0.4s",
          }}
        />
      </div>

      <p
        style={{
          marginTop: 18,
          color: "#94a3b8",
        }}
      >
        Please wait while AI builds your website...
      </p>
    </div>
  </div>
)}
  
<TopBar
  onSave={handleSave}
  onExport={handleDownload}
  onDeploy={handleDeploy}
  onRun={() => {}}
  onUndo={handleUndo}
  onRedo={handleRedo}
  onFix={aiFix}
  saveStatus={saveStatus}
/>


      {/* ================= Sidebar ================= */}
<div
  style={{
    display: "flex",
    flex: 1,
    overflow: "hidden",
  }}
>
  <Sidebar
    active={activePanel}
    onChange={setActivePanel}
  />

  {activePanel === "explorer" && (
    <Explorer
      activeFile={activeFile}
      setActiveFile={setActiveFile}
    />
  )}

  <div
    style={{
      flex: 1,
      padding: "20px",
      overflow: "hidden",
    }}
  >
        {/* Header */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          

          <h3 style={{ color: "#22c55e" }}>
            {saveStatus}
          </h3>
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <button onClick={openPlanner}>
  Test AI Planner
</button>
         
        </div>
        
<AIPanel
    onAgent={aiAgent}
    history={chatHistory}
    aiTyping={aiTyping}
/>
<ChangesPreview
  pendingChanges={pendingChanges}
  onApply={applyChanges}
  onReject={rejectChanges}
/>
<AIPlanner
  plan={plan}
  onGenerate={handleGenerateProject}
  onCancel={handleCancelPlanner}
/>
{/* ================= Editor + Preview ================= */}

<div
  ref={containerRef}
  style={{
    display: "flex",
    gap: 0,
    marginTop: "20px",
    height: "75vh",
  }}
>
  {/* ================= Left : Monaco ================= */}

  <div
    style={{
      width: `${editorWidth}%`,
      minWidth: 300,
      border: "1px solid #334155",
      borderRadius: "10px",
      overflow: "hidden",
    }}
  >
    <FileTabs
      activeFile={activeFile}
      setActiveFile={setActiveFile}
    />

    <MonacoEditor
      height="100%"
      language={activeFile}
      theme={editorTheme}
      value={currentFile?.content || ""}
      options={{
        fontSize,
        wordWrap,
        minimap: {
          enabled: minimap,
        },
        automaticLayout: true,
        scrollBeyondLastLine: false,
        smoothScrolling: true,
        cursorBlinking: "smooth",
        roundedSelection: true,
        padding: {
          top: 12,
        },
      }}
      onChange={(value) => {
        updateContent(activeFile, value || "");
      }}
    />
  </div>

  {/* ================= Resize Divider ================= */}

  <div
    onMouseDown={() => setIsResizing(true)}
    style={{
      width: "6px",
      cursor: "col-resize",
      background: "#334155",
      margin: "0 8px",
      borderRadius: "10px",
      transition: "0.2s",
    }}
  />

  {/* ================= Right : Preview ================= */}

  <div
    style={{
      flex: 1,
      minWidth: 300,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <PreviewPanel srcDoc={srcDoc} />
  </div>
</div>

{/* ================= Side Panels ================= */}

{activePanel === "console" && (
  <ConsolePanel
    logs={consoleLogs}
    onClear={clearConsole}
  />
)}

{activePanel === "history" && (
  <HistoryPanel
    history={versionHistory}
    historyIndex={historyIndex}
    onRestore={restoreVersion}
  />
)}

{activePanel === "chat" && (
  <ChatHistory
    history={chatHistory}
    aiTyping={aiTyping}
  />
)}

{activePanel === "templates" && (
  <TemplatesPanel
    onGenerate={aiGenerate}
  />
)}

{activePanel === "components" && (
  <ComponentLibrary
    onSelect={(component) =>
      aiEdit(`Add a modern ${component.name} section`)
    }
  />
)}

        </div>
        </div>
    </div>
  );
}

export default Editor;