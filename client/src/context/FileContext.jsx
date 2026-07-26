/**
 * ==========================================================
 * CodeNexus AI
 * File Context
 * ==========================================================
 */

import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";

const FileContext = createContext(null);

export function FileProvider({ children }) {

  /* ==========================================
      FILE STATE
  ========================================== */

  const [files, setFiles] = useState([
    {
      id: crypto.randomUUID(),
      name: "index.html",
      path: "index.html",
      language: "html",
      content: "<h1>Hello CodeNexus</h1>",
    },
    {
      id: crypto.randomUUID(),
      name: "style.css",
      path: "style.css",
      language: "css",
      content: "body{font-family:sans-serif;}",
    },
    {
      id: crypto.randomUUID(),
      name: "script.js",
      path: "script.js",
      language: "javascript",
      content: "console.log('CodeNexus');",
    },
  ]);

  const [activeFileId, setActiveFileId] = useState(null);

  /* ==========================================
      ACTIVE FILE
  ========================================== */

  const activeFile = useMemo(() => {

    if (!files.length) return null;

    return (
      files.find(file => file.id === activeFileId) ??
      files[0]
    );

  }, [files, activeFileId]);

  /* ==========================================
      GET CONTENT
  ========================================== */

  const getContent = useCallback(() => {

    return {

      html:
        files.find(f => f.language === "html")
          ?.content || "",

      css:
        files.find(f => f.language === "css")
          ?.content || "",

      javascript:
        files.find(
          f => f.language === "javascript"
        )?.content || "",

    };

  }, [files]);
    /* ==========================================
      UPDATE SINGLE FILE CONTENT
  ========================================== */

  const updateContent = useCallback((fileId, content) => {

    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? {
              ...file,
              content,
            }
          : file
      )
    );

  }, []);

  /* ==========================================
      REPLACE HTML/CSS/JS CONTENT
      (AI Edit)
  ========================================== */

  const replaceContent = useCallback((changes) => {

    if (!changes) return;

    setFiles((prev) =>
      prev.map((file) => {

        if (
          file.language === "html" &&
          changes.html !== undefined
        ) {
          return {
            ...file,
            content: changes.html,
          };
        }

        if (
          file.language === "css" &&
          changes.css !== undefined
        ) {
          return {
            ...file,
            content: changes.css,
          };
        }

        if (
          file.language === "javascript" &&
          changes.javascript !== undefined
        ) {
          return {
            ...file,
            content: changes.javascript,
          };
        }

        return file;

      })
    );

  }, []);

  /* ==========================================
      REPLACE COMPLETE PROJECT
      (AI Generate)
  ========================================== */

  const replaceFiles = useCallback((newFiles) => {

    if (!Array.isArray(newFiles)) return;

    setFiles(newFiles);

    if (newFiles.length > 0) {
      setActiveFileId(newFiles[0].id);
    }

  }, []);

  /* ==========================================
      CREATE NEW FILE
  ========================================== */

  const addFile = useCallback((name, language = "text") => {

    const file = {
      id: crypto.randomUUID(),
      name,
      path: name,
      language,
      content: "",
    };

    setFiles((prev) => [...prev, file]);

    setActiveFileId(file.id);

  }, []);
    /* ==========================================
      OPEN FILE
  ========================================== */

  const openFile = useCallback((fileId) => {

    setActiveFileId(fileId);

  }, []);

  /* ==========================================
      DELETE FILE
  ========================================== */

  const deleteFile = useCallback((fileId) => {

    setFiles((prev) => {

      const updated = prev.filter(
        (file) => file.id !== fileId
      );

      if (activeFileId === fileId) {

        if (updated.length) {
          setActiveFileId(updated[0].id);
        } else {
          setActiveFileId(null);
        }

      }

      return updated;

    });

  }, [activeFileId]);

  /* ==========================================
      RENAME FILE
  ========================================== */

  const renameFile = useCallback((fileId, newName) => {

    if (!newName?.trim()) return;

    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? {
              ...file,
              name: newName.trim(),
              path: newName.trim(),
            }
          : file
      )
    );

  }, []);

  /* ==========================================
      DUPLICATE FILE
  ========================================== */

  const duplicateFile = useCallback((fileId) => {

    setFiles((prev) => {

      const file = prev.find(
        (item) => item.id === fileId
      );

      if (!file) return prev;

      const copy = {
        ...file,
        id: crypto.randomUUID(),
        name: `${file.name} Copy`,
        path: `${file.name} Copy`,
      };

      return [...prev, copy];

    });

  }, []);
    /* ==========================================
      CONTEXT VALUE
  ========================================== */

  const value = useMemo(() => ({
  // State
  files,
  activeFile,
  activeFileId,

  // Setters
  setFiles,
  setActiveFileId,

  // Editor API
  getContent,
  updateContent,
  replaceContent,
  replaceFiles,

  // Explorer API
  addFile,
  openFile,
  deleteFile,
  renameFile,
  duplicateFile,

  // Compatibility aliases
  updateFileContent: updateContent,
  createFile: addFile,
  removeFile: deleteFile,

}), [
  files,
  activeFile,
  activeFileId,
  getContent,
  updateContent,
  replaceContent,
  replaceFiles,
  addFile,
  openFile,
  deleteFile,
  renameFile,
  duplicateFile,
]);
/* ==========================================
    HELPERS
========================================== */

const findFile = useCallback(
  (id) => files.find((file) => file.id === id),
  [files]
);

const clearFiles = useCallback(() => {
  setFiles([]);
  setActiveFileId(null);
}, []);

const fileCount = useMemo(
  () => files.filter((f) => !f.path.endsWith("/")).length,
  [files]
);

const sortedFiles = useMemo(() => {
  return [...files].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}, [files]);

  return (
    <FileContext.Provider value={value}>
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error(
      "useFiles must be used inside FileProvider"
    );
  }

  return context;
}