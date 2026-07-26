import toast from "react-hot-toast";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  X,
} from "lucide-react";

export default function DeploySuccessModal({
  open,
  url,
  onClose,
}) {
  if (!open) return null;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Deployment URL Copied");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: 520,
          background: "#111827",
          border: "1px solid #334155",
          borderRadius: 18,
          padding: 30,
          color: "#fff",
          animation: "fadeIn .25s ease",
        }}
      >
        {/* Success Icon */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <CheckCircle2
            size={70}
            color="#22c55e"
          />
        </div>

        <h2
          style={{
            textAlign: "center",
            margin: 0,
          }}
        >
          🎉 Deployment Successful
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginTop: 12,
          }}
        >
          Your project has been deployed successfully.
        </p>

        {/* URL */}

        <div
          style={{
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: 10,
            padding: 14,
            marginTop: 25,
            wordBreak: "break-word",
            color: "#38bdf8",
          }}
        >
          {url}
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: 10,
            marginTop: 25,
          }}
        >
          <button
            onClick={copyLink}
            style={button("#2563eb")}
          >
            <Copy size={18} />
            Copy Link
          </button>

          <button
            onClick={() =>
              window.open(url, "_blank")
            }
            style={button("#16a34a")}
          >
            <ExternalLink size={18} />
            Visit Website
          </button>

          <button
            onClick={onClose}
            style={button("#475569")}
          >
            <X size={18} />
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const button = (bg) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
  padding: "12px",
  border: "none",
  borderRadius: 10,
  background: bg,
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
});