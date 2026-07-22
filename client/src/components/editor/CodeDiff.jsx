import ReactDiffViewer from "react-diff-viewer-continued";

export default function CodeDiff({
  oldCode,
  newCode,
}) {
  return (
    <ReactDiffViewer
      oldValue={oldCode}
      newValue={newCode}
      splitView
      compareMethod="diffWords"
    />
  );
}