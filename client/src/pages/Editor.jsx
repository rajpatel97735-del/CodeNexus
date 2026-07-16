import { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import { getProject, updateProject } from "../services/project.service";
import JSZip from "jszip";
import { saveAs } from "file-saver";
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

  // ==========================
  // Load Project
  // ==========================
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

  // ==========================
  // Save
  // ==========================
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
  const handleDownload = async () => {
  try {
    const zip = new JSZip();

    // HTML File
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

    // CSS File
    zip.file("style.css", css);

    // JavaScript File
    zip.file("script.js", javascript);

    // Generate ZIP
    const content = await zip.generateAsync({
      type: "blob",
    });

    saveAs(content, "CodeNexus_Project.zip");
  } catch (error) {
    console.error(error);
    alert("Download Failed");
  }
};

  // ==========================
  // Auto Save
  // ==========================
  const autoSave = () => {
    setSaveStatus("💾 Saving...");

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      handleSave();
    }, 2000);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: "#0f172a",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "230px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>📁 Explorer</h2>

        <div
          onClick={() => setActiveTab("html")}
          style={{
            padding: "10px",
            marginTop: "20px",
            cursor: "pointer",
            borderRadius: "6px",
            background:
              activeTab === "html"
                ? "#2563eb"
                : "transparent",
          }}
        >
          📄 index.html
        </div>

        <div
          onClick={() => setActiveTab("css")}
          style={{
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
            borderRadius: "6px",
            background:
              activeTab === "css"
                ? "#2563eb"
                : "transparent",
          }}
        >
          🎨 style.css
        </div>

        <div
          onClick={() => setActiveTab("javascript")}
          style={{
            padding: "10px",
            marginTop: "10px",
            cursor: "pointer",
            borderRadius: "6px",
            background:
              activeTab === "javascript"
                ? "#2563eb"
                : "transparent",
          }}
        >
          ⚡ script.js
        </div>
      </div>

      {/* Main */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "white" }}>
            💻 CodeNexus Editor
          </h1>

          <h3 style={{ color: "#22c55e" }}>
            {saveStatus}
          </h3>
        </div>

        <button
          onClick={handleSave}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            marginBottom: "15px",
            cursor: "pointer",
          }}
        >
          💾 Save Project
        </button>
        <button
  onClick={handleDownload}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    marginLeft: "10px",
    cursor: "pointer",
  }}
>
  📥 Export ZIP
</button>

        <MonacoEditor
          height="500px"
          language={activeTab}
          theme="vs-dark"
          value={
            activeTab === "html"
              ? html
              : activeTab === "css"
              ? css
              : javascript
          }
          onChange={(value) => {
            if (activeTab === "html") {
              setHtml(value || "");
              autoSave();
            } else if (activeTab === "css") {
              setCss(value || "");
              autoSave();
            } else {
              setJavascript(value || "");
              autoSave();
            }
          }}
        />

        <h2
          style={{
            marginTop: "20px",
            color: "white",
          }}
        >
          🌐 Live Preview
        </h2>

        <iframe
          title="preview"
          style={{
            width: "100%",
            height: "450px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
          srcDoc={`
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
`}
        />
      </div>
    </div>
  );
}

export default Editor;