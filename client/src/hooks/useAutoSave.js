import { useRef } from "react";

export default function useAutoSave(handleSave, setSaveStatus) {
  const saveTimeout = useRef(null);

  const autoSave = () => {
    // Reset previous timer
    clearTimeout(saveTimeout.current);

    // Show Saving...
    setSaveStatus("🟡 Saving...");

    saveTimeout.current = setTimeout(async () => {
      try {
        await handleSave();
      } catch (err) {
        console.error(err);
        setSaveStatus("🔴 Save Failed");
      }
    }, 2000);
  };

  return {
    autoSave,
  };
}