import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import ChangesPreview from "../components/editor/ChangesPreview";
import useHistory from "../hooks/useHistory";
import ConsolePanel from "../components/editor/ConsolePanel";

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
useEffect(() => {
  addConsoleLog("🚀 CodeNexus Editor Started", "info");
}, []);

useEffect(() => {
  if (id) {
    loadProject();
  }
}, [id]);
  
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

      const content = await zip.generateAsync({
        type: "blob",
      });

      saveAs(content, "CodeNexus_Project.zip");
    } catch (error) {
      console.error(error);
      alert("Download Failed");
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
 <TopBar
  onSave={handleSave}
  onExport={handleDownload}
  onRun={() => {}}
  onUndo={handleUndo}
  onRedo={handleRedo}
  onFix={aiFix}
  saveStatus={saveStatus}
/>


      {/* ================= Sidebar ================= */}
<Sidebar
    active={activePanel}
    onChange={setActivePanel}
/>
   <Explorer
  activeFile={activeFile}
  setActiveFile={setActiveFile}
 
/>
      {/* ================= Main ================= */}

      <div
        style={{
          flex: 1,
          padding: "20px",
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
        {/* ================= Editor + Preview ================= */}

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "20px",
            height: "75vh",
          }}
        >
          {/* Left */}

          <div
            style={{
              flex: 1,
              border: "1px solid #334155",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
           <FileTabs
  activeFile={activeFile}
  setActiveFile={setActiveFile}
/>
{/*
<EditorTabs
  openTabs={openTabs}
  setOpenTabs={setOpenTabs}
  activeFile={activeFile}
  setActiveFile={setActiveFile}
/>*/}
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
  updateContent(
    activeFile,
    value || ""
  );
}}
/>
          </div>

          {/* Right */}

          <PreviewPanel srcDoc={srcDoc} />
        <ConsolePanel
  logs={consoleLogs}
  onClear={clearConsole}
/>

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