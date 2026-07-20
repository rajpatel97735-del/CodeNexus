import { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { getProject, updateProject } from "../services/project.service";
import { generateWebsite } from "../services/ai.service";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import AIPanel from "../components/editor/AIPanel";
import TopBar from "../components/editor/TopBar";
import Explorer from "../components/editor/Explorer";
import FileTabs from "../components/editor/FileTabs";
import PreviewPanel from "../components/editor/PreviewPanel";

function Editor() {
  const { id } = useParams();

  const saveTimeout = useRef(null);

  const [html, setHtml] = useState("<h1>Welcome to CodeNexus 🚀</h1>");

  const [css, setCss] = useState(`h1{
  color:blue;
  text-align:center;
}`);

  const [javascript, setJavascript] = useState(
    `console.log("Hello Raj");`
  );

  const [activeTab, setActiveTab] = useState("html");
  const [saveStatus, setSaveStatus] = useState("Saved");
const [editorWidth, setEditorWidth] = useState(50);
const isDragging = useRef(false);

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

  const handleGenerate = async (prompt) => {
    try {
      const res = await generateWebsite(prompt);

      setHtml(res.data.html);
      setCss(res.data.css);
      setJavascript(res.data.javascript);
    } catch (err) {
      console.error(err);
    }
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
    saveStatus={saveStatus}
/>
<div
  style={{
    display: "flex",
    flex: 1,
  }}
></div>
      {/* ================= Sidebar ================= */}

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
        

        <AIPanel onGenerate={handleGenerate} />

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
        </div>
        </div>
    </div>
  );
}

export default Editor;