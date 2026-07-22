export default function buildAIContext(files) {
  return files
    .map(
      (file) => `
### ${file.name}

${file.content}
`
    )
    .join("\n");
}
