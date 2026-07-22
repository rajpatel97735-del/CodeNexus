import { useEffect, useMemo, useState } from "react";

export default function usePreview(files) {
  const [previewErrors, setPreviewErrors] = useState([]);

  useEffect(() => {
    const handler = (event) => {
      if (event.data.type === "preview-error") {
        setPreviewErrors((prev) => [
          ...prev,
          {
            message: event.data.message,
            line: event.data.line,
            col: event.data.col,
          },
        ]);
      }

      if (event.data.type === "preview-console-error") {
        setPreviewErrors((prev) => [
          ...prev,
          {
            message: event.data.message,
          },
        ]);
      }
    };

    window.addEventListener("message", handler);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, []);

  const srcDoc = useMemo(() => {
    const html =
      files.find((f) => f.language === "html")?.content || "";

    const css =
      files.find((f) => f.language === "css")?.content || "";

    const javascript =
      files.find((f) => f.language === "javascript")?.content || "";

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
${css}
</style>
</head>

<body>

${html}

<script>
window.onerror=function(message,source,line,col,error){
window.parent.postMessage({
type:"preview-error",
message,
line,
col
},"*");
};

const oldError=console.error;

console.error=function(...args){
window.parent.postMessage({
type:"preview-console-error",
message:args.join(" ")
},"*");

oldError.apply(console,args);
};
<\/script>

<script>
${javascript}
<\/script>

</body>
</html>
`;
  }, [files]);

  return {
    srcDoc,
    previewErrors,
    setPreviewErrors,
  };
}