import "./../../styles/ai-planner.css";

export default function AIPlanner({
  plan,
  onGenerate,
  onCancel,
}) {
  if (!plan) return null;

  return (
    <div className="planner-overlay">
      <div className="planner-card">

        <h2>🧠 AI Execution Plan</h2>

        <p className="planner-title">
          {plan.title}
        </p>

        <div className="planner-steps">
          {plan.steps.map((step, index) => (
            <div
              key={index}
              className="planner-step"
            >
              ✅ {step}
            </div>
          ))}
        </div>

        <div className="planner-info">

          <div>
            📄 Estimated Files
            <strong>
              {plan.estimatedFiles}
            </strong>
          </div>

          <div>
            ⏱ Estimated Time
            <strong>
              {plan.estimatedTime}
            </strong>
          </div>

        </div>

        <div className="planner-buttons">

          <button
            className="planner-generate"
            onClick={onGenerate}
          >
            🚀 Generate Project
          </button>

          <button
            className="planner-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}