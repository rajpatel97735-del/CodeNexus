function CodeReviewPanel({ issues }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: 10,
        padding: 12,
        color: "white",
      }}
    >
      <h3>🩺 Code Review</h3>

      {issues.length === 0 ? (
        <p style={{ color: "#22c55e" }}>
          ✅ No issues found
        </p>
      ) : (
        issues.map((issue, i) => (
          <div key={i}>
            ⚠ {issue.message}
          </div>
        ))
      )}
    </div>
  );
}

export default CodeReviewPanel;