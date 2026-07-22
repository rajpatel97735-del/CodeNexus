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
  FileCode2,
  FileJson,
  FileText,
  FileImage,
} from "lucide-react";

import styles from "./Explorer.module.css";
import { useFiles } from "../../context/FileContext";

export default function Explorer({
  activeFile,
  setActiveFile,
}) {
  const {
    files,
    addFile,
    deleteFile,
    renameFile,
  } = useFiles();

  const [expanded, setExpanded] = useState(true);
  const [search, setSearch] = useState("");
  const [newFile, setNewFile] = useState("");

  const filteredFiles = useMemo(() => {
    if (!search.trim()) return files;

    return files.filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [files, search]);

  const createFile = () => {
    if (!newFile.trim()) return;

    let language = "javascript";

    if (newFile.endsWith(".html"))
      language = "html";

    else if (newFile.endsWith(".css"))
      language = "css";

    else if (newFile.endsWith(".json"))
      language = "json";

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
            if (e.key === "Enter")
              createFile();
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
            {filteredFiles.length === 0 ? (
              <div className={styles.empty}>
                No files found
              </div>
            ) : (
              filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`${styles.fileRow} ${
                    activeFile === file.id ? styles.active : ""
                  }`}
                >
                  {/* Left */}
                  <div
                    className={styles.fileInfo}
                    onClick={() => setActiveFile(file.id)}
                  >
                    {getIcon(file.name)}

                    <span className={styles.fileName}>
                      {file.name}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className={styles.actions}>
                    <button
                      title="Rename"
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
                      title="Delete"
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}