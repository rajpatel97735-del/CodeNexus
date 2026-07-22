import { useRef } from "react";

export default function useAutoSave(handleSave, setSaveStatus) {
  const saveTimeout = useRef(null);

  const autoSave = () => {
    setSaveStatus("💾 Saving...");

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      handleSave();
    }, 2000);
  };

  return {
    autoSave,
  };
}