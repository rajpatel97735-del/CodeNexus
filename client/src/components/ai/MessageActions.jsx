import {
  Copy,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

export default function MessageActions({
  text,
}) {

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="message-actions">

      <button
        title="Copy"
        onClick={copyText}
      >
        <Copy size={15} />
      </button>

      <button title="Regenerate">
        <RotateCcw size={15} />
      </button>

      <button title="Like">
        <ThumbsUp size={15} />
      </button>

      <button title="Dislike">
        <ThumbsDown size={15} />
      </button>

    </div>
  );
}