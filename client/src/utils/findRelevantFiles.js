export default function buildProjectIndex(files) {
  const index = {
    entry: null,
    components: [],
    pages: [],
    styles: [],
    assets: [],
  };

  files.forEach((file) => {
    const path = `${file.folder || ""}/${file.name}`;

    if (
      file.name === "main.jsx" ||
      file.name === "index.js"
    ) {
      index.entry = path;
    }

    if (path.includes("/components/")) {
      index.components.push(path);
    }

    if (path.includes("/pages/")) {
      index.pages.push(path);
    }

    if (
      path.endsWith(".css") ||
      path.endsWith(".scss")
    ) {
      index.styles.push(path);
    }

    if (
      path.includes("/assets/") ||
      path.match(/\.(png|jpg|jpeg|svg|gif)$/)
    ) {
      index.assets.push(path);
    }
  });

  return index;
}