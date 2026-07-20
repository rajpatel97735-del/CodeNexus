export const defaultFiles = [
  {
    id: "1",
    name: "index.html",
    language: "html",
    icon: "📄",
    content: "<h1>Hello CodeNexus 🚀</h1>",
  },
  {
    id: "2",
    name: "style.css",
    language: "css",
    icon: "🎨",
    content: "body{\n font-family:Arial;\n}",
  },
  {
    id: "3",
    name: "script.js",
    language: "javascript",
    icon: "⚡",
    content: 'console.log("Hello CodeNexus");',
  },
];

export function createFile(name, language) {
  return {
    id: Date.now().toString(),
    name,
    language,
    icon:
      language === "html"
        ? "📄"
        : language === "css"
        ? "🎨"
        : "⚡",
    content: "",
  };
}