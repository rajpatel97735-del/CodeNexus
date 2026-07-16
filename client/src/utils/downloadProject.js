import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadProject = (project) => {
  const zip = new JSZip();

  zip.file("index.html", project.html || "");
  zip.file("style.css", project.css || "");
  zip.file("script.js", project.javascript || "");

  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, `${project.title || "CodeNexus-Project"}.zip`);
  });
};