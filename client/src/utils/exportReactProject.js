import JSZip from "jszip";
import { saveAs } from "file-saver";

export default async function exportReactProject(files) {
  const zip = new JSZip();

  // Root files
  zip.file(
    "package.json",
    JSON.stringify(
      {
        name: "codenexus-project",
        version: "1.0.0",
        private: true,
        scripts: {
          dev: "vite",
          build: "vite build",
        },
        dependencies: {
          react: "^19.0.0",
          "react-dom": "^19.0.0",
        },
        devDependencies: {
          vite: "^7.0.0",
          "@vitejs/plugin-react": "^5.0.0",
        },
      },
      null,
      2
    )
  );

  zip.file(
    "vite.config.js",
`import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins:[react()]
});`
  );

  files.forEach((file) => {
    const path = file.folder
      ? `${file.folder}/${file.name}`
      : file.name;

    zip.file(path, file.content);
  });

  const blob = await zip.generateAsync({
    type: "blob",
  });

  saveAs(blob, "CodeNexusProject.zip");
}