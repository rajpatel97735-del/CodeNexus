import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Folder,
  FilePlus2,
  FolderPlus,
  Search,
  Trash2,
  Pencil,
  Copy,
  FileCode2,
  FileJson,
  FileText,
  FileImage,
} from "lucide-react";

import styles from "./Explorer.module.css";
import { useFiles } from "../../context/FileContext";

export default function Explorer() {
  const {
    files,
    activeFileId,
    setActiveFileId,
    addFile,
    deleteFile,
    renameFile,
    duplicateFile,
  } = useFiles();

  const [expanded, setExpanded] = useState(true);
  const [search, setSearch] = useState("");
  const [newFile, setNewFile] = useState("");
const [expandedFolders, setExpandedFolders] = useState({
  src: true,
});
  const filteredFiles = useMemo(() => {
    if (!search.trim()) return files;

    return files.filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [files, search]);
  const fileTree = useMemo(() => {
  const tree = {};

  filteredFiles.forEach((file) => {
    const parts = (file.path || file.name).split("/");

    let current = tree;

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;

      if (isFile) {
        current[part] = file;
      } else {
        if (!current[part]) {
          current[part] = {};
        }

        current = current[part];
      }
    });
  });

  return tree;
}, [filteredFiles]);
const toggleFolder = (path) => {
  setExpandedFolders((prev) => ({
    ...prev,
    [path]: !prev[path],
  }));
};
const isFolder = (value) => {
  return (
    typeof value === "object" &&
    value !== null &&
    !("id" in value)
  );
};
const renderTree = (node, parentPath = "") => {
  return Object.entries(node).map(([key, value]) => {
    const currentPath = parentPath ? `${parentPath}/${key}` : key;

    // ================= Folder =================

    if (isFolder(value)) {
      const isOpen = expandedFolders[currentPath] ?? true;

      return (
        <div key={currentPath}>
          <div
            className={styles.folderRow}
            onClick={() => toggleFolder(currentPath)}
          >
            {isOpen ? (
              <ChevronDown size={15} />
            ) : (
              <ChevronRight size={15} />
            )}

            {isOpen ? (
              <FolderOpen size={17} color="#fbbf24" />
            ) : (
              <Folder size={17} color="#fbbf24" />
            )}

            <span>{key}</span>
          </div>

          {isOpen && (
            <div
              style={{
                paddingLeft: 18,
              }}
            >
              {renderTree(value, currentPath)}
            </div>
          )}
        </div>
      );
    }

    // ================= File =================

    const file = value;

    return (
      <div
        key={file.id}
        className={`${styles.fileRow} ${
          activeFileId === file.id
            ? styles.active
            : ""
        }`}
      >
        <div
          className={styles.fileInfo}
          onClick={() => openFile(file.id)}
        >
          {getIcon(file.name)}

          <span className={styles.fileName}>
            {file.name}
          </span>
        </div>

        <div className={styles.actions}>
          <button
            onClick={() =>
              duplicateFile(file.id)
            }
          >
            <Copy size={14} />
          </button>

          <button
            onClick={() => {
              const name = prompt(
                "Rename File",
                file.name
              );

              if (!name) return;

              renameFile(file.id, name);
            }}
          >
            <Pencil size={14} />
          </button>

          <button
            onClick={() => {
              if (
                window.confirm(
                  `Delete "${file.name}" ?`
                )
              ) {
                deleteFile(file.id);
              }
            }}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  });
};

  const createFile = () => {
    if (!newFile.trim()) return;

    const extension = newFile.split(".").pop().toLowerCase();

    let language = "text";

    switch (extension) {
      case "html":
        language = "html";
        break;

      case "css":
        language = "css";
        break;

      case "js":
        language = "javascript";
        break;

      case "jsx":
        language = "jsx";
        break;

      case "tsx":
        language = "tsx";
        break;

      case "json":
        language = "json";
        break;

      case "md":
        language = "md";
        break;

      default:
        language = "text";
    }

    addFile(newFile, language);

    setNewFile("");
  };

  const getIcon = (name) => {
    if (name.endsWith(".jsx"))
      return <FileCode2 size={16} color="#61dafb" />;

    if (name.endsWith(".js"))
      return <FileCode2 size={16} color="#f7df1e" />;

    if (name.endsWith(".html"))
      return <FileCode2 size={16} color="#e44d26" />;

    if (name.endsWith(".css"))
      return <FileCode2 size={16} color="#2965f1" />;

    if (name.endsWith(".json"))
      return <FileJson size={16} color="#fbbf24" />;

    if (
      name.endsWith(".png") ||
      name.endsWith(".jpg") ||
      name.endsWith(".jpeg") ||
      name.endsWith(".svg")
    )
      return <FileImage size={16} color="#22c55e" />;

    return <FileText size={16} color="#cbd5e1" />;
  };
  return (
  <div className={styles.container}>
    {/* Header */}

    <div className={styles.header}>
      <span>EXPLORER</span>

      <div className={styles.headerActions}>
        <button title="New File">
          <FilePlus2 size={16} />
        </button>

        <button title="New Folder">
          <FolderPlus size={16} />
        </button>
      </div>
    </div>

    {/* Search */}

    <div className={styles.searchWrapper}>
      <Search size={16} />

      <input
        placeholder="Search files..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* New File */}

    <div className={styles.newFile}>
      <input
        placeholder="Create new file..."
        value={newFile}
        onChange={(e) => setNewFile(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") createFile();
        }}
      />

      <button onClick={createFile}>
        Create
      </button>
    </div>

    {/* Project */}

    <div className={styles.project}>
      <div
        className={styles.projectHeader}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronRight size={16} />
        )}

        {expanded ? (
          <FolderOpen size={18} />
        ) : (
          <Folder size={18} />
        )}

        <span>CodeNexus Project</span>
      </div>

      {expanded && (
        <div className={styles.fileList}>
         {renderTree(fileTree)}
        </div>
      )}
    </div>
  </div>
);
}