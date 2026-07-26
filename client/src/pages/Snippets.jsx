import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import "../styles/page.css";

import {
  Code2,
  Copy,
  Star,
  Search,
  Plus,
} from "lucide-react";

const snippets = [
  {
    title: "Responsive Navbar",
    language: "HTML + CSS",
    category: "UI Components",
  },
  {
    title: "Login Form",
    language: "HTML + CSS",
    category: "Authentication",
  },
  {
    title: "Image Slider",
    language: "JavaScript",
    category: "Components",
  },
  {
    title: "Dark Mode Toggle",
    language: "JavaScript",
    category: "Utilities",
  },
  {
    title: "Responsive Card",
    language: "CSS",
    category: "Cards",
  },
  {
    title: "Modal Popup",
    language: "JavaScript",
    category: "UI",
  },
];

export default function Snippets() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-container">

          <div className="page-header">
            <div>
              <h1 className="page-title">📦 Snippets</h1>
              <p className="page-subtitle">
                Save, reuse and manage your favorite code snippets.
              </p>
            </div>

            <button className="primary-btn">
              <Plus size={18} />
              &nbsp; New Snippet
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "25px",
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "12px",
              padding: "12px 16px",
            }}
          >
            <Search size={18} color="#94a3b8" />

            <input
              type="text"
              placeholder="Search snippets..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: "15px",
              }}
            />
          </div>

          <div className="page-grid">
            {snippets.map((snippet) => (
              <div className="page-card" key={snippet.title}>

                <Code2 size={32} color="#8b5cf6" />

                <h3 style={{ marginTop: "15px" }}>
                  {snippet.title}
                </h3>

                <p
                  style={{
                    color: "#94a3b8",
                    margin: "8px 0",
                  }}
                >
                  {snippet.language}
                </p>

                <span
                  style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    background: "#312e81",
                    color: "#c4b5fd",
                    fontSize: "13px",
                    marginBottom: "18px",
                  }}
                >
                  {snippet.category}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button className="primary-btn">
                    <Copy size={16} />
                    &nbsp; Copy
                  </button>

                  <button className="primary-btn">
                    <Star size={16} />
                    &nbsp; Favorite
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}