import { useState } from "react";

export default function useEditorSettings() {
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);
  const [wordWrap, setWordWrap] = useState("on");
  const [minimap, setMinimap] = useState(true);
  const [previewMode, setPreviewMode] = useState("desktop");

  return {
    editorTheme,
    setEditorTheme,

    fontSize,
    setFontSize,

    wordWrap,
    setWordWrap,

    minimap,
    setMinimap,

    previewMode,
    setPreviewMode,
  };
}