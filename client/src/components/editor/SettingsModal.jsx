export default function SettingsModal({
  open,
  onClose,

  editorTheme,
  setEditorTheme,

  fontSize,
  setFontSize,

  wordWrap,
  setWordWrap,

  minimap,
  setMinimap,

  previewMode,
  setPreviewMode,
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 520,
          background: "#111827",
          border: "1px solid #334155",
          borderRadius: 16,
          padding: 24,
          color: "white",
        }}
      >
        <h2>⚙️ Editor Settings</h2>

        <hr />

        <h4>Theme</h4>

        <select
          value={editorTheme}
          onChange={(e) =>
            setEditorTheme(e.target.value)
          }
        >
          <option value="vs-dark">
            Dark
          </option>

          <option value="light">
            Light
          </option>
        </select>

        <h4>Font Size</h4>

        <input
          type="range"
          min={12}
          max={30}
          value={fontSize}
          onChange={(e)=>
            setFontSize(Number(e.target.value))
          }
        />

        <p>{fontSize}px</p>

        <label>

          <input
            type="checkbox"
            checked={wordWrap}
            onChange={(e)=>
              setWordWrap(e.target.checked)
            }
          />

          Word Wrap

        </label>

        <br /><br />

        <label>

          <input
            type="checkbox"
            checked={minimap}
            onChange={(e)=>
              setMinimap(e.target.checked)
            }
          />

          Minimap

        </label>

        <br /><br />

        <h4>Preview</h4>

        <select
          value={previewMode}
          onChange={(e)=>
            setPreviewMode(e.target.value)
          }
        >
          <option>Desktop</option>
          <option>Tablet</option>
          <option>Mobile</option>
        </select>

        <br /><br />

        <button
          onClick={onClose}
        >
          Close
        </button>

      </div>
    </div>
  );
}