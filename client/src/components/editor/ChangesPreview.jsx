function ChangesPreview({
  pendingChanges,
  onApply,
  onReject,
}) {
  if (!pendingChanges) return null;

  const PreviewCard = ({ title, content, icon }) => (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 10,
        padding: 12,
      }}
    >
      <h4
        style={{
          marginBottom: 10,
          color: "#38bdf8",
        }}
      >
        {icon} {title}
      </h4>

      <pre
        style={{
          margin: 0,
          maxHeight: 140,
          overflow: "auto",
          whiteSpace: "pre-wrap",
          color: "#cbd5e1",
          fontSize: 13,
        }}
      >
        {content.substring(0, 500)}
        {content.length > 500 && "\n\n..."}
      </pre>
    </div>
  );

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
      <h2
        style={{
          marginBottom: 15,
        }}
      >
        🤖 AI Changes Preview
      </h2>

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
          />
        )}

        {pendingChanges.css && (
          <PreviewCard
            title="style.css"
            icon="🎨"
            content={pendingChanges.css}
          />
        )}

        {pendingChanges.javascript && (
          <PreviewCard
            title="script.js"
            icon="📜"
            content={pendingChanges.javascript}
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
          onClick={onApply}
          style={{
            flex: 1,
            background: "#16a34a",
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

        <button
          onClick={onReject}
          style={{
            flex: 1,
            background: "#dc2626",
            border: "none",
            color: "white",
            padding: 14,
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ❌ Reject
        </button>
      </div>
    </div>
  );
}

export default ChangesPreview;