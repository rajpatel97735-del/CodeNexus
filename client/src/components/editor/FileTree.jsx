import { FaHtml5, FaCss3Alt, FaJs, FaReact } from "react-icons/fa";
import { VscJson, VscFile } from "react-icons/vsc";

const getFileIcon = (language) => {
  switch (language) {
    case "html":
      return <FaHtml5 color="#E34F26" />;

    case "css":
      return <FaCss3Alt color="#1572B6" />;

    case "javascript":
      return <FaJs color="#F7DF1E" />;

    case "jsx":
      return <FaReact color="#61DAFB" />;

    case "json":
      return <VscJson color="#FACC15" />;

    default:
      return <VscFile color="#94A3B8" />;
  }
};

function FileTree({
  files,
  activeFileId,
  setActiveFileId,
}) {
  return (
    <div>
      {files.map((file) => (
        <div
          key={file.id}
          className={`fileRow ${
            activeFileId === file.id ? "active" : ""
          }`}
          onClick={() => setActiveFileId(file.id)}
        >
          <div className="fileInfo">
            {getFileIcon(file.language)}

            <span className="fileName">
              {file.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileTree;