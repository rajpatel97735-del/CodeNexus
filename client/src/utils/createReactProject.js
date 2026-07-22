export default function createReactProject(files) {
    return files.map((file, index) => ({
        id: crypto.randomUUID?.() || String(index),
        name: file.name,
        language: file.language,
        folder: file.folder || "",
        icon: file.icon || "📄",
        content: file.content || "",
    }));
}