import { useState } from "react";

export default function useAIStatus() {
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const start = () => {
    setStatus("🤖 Thinking...");
    setProgress(10);
  };

  const update = (message, value) => {
    setStatus(message);
    setProgress(value);
  };

  const finish = () => {
    setStatus("✅ Completed");
    setProgress(100);

    setTimeout(() => {
      setStatus("");
      setProgress(0);
    }, 1500);
  };

  return {
    status,
    progress,
    start,
    update,
    finish,
  };
}