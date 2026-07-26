import { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  const defaultFiles = [
    {
      id: "html",
      name: "index.html",
      language: "html",
      icon: "📄",
      content: "<h1>Welcome to CodeNexus 🚀</h1>",
      path: "index.html",
    },
    {
      id: "css",
      name: "style.css",
      language: "css",
      icon: "🎨",
      content: `body{
  margin:0;
  padding:30px;
  font-family:Arial;
}`,
      path: "css/style.css",
    },
    {
      id: "javascript",
      name: "script.js",
      language: "javascript",
      icon: "⚡",
      content: `console.log("Welcome to CodeNexus");`,
      path: "js/script.js",
    },
  ];
const [openTabs, setOpenTabs] = useState([
  defaultFiles[0].id,
]);
  const [files, setFiles] = useState(defaultFiles);
  const [activeFileId, setActiveFileId] = useState(defaultFiles[0].id);

  const activeFile =
    files.find((file) => file.id === activeFileId) || files[0];

  const getIcon = (language) => {
    switch (language) {
      case "html":
        return "📄";
      case "css":
        return "🎨";
      case "javascript":
        return "⚡";
      case "jsx":
      case "tsx":
        return "⚛️";
      case "json":
        return "🟨";
      case "md":
        return "📝";
      default:
        return "📄";
    }
  };

  const openFile = (id) => {

  if (!openTabs.includes(id)) {

    setOpenTabs((prev) => [...prev, id]);

  }

  setActiveFileId(id);

};
const closeTab = (id) => {

  const remaining = openTabs.filter(
    (tab) => tab !== id
  );

  setOpenTabs(remaining);

  if (activeFileId === id && remaining.length) {

    setActiveFileId(
      remaining[remaining.length - 1]
    );

  }

};
  const addFile = (
    name,
    language,
    content = "",
    path = name
  ) => {
    const newFile = {
      id: crypto.randomUUID(),
      name,
      language,
      icon: getIcon(language),
      content,
      path,
    };

    setFiles((prev) => [...prev, newFile]);

    return newFile;
  };

  const addMultipleFiles = (newFiles) => {
    const formatted = newFiles.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      language: file.language,
      icon: getIcon(file.language),
     content:
  typeof file.content === "string"
    ? file.content
    : JSON.stringify(file.content, null, 2),
      path: file.path || file.name,
    }));

    setFiles((prev) => [...prev, ...formatted]);
  };

  const deleteFile = (id) => {
    setFiles((prev) =>
      prev.filter((file) => file.id !== id)
    );
  };

  const renameFile = (id, name) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
              ...file,
              name,
            }
          : file
      )
    );
  };

  const updateContent = (id, content) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
              ...file,
              content,
            }
          : file
      )
    );
  };
    const getFile = (id) => {
    return files.find((file) => file.id === id);
  };

  const getFileByPath = (path) => {
    return files.find((file) => file.path === path);
  };

  const getAllFiles = () => {
    return files;
  };

  const updateFile = (id, updates) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id
          ? {
              ...file,
              ...updates,
            }
          : file
      )
    );
  };

  const duplicateFile = (id) => {
    const file = getFile(id);

    if (!file) return;

    const ext = file.name.includes(".")
      ? file.name.split(".").pop()
      : "";

    const base = ext
      ? file.name.replace(`.${ext}`, "")
      : file.name;

    const copy = {
      ...file,
      id: crypto.randomUUID(),
      name: `${base} Copy${ext ? `.${ext}` : ""}`,
    };

    setFiles((prev) => [...prev, copy]);
  };

  const moveFile = (id, newPath) => {
    updateFile(id, {
      path: newPath,
    });
  };

  const replaceContent = ({ html, css, javascript }) => {
    updateContent("html", html);
    updateContent("css", css);
    updateContent("javascript", javascript);
  };

  const getContent = () => {
    return {
      html:
        files.find((f) => f.id === "html")?.content || "",

      css:
        files.find((f) => f.id === "css")?.content || "",

      javascript:
        files.find((f) => f.id === "javascript")?.content || "",
    };
  };

const replaceFiles = (newFiles) => {
  if (!Array.isArray(newFiles) || !newFiles.length) return;

  const formatted = newFiles.map((file) => {
    const path = file.path || file.name;

    const name =
      file.name ||
      path.split("/").pop();

    const language =
      file.language ||
      name.split(".").pop();

    return {
      id: crypto.randomUUID(),
      name,
      path,
      language,
      icon: getIcon(language),
     content:
  typeof file.content === "string"
    ? file.content
    : JSON.stringify(file.content, null, 2),
    };
  });

  setFiles(formatted);

  setActiveFileId(formatted[0].id);

  setOpenTabs([formatted[0].id]);
};

  return (
    <FileContext.Provider
      value={{
        activeFile,
        activeFileId,
        setActiveFileId,

        files,
        setFiles,

        addFile,
        addMultipleFiles,
        replaceFiles,

        deleteFile,
        renameFile,

        updateContent,
        updateFile,

        replaceContent,

        getContent,
        getFile,
        getFileByPath,
        getAllFiles,

        duplicateFile,
        moveFile,
        openTabs,
setOpenTabs,

openFile,

closeTab,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);