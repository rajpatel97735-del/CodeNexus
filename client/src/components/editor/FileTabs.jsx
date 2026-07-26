import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
} from "react-icons/fa";

import {
  VscJson,
  VscClose,
  VscFile,
} from "react-icons/vsc";

import { useFiles } from "../../context/FileContext";

import styles from "./FileTabs.module.css";

const getIcon = (language) => {
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

export default function FileTabs() {

  const {
    files,
    activeFileId,
    setActiveFileId,
  } = useFiles();

  return (

    <div className={styles.tabs}>

      {files.map((file) => (

        <div
          key={file.id}
          className={`${styles.tab} ${
            activeFileId === file.id
              ? styles.active
              : ""
          }`}
          onClick={() => setActiveFileId(file.id)}
        >

          <span className={styles.icon}>
            {getIcon(file.language)}
          </span>

          <span className={styles.name}>
            {file.name}
          </span>

      <span
    className={styles.close}
    onClick={(e) => {
        e.stopPropagation();
    }}
>
    <VscClose size={14}/>
</span>
        </div>

      ))}

    </div>

  );

}
