import { createContext, useContext, useState } from "react";

const FileContext = createContext();

export const FileProvider = ({ children }) => {
  
  const [files, setFiles] = useState([
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
    path: "index.html",
    },
    {
      id: "javascript",
      name: "script.js",
      language: "javascript",
      icon: "⚡",
      content: `console.log("Welcome to CodeNexus");`,
     path: "script.js",
    },
  ]);
  const [activeFileId, setActiveFileId] = useState("html");

const activeFile = files.find(
  (file) => file.id === activeFileId
);

  const getIcon = (language) => {
    switch (language) {
      case "html":
        return "📄";
      case "css":
        return "🎨";
      case "javascript":
        return "⚡";
      case "jsx":
        return "⚛️";
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

 const addFile = (
  name,
  language,
  content = "",
  path = name
) => {
    const newFile = {
      id: Date.now().toString(),
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
      id: Date.now().toString() + Math.random(),
      name: file.name,
      language: file.language,
      icon: getIcon(file.language),
      content: file.content || "",
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
    setFiles(newFiles);
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
        replaceContent,
getContent,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};


export const useFiles = () => useContext(FileContext);