import { useState } from "react";

function ChangesPreview({
  pendingChanges,
  currentHtml,
  currentCss,
  currentJavascript,
  onApply,
  onReject,
}){
  if (!pendingChanges) return null;

  const PreviewCard = ({
  title,
  content,
  originalContent,
  icon,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "12px 16px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#0f172a",
        }}
      >
        <span
          style={{
            color: "#38bdf8",
            fontWeight: "bold",
          }}
        >
          {icon} {title}
        </span>

        <span
          style={{
            color: "#94a3b8",
            fontSize: 18,
          }}
        >
          {open ? "▲" : "▼"}
        </span>
      </div>

      {open && (
      <div
  style={{
    background: "#0f172a",
    color: "#fff",
    padding: 15,
    fontFamily: "monospace",
    whiteSpace: "pre-wrap",
    overflow: "auto",
    maxHeight: 300,
  }}
>
  {content}
</div>
      )}
    </div>
  );
};
  return (
    <div
      style={{
        marginTop: 20,
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: 12,
        padding: 16,
        color: "white",
      }}
    >
    <div style={{ marginBottom: 15 }}>
  <h2>🤖 AI Changes Preview</h2>

  <p
    style={{
      color: "#94a3b8",
      marginTop: 10,
    }}
  >
    {[
      pendingChanges.html,
      pendingChanges.css,
      pendingChanges.javascript,
    ].filter(Boolean).length}{" "}
    file(s) modified by AI.
  </p>
</div>
      <div
        style={{
          display: "grid",
          gap: 15,
        }}
      >
        {pendingChanges.html && (
          <PreviewCard
  title="index.html"
  icon="🌐"
  content={pendingChanges.html}
  originalContent={currentHtml}
/>
        )}

        {pendingChanges.css && (
         <PreviewCard
  title="style.css"
  icon="🎨"
  content={pendingChanges.css}
  originalContent={currentCss}
/>
        )}

        {pendingChanges.javascript && (
         <PreviewCard
  title="script.js"
  icon="📜"
  content={pendingChanges.javascript}
  originalContent={currentJavascript}
/>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: 20,
        }}
      >
       <button
  onClick={onReject}
  style={{
    flex: 1,
    background: "#374151",
    border: "none",
    color: "white",
    padding: 14,
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  ❌ Discard
</button>

<button
  onClick={onApply}
  style={{
    flex: 1,
    background: "#22c55e",
    border: "none",
    color: "white",
    padding: 14,
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  ✅ Apply Changes
</button>
      </div>
    </div>
  );
}

export default ChangesPreview;