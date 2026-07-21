import { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { getProject, updateProject } from "../services/project.service";
import {
  generateWebsite,
  editWebsite,
  fixWebsite,
} from "../services/ai.service";
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
import toast from "react-hot-toast";

function Editor() {
  const { id } = useParams();

  const saveTimeout = useRef(null);

  const [html, setHtml] = useState("<h1>Welcome to CodeNexus 🚀</h1>");

  const [css, setCss] = useState(`h1{
  color:blue;
  text-align:center;
}`);
const [history, setHistory] = useState([]);
const [historyIndex, setHistoryIndex] = useState(-1);
  const [javascript, setJavascript] = useState(
    `console.log("Hello Raj");`
  );
const [activePanel, setActivePanel] =
    useState("explorer");
  const [activeTab, setActiveTab] = useState("html");
  const [saveStatus, setSaveStatus] = useState("Saved");
const [editorWidth, setEditorWidth] = useState(50);
const isDragging = useRef(false);
const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const res = await getProject(id);

        const project = res.data.project;

        setHtml(project.html || "<h1>Welcome to CodeNexus 🚀</h1>");

        setCss(
          project.css ||
            `h1{
  color:blue;
  text-align:center;
}`
        );

        setJavascript(
          project.javascript || `console.log("Hello Raj");`
        );
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      loadProject();
    }
  }, [id]);
  const addMessage = (sender, message) => {
  setChatHistory((prev) => [
    ...prev,
    {
      id: Date.now(),
      sender,
      message,
      time: new Date().toLocaleTimeString(),
    },
  ]);
};

  const handleSave = async () => {
    try {
      await updateProject(id, {
        html,
        css,
        javascript,
      });

      setSaveStatus("✅ Saved");
    } catch (err) {
      console.error(err);
      setSaveStatus("❌ Error");
    }
  };
  const files = [
  {
    id: "html",
    name: "index.html",
    icon: "📄",
  },
  {
    id: "css",
    name: "style.css",
    icon: "🎨",
  },
  {
    id: "javascript",
    name: "script.js",
    icon: "⚡",
  },
];

const [activeFile, setActiveFile] = useState("html");

  const autoSave = () => {
    setSaveStatus("💾 Saving...");

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      handleSave();
    }, 2000);
  };
  const saveVersion = (newHtml, newCss, newJavascript) => {
  const newHistory = history.slice(0, historyIndex + 1);

  newHistory.push({
    html: newHtml,
    css: newCss,
    javascript: newJavascript,
    createdAt: new Date().toLocaleTimeString(),
  });

  setHistory(newHistory);
  setHistoryIndex(newHistory.length - 1);
};

  const handleGenerate = async (prompt) => {
  try {
    // User message
    addMessage("user", prompt);

    const res = await generateWebsite(prompt);

    setHtml(res.data.html);
    setCss(res.data.css);
    setJavascript(res.data.javascript);

    // Save Version
    saveVersion(
      res.data.html,
      res.data.css,
      res.data.javascript
    );

    // AI message
    toast.success("Website Generated Successfully");
  } catch (err) {
    console.error(err);

    toast.success("ai", "❌ Failed to Generate Website");
  }
};
  const handleEdit = async (prompt) => {
  try {
    // User message
    addMessage("user", prompt);

    const res = await editWebsite({
      prompt,
      html,
      css,
      javascript,
    });

    setHtml(res.data.html);
    setCss(res.data.css);
    setJavascript(res.data.javascript);

    // Save Version
    saveVersion(
      res.data.html,
      res.data.css,
      res.data.javascript
    );

    // AI message
toast.success("Website Updated Successfully");
  } catch (err) {
    console.error(err);

    toast.success("ai", "❌ Failed to Update Website");
  }
};
const handleFix = async () => {
  try {
    addMessage("user", "🛠 Fix my website");

    const res = await fixWebsite({
      html,
      css,
      javascript,
    });

    setHtml(res.data.html);
    setCss(res.data.css);
    setJavascript(res.data.javascript);

    saveVersion(
      res.data.html,
      res.data.css,
      res.data.javascript
    );

   toast.success("Website Fixed Successfully");
  } catch (err) {
    console.error(err);
    toast.success("ai", "❌ Failed to Fix Website");
  }
};
const handleUndo = () => {
  if (historyIndex <= 0) return;

  const previous = history[historyIndex - 1];

  setHtml(previous.html);
  setCss(previous.css);
  setJavascript(previous.javascript);

  setHistoryIndex(historyIndex - 1);
};

const handleRedo = () => {
  if (historyIndex >= history.length - 1) return;

  const next = history[historyIndex + 1];

  setHtml(next.html);
  setCss(next.css);
  setJavascript(next.javascript);

  setHistoryIndex(historyIndex + 1);
};
const restoreVersion = (index) => {
  const version = history[index];

  if (!version) return;

  setHtml(version.html);
  setCss(version.css);
  setJavascript(version.javascript);

  setHistoryIndex(index);
};
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

  const srcDoc = `
<!DOCTYPE html>
<html>
<head>
<style>
${css}
</style>
</head>

<body>

${html}

<script>
${javascript}
<\/script>

</body>
</html>
`;

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
  onFix={handleFix}
  saveStatus={saveStatus}
/>
<div
  style={{
    display: "flex",
    flex: 1,
  }}
></div>
      {/* ================= Sidebar ================= */}
<Sidebar
    active={activePanel}
    onChange={setActivePanel}
/>
      <Explorer
  files={files}
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
  onGenerate={handleGenerate}
  onEdit={handleEdit}
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
  files={files}
  activeFile={activeFile}
  setActiveFile={setActiveFile}
/>
            <MonacoEditor
              height="100%"
              language={activeFile}
              theme="vs-dark"
              value={
  activeFile === "html"
    ? html
    : activeFile === "css"
    ? css
    : javascript
}
              onChange={(value) => {
                if (activeFile === "html") {
                  setHtml(value || "");
                  autoSave();
                } else if (activeFile === "css") {
                  setCss(value || "");
                  autoSave();
                } else {
                  setJavascript(value || "");
                  autoSave();
                }
              }}
            />
          </div>

          {/* Right */}

          <PreviewPanel srcDoc={srcDoc} />

{activePanel === "history" && (
  <HistoryPanel
    history={history}
    historyIndex={historyIndex}
    onRestore={restoreVersion}
  />
)}

{activePanel === "chat" && (
  <ChatHistory history={chatHistory} />
)}

{activePanel === "templates" && (
  <TemplatesPanel
    onGenerate={handleGenerate}
  />
)}
{activePanel === "components" && (
  <ComponentLibrary
    onSelect={(component) =>
      handleEdit(`Add a modern ${component.name} section`)
    }
  />
)}
        </div>
        </div>
    </div>
  );
}

export default Editor;