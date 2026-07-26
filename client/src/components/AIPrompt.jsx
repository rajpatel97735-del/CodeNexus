import { useRef, useState } from "react";
function AIPrompt({
  prompt,
  setPrompt,
  loading,
  quickPrompts,
  onSubmit,
}) {

  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
const [selectedFile, setSelectedFile] = useState(null);
const handleAIRequest = () => {
  if (selectedFile) {
    onSubmit({
      prompt,
      image: selectedFile,
      mode: "vision",
    });
  } else {
    onSubmit({
      prompt,
      mode: "chat",
    });
  }
};  
return (
    <>
      {/* Quick Prompts */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "18px",
        }}
      >
        {quickPrompts.map((item) => (
          <button
         key={item.title}
      onClick={() => {
  setPrompt(item);

  setTimeout(() => {
   handleAIRequest();
  }, 100);
}}
            style={{
              border: "1px solid #334155",
              background: "#1e293b",
              color: "#cbd5e1",
              borderRadius: "30px",
              padding: "8px 14px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {/* Upload Screenshot */}

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "18px",
    marginBottom: "12px",
  }}
>
  <button
    onClick={() => fileInputRef.current?.click()}
    style={{
      background: "#334155",
      color: "white",
      border: "none",
      borderRadius: "10px",
      padding: "10px 16px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    📷 Upload Screenshot
  </button>

  <input
    ref={fileInputRef}
    type="file"
    accept="image/*"
    style={{ display: "none" }}
  onChange={(e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  setSelectedFile(file);
  setSelectedImage(URL.createObjectURL(file));
}}
  />
  {selectedImage && (
  <div
    style={{
      marginBottom: 15,
      border: "1px solid #334155",
      borderRadius: 12,
      overflow: "hidden",
      background: "#0f172a",
      padding: 10,
    }}
  >
    <img
      src={selectedImage}
      alt="Preview"
      style={{
        width: "100%",
        borderRadius: 8,
        maxHeight: 220,
        objectFit: "contain",
      }}
    />

    <button
      onClick={() => {
  setSelectedImage(null);
  setSelectedFile(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
}}
      style={{
        marginTop: 10,
        width: "100%",
        background: "#ef4444",
        color: "white",
        border: "none",
        padding: 10,
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      ❌ Remove Image
    </button>
  </div>
)}
</div>

      {/* Prompt Input */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
       onKeyDown={(e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
 handleAIRequest();
  }
}}
onInput={(e) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
}}
     placeholder={
  selectedImage
    ? "Describe what changes you want in this design...\n\nExample:\n• Convert to React\n• Make it responsive\n• Generate Tailwind CSS"
    : `Ask CodeNexus AI anything...

Examples:
• Create Portfolio Website
• Add Hero Section
• Fix Navbar
• Optimize CSS
• Explain my code`
}
        style={{
          
          marginTop: "20px",
          width: "100%",
        minHeight: "120px",
maxHeight: "280px",
overflowY: "auto",
          background: "#1e293b",
          color: "white",
          border: "1px solid #334155",
          borderRadius: "12px",
          padding: "14px",
          resize: "none",
          outline: "none",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      />
      

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <span
          style={{
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
          {prompt.length} characters
        </span>

        <span
          style={{
            color: "#94a3b8",
            fontSize: "13px",
          }}
        >
        Enter ↵ Send • Shift + Enter New Line
        </span>
      </div>

      {/* Send Button */}
      <button
        onClick={handleAIRequest}
      
        disabled={loading || !prompt.trim()}
        style={{
          marginTop: "20px",
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "10px",
          padding: "14px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          opacity: loading || !prompt.trim() ? 0.6 : 1,
cursor:
  loading || !prompt.trim()
    ? "not-allowed"
    : "pointer",
        }}
      >
      {loading
  ? "🤖 CodeNexus AI Thinking..."
  : selectedImage
  ? "🖼️ Generate Website From Image"
  : "✨ Generate"}
      </button>
    </>
  );
}

export default AIPrompt;