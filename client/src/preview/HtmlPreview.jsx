export default function HtmlPreview({
  srcDoc,
  width,
  refreshKey,
}) {
  return (
    <iframe
      key={refreshKey}
      id="preview-frame"
      title="preview"
      srcDoc={srcDoc}
      style={{
        width,
        height: "100%",
        border: "1px solid #cbd5e1",
        background: "#fff",
        borderRadius: 12,
        transition: "all .3s ease",
        boxShadow: "0 18px 40px rgba(0,0,0,.25)",
      }}
    />
  );
}