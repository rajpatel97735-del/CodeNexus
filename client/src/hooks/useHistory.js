import { useState } from "react";

export default function useHistory(updateContent, addConsoleLog) {
  const [versionHistory, setVersionHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const saveVersion = (html, css, javascript) => {
    const newHistory = versionHistory.slice(0, historyIndex + 1);

    newHistory.push({
      html,
      css,
      javascript,
      createdAt: new Date().toLocaleTimeString(),
    });

    setVersionHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex <= 0) return;

    const previous = versionHistory[historyIndex - 1];

    updateContent("html", previous.html);
    updateContent("css", previous.css);
    updateContent("javascript", previous.javascript);

    setHistoryIndex(historyIndex - 1);

    addConsoleLog("Undo applied", "info");
  };

  const handleRedo = () => {
    if (historyIndex >= versionHistory.length - 1) return;

    const next = versionHistory[historyIndex + 1];

    updateContent("html", next.html);
    updateContent("css", next.css);
    updateContent("javascript", next.javascript);

    setHistoryIndex(historyIndex + 1);

    addConsoleLog("Redo applied", "info");
  };

  const restoreVersion = (index) => {
    const version = versionHistory[index];

    if (!version) return;

    updateContent("html", version.html);
    updateContent("css", version.css);
    updateContent("javascript", version.javascript);

    setHistoryIndex(index);

    addConsoleLog(`Restored Version #${index + 1}`, "info");
  };

  return {
    versionHistory,
    historyIndex,

    saveVersion,
    handleUndo,
    handleRedo,
    restoreVersion,
  };
}