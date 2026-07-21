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
    },
    {
      id: "javascript",
      name: "script.js",
      language: "javascript",
      icon: "⚡",
      content: `console.log("Welcome to CodeNexus");`,
    },
  ]);

  const addFile = (name, language) => {
    const icon =
      language === "html"
        ? "📄"
        : language === "css"
        ? "🎨"
        : "⚡";

    const newFile = {
      id: Date.now().toString(),
      name,
      language,
      icon,
      content: "",
    };

    setFiles((prev) => [...prev, newFile]);
  };

  const deleteFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const renameFile = (id, name) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, name } : file
      )
    );
  };

  const updateContent = (id, content) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === id ? { ...file, content } : file
      )
    );
  };

  return (
    <FileContext.Provider
      value={{
        files,
        addFile,
        deleteFile,
        renameFile,
        updateContent,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => useContext(FileContext);