import { templates } from "./templates";

export default function TemplatesPanel({
  onGenerate,
}) {
  return (
    <div
      style={{
        width: 230,
        background: "#111827",
        borderLeft: "1px solid #334155",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: 15,
          color: "white",
          fontWeight: "bold",
          borderBottom: "1px solid #334155",
        }}
      >
        🎨 Templates
      </div>

      {templates.map((template) => (
        <div
          key={template.id}
          onClick={() => onGenerate(template.prompt)}
          style={{
            padding: 15,
            cursor: "pointer",
            color: "white",
            borderBottom: "1px solid #1e293b",
          }}
        >
          <div style={{ fontSize: 20 }}>
            {template.icon}
          </div>

          <div>{template.title}</div>
        </div>
      ))}
    </div>
  );
}