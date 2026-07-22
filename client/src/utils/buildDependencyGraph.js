const IMPORT_REGEX =
  /import\s+(?:.+?)\s+from\s+["'](.+?)["']/g;

export default function buildDependencyGraph(files) {
  const graph = {};

  files.forEach((file) => {
    graph[file.name] = [];
  });

  files.forEach((file) => {
    const content = file.content || "";

    let match;

    while ((match = IMPORT_REGEX.exec(content))) {
      graph[file.name].push(match[1]);
    }

    IMPORT_REGEX.lastIndex = 0;
  });

  return graph;
}