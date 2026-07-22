import { useState } from "react";

export default function useConsole() {
  const [consoleLogs, setConsoleLogs] = useState([]);

  const addConsoleLog = (message, type = "info") => {
    setConsoleLogs((prev) => [
      ...prev,
      {
        // Date.now() duplicate ho sakta hai
        id: crypto.randomUUID(),
        message,
        type,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const clearConsole = () => {
    setConsoleLogs([]);
  };

  return {
    consoleLogs,
    addConsoleLog,
    clearConsole,
  };
}