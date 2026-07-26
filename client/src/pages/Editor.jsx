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
import CommandPalette from "../components/editor/CommandPalette";
import StatusBar from "../components/editor/StatusBar";
import ShortcutModal from "../components/editor/ShortcutModal";
import SettingsModal from "../components/editor/SettingsModal";
import RenameProjectModal from "../components/editor/RenameProjectModal";
import DeploySuccessModal from "../components/editor/DeploySuccessModal";


function Editor() {
  const {
  files,
  updateContent,
  getContent,
  replaceContent,
   replaceFiles,
  activeFileId,
  setActiveFileId,
} = useFiles();
const {
  html,
  css,
  javascript,
} = getContent();
  const { id } = useParams();
  console.log("Project ID:", id);

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
const applyPendingChanges = () => {
  if (!pendingChanges) return;

  replaceContent(pendingChanges);
  setPendingChanges(null);
};

const rejectPendingChanges = () => {
  setPendingChanges(null);
};
const [chatHistory, setChatHistory] = useState([]);
const [startupPrompt, setStartupPrompt] = useState("");
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
  const [renameOpen, setRenameOpen] = useState(false);
   const [projectTitle, setProjectTitle] = useState("");
  const [saveStatus, setSaveStatus] = useState("Saved");
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
const [shortcutOpen, setShortcutOpen] =
useState(false);
const [commandOpen, setCommandOpen] = useState(false);
const [settingsOpen, setSettingsOpen] =
useState(false);
const [deployUrl, setDeployUrl] = useState("");
const [deployOpen, setDeployOpen] = useState(false);
const [cursorPosition, setCursorPosition] = useState({
  line: 1,
  column: 1,
});

const {
  loadProject,
  saveChatHistory,
  handleSave,
} =useProject({
  id,
  getContent,
  replaceContent,
  setChatHistory,
  setSaveStatus,
  setHasUnsavedChanges,
  setProjectTitle,
  projectTitle,
});

const {
  srcDoc,
  previewErrors,
} = usePreview(files);
const [aiState, setAiState] = useState({
  loading: false,
  progress: 0,
  step: "",
  logs: [],
});
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

const commands = [
  {
    icon: "📄",
    label: "New File",
    action: () => setActivePanel("explorer"),
  },
  {
    icon: "🤖",
    label: "Open AI Assistant",
    action: () => setActivePanel("ai"),
  },
  {
    icon: "📜",
    label: "History",
    action: () => setActivePanel("history"),
  },
  {
    icon: "💬",
    label: "Chat History",
    action: () => setActivePanel("chat"),
  },
  {
    icon: "📦",
    label: "Templates",
    action: () => setActivePanel("templates"),
  },
  {
    icon: "🚀",
    label: "Deploy",
    action: handleDeploy,
  },
  {
    icon: "🧹",
    label: "Clear Console",
    action: clearConsole,
  },
  {
    icon: "🎨",
    label: "Toggle Theme",
    action: () =>
      setEditorTheme((t) =>
        t === "vs-dark" ? "light" : "vs-dark"
      ),
  },
];
const quickItems = [
  {
    icon: "📄",
    label: "index.html",
    action: () =>
      setActiveFileId(files.find(f => f.language === "html")?.id),
  },
  {
    icon: "🎨",
    label: "style.css",
    action: () =>
      setActiveFileId(files.find(f => f.language === "css")?.id),
  },
  {
    icon: "⚡",
    label: "script.js",
    action: () =>
      setActiveFileId(files.find(f => f.language === "javascript")?.id),
  },

  ...commands,
];
const containerRef = useRef(null);

const [editorWidth, setEditorWidth] = useState(45);

const [isResizing, setIsResizing] = useState(false);

useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (!hasUnsavedChanges) return;

    e.preventDefault();
    e.returnValue = "";
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, [hasUnsavedChanges]);
useEffect(() => {
  if (!aiState.loading) {
    setLoadingIndex(0);
  }
}, [aiState.loading]);
useEffect(() => {
  const handleKeyDown = (e) => {

    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      handleSave();
    }

    if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      handleRun();
    }

  };

  window.addEventListener("keydown", handleKeyDown);

  return () =>
    window.removeEventListener("keydown", handleKeyDown);

}, []);
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

const currentFile = files.find(
  (file) => file.id === activeFileId
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
  replaceFiles,
  files,
  addConsoleLog,
  
  addMessage,
  saveVersion,
  saveChatHistory,
  setChatHistory,
  aiStatus,
  setAiState,

  // NEW
  setPendingChanges,
});
console.log("FILES =>", files);
const handleAnalyze = () => {
  aiExplain();
};



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

  const changes = pendingChanges;

  // Pehle DiffEditor ko unmount karo
  setPendingChanges(null);

  // Fir next tick me Monaco update karo
  setTimeout(() => {
    replaceContent(changes);

    saveVersion(
      changes.html,
      changes.css,
      changes.javascript
    );

    addConsoleLog("AI changes applied", "success");
  }, 0);
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
   minHeight: "100vh",
overflowY: "auto",
    background: "#0f172a",
  }}
>
 
{aiState.loading && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,.75)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        width: 420,
        background: "#111827",
        borderRadius: 18,
        padding: 30,
        border: "1px solid #334155",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#fff" }}>
        🤖 AI Working...
      </h2>

      <p
        style={{
          color: "#94a3b8",
          marginTop: 10,
        }}
      >
        {aiState.step}
      </p>

      <div
        style={{
          width: "100%",
          height: 10,
          background: "#1e293b",
          borderRadius: 999,
          marginTop: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${aiState.progress}%`,
            height: "100%",
            background: "#2563eb",
            transition: ".3s",
          }}
        />
      </div>

      <p
        style={{
          color: "#38bdf8",
          marginTop: 10,
          fontWeight: 700,
        }}
      >
        {aiState.progress}%
      </p>
    </div>
  </div>
)}
   {pendingChanges && (
  <div
    style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      background: "#1e293b",
      border: "1px solid #334155",
      borderRadius: "12px",
      padding: "16px",
      zIndex: 9999,
      boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    }}
  >
    <p
      style={{
        color: "white",
        marginBottom: "12px",
      }}
    >
      🤖 AI has generated changes. Review them.
    </p>

    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={applyPendingChanges}
        style={{
          background: "#22c55e",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ✅ Accept
      </button>

      <button
        onClick={rejectPendingChanges}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ❌ Reject
      </button>
    </div>
  </div>
)}
<TopBar
  onSave={handleSave}
  onExport={handleDownload}
 onDeploy={async () => {
  const url = await handleDeploy();

  if (!url) return;

  setDeployUrl(url);
  setDeployOpen(true);
}}
  onRun={() => {}}
  onUndo={handleUndo}
  onRedo={handleRedo}
  onAnalyze={handleAnalyze}
  onOptimize={aiOptimize}
  onFix={aiFix}
  saveStatus={saveStatus}
   projectTitle={projectTitle}

  onSettings={() => setSettingsOpen(true)}
  onRename={() => setRenameOpen(true)}
/>
<div className="editor-ai-badge">

🟢 AI Connected

</div>


      {/* ================= Sidebar ================= */}
<div
  style={{
    display: "flex",
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
  }}
>
  <Sidebar
    active={activePanel}
    onChange={setActivePanel}
  />

  {activePanel === "explorer" && (
   <Explorer />
  )}
<div
  style={{
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    overflowX: "hidden",
    minHeight: 0,
  }}
>    {/* Header */}

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
 aiTyping={aiState.loading}
 startupPrompt={startupPrompt}
/>
<ChangesPreview
  pendingChanges={pendingChanges}
  currentHtml={html}
  currentCss={css}
  currentJavascript={javascript}
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
   height:"70vh",
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


    background: "#111827",
    boxShadow: "0 20px 45px rgba(0,0,0,.35)",
    }}
  >
 <FileTabs />
    <MonacoEditor
      height="100%"
      
   language={currentFile?.language || "html"}
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
  updateContent(activeFileId, value || "");

  setHasUnsavedChanges(true);

  autoSave();
}}
onMount={(editor) => {

  editor.onDidChangeCursorPosition((e) => {

    setCursorPosition({

      line: e.position.lineNumber,

      column: e.position.column,

    });

  });

}}
    />
  </div>

  {/* ================= Resize Divider ================= */}

  <div
    onMouseDown={() => setIsResizing(true)}
    style={{
  width: "8px",
  cursor: "col-resize",
  background:
    "linear-gradient(180deg,#2563eb,#7c3aed)",
  margin: "0 6px",
  borderRadius: "999px",
  opacity: .6,
  transition: ".25s",
}}
  />

  {/* ================= Right : Preview ================= */}

  <div
    style={{
      flex: 1,
      minWidth: 300,
      display: "flex",
      flexDirection: "column",
       background:"#111827",
    border:"1px solid #334155",
    borderRadius:"10px",
    boxShadow:"0 20px 45px rgba(0,0,0,.35)",

    }}
  >
 <PreviewPanel
    srcDoc={srcDoc}
    files={files}
/>
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
aiTyping={aiState.loading}
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
<CommandPalette
  open={commandOpen}
  onClose={() => setCommandOpen(false)}
  commands={quickItems}
/>
<StatusBar
   currentFile={currentFile}
   saveStatus={saveStatus}
   aiLoading={aiState.loading}
   cursorPosition={cursorPosition}
/>
<ShortcutModal
  open={shortcutOpen}
  onClose={() => setShortcutOpen(false)}
/>
<SettingsModal
  open={settingsOpen}
  onClose={() => setSettingsOpen(false)}

  editorTheme={editorTheme}
  setEditorTheme={setEditorTheme}

  fontSize={fontSize}
  setFontSize={setFontSize}

  wordWrap={wordWrap}
  setWordWrap={setWordWrap}

  minimap={minimap}
  setMinimap={setMinimap}

  previewMode={previewMode}
  setPreviewMode={setPreviewMode}
/>
<DeploySuccessModal
  open={deployOpen}
  url={deployUrl}
  onClose={() => setDeployOpen(false)}
/>
<RenameProjectModal
  open={renameOpen}
  currentTitle={projectTitle}
  onClose={() => setRenameOpen(false)}
  onSave={async (newTitle) => {
    if (!newTitle.trim()) return;

    setProjectTitle(newTitle);

    await handleSave(newTitle);

    setRenameOpen(false);
  }}
/>

        </div>
        </div>
    </div>

);
}

export default Editor;