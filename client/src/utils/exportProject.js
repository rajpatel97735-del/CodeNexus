import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function exportProject(files, projectName = "CodeNexus-Project") {
  try {
    const zip = new JSZip();

    files.forEach((file) => {
      zip.file(file.path || file.name, file.content || "");
    });

    const blob = await zip.generateAsync({
      type: "blob",
    });

    saveAs(blob, `${projectName}.zip`);
  } catch (err) {
    console.error("Export Error:", err);
  }
}