import { useEffect, useRef, useState } from "react";
import PreviewManager from "../runtime/core/PreviewManager";
import RuntimeManager from "../runtime/core/RuntimeManager";
import { useMemo } from "react";

export default function ReactPreview({ files }) {
  const iframeRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
const projectHash = useMemo(() => {
    return JSON.stringify(
        files.map((f) => ({
            path: f.path,
            content: f.content,
        }))
    );
}, [files]);
const lastHashRef = useRef("");
  useEffect(() => {
if (lastHashRef.current === projectHash) {
        return;
    }

    lastHashRef.current = projectHash;

    console.log("✅ ReactPreview mounted");

    PreviewManager.attach(iframeRef.current);

    let cancelled = false;

    async function bootPreview() {
       console.log("🚀 Boot Preview Started"); 
      try {
        setLoading(true);
        setError("");
console.log("▶️ Starting Dev Server");
        await RuntimeManager.stopDevServer();
console.log("📁 Mounting Files", files);
        await RuntimeManager.mount(files);
console.log("📦 Installing Dependencies");
        await RuntimeManager.installDependencies();

        RuntimeManager.onServerReady((url) => {
             console.log("🌍 Server Ready:", url);
          if (cancelled) return;

          if (iframeRef.current) {
            iframeRef.current.src = url;
          }

          setLoading(false);
        });

        await RuntimeManager.startDevServer();
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    bootPreview();

    return () => {
      cancelled = true;
    };
}, [projectHash]);

  if (loading) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          background: "#111827",
        }}
      >
        Starting React Preview...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          color: "red",
          padding: 20,
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title="React Preview"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        background: "#fff",
      }}
    />
  );
}