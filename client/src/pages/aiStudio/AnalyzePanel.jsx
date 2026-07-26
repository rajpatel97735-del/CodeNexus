import { BarChart3, Search } from "lucide-react";

export default function AnalyzePanel({
  onAnalyze,
  loading,
}) {
  return (
    <div
      style={{
        background: "#1e293b",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #334155",
      }}
    >
      <h2
        style={{
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <BarChart3 size={24} />
        Analyze Project
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <div className="analysis-box">
          <h4>HTML Quality</h4>
          <p>95%</p>
        </div>

        <div className="analysis-box">
          <h4>CSS Quality</h4>
          <p>92%</p>
        </div>

        <div className="analysis-box">
          <h4>JavaScript</h4>
          <p>90%</p>
        </div>

        <div className="analysis-box">
          <h4>Performance</h4>
          <p>89%</p>
        </div>
      </div>

      <div
        style={{
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "18px",
          color: "#cbd5e1",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ color: "#fff" }}>AI Suggestions</h3>

        <ul
          style={{
            marginTop: "12px",
            lineHeight: "2",
          }}
        >
          <li>✔ Improve accessibility.</li>
          <li>✔ Optimize CSS selectors.</li>
          <li>✔ Reduce unused JavaScript.</li>
          <li>✔ Add lazy loading for images.</li>
        </ul>
      </div>

      <button
  disabled={loading}
  onClick={onAnalyze}       style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "10px",
          background: "linear-gradient(90deg,#2563eb,#3b82f6)",
          color: "#fff",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        <Search size={18} />
      {loading ? "Analyzing..." : "Analyze Project"}
      </button>
    </div>
  );
}