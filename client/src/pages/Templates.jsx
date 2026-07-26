import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import "../styles/page.css";

import {
  LayoutTemplate,
  Search,
  Eye,
  Download,
  Sparkles,
} from "lucide-react";

const templates = [
  {
    title: "Portfolio Website",
    category: "Portfolio",
    description: "Modern developer portfolio with animations.",
  },
  {
    title: "Restaurant Website",
    category: "Business",
    description: "Beautiful restaurant landing page.",
  },
  {
    title: "E-Commerce Store",
    category: "Shopping",
    description: "Responsive online shopping website.",
  },
  {
    title: "AI SaaS Landing",
    category: "AI",
    description: "Modern AI startup landing page.",
  },
  {
    title: "Dashboard UI",
    category: "Admin",
    description: "Professional admin dashboard template.",
  },
  {
    title: "Blog Website",
    category: "Blog",
    description: "Clean and responsive blogging template.",
  },
];

export default function Templates() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-container">

          <div className="page-header">
            <div>
              <h1 className="page-title">🎨 Templates</h1>
              <p className="page-subtitle">
                Choose a beautiful starter template and build faster.
              </p>
            </div>

            <button className="primary-btn">
              <Sparkles size={18} />
              &nbsp; AI Generate
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
              placeholder="Search templates..."
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
            {templates.map((template) => (
              <div className="page-card" key={template.title}>

                <div
                  style={{
                    height: "170px",
                    background:
                      "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                    borderRadius: "12px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <LayoutTemplate size={55} color="#fff" />
                </div>

                <h3>{template.title}</h3>

                <p
                  style={{
                    color: "#94a3b8",
                    margin: "10px 0",
                  }}
                >
                  {template.description}
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
                  {template.category}
                </span>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}
                >
                  <button className="primary-btn">
                    <Eye size={16} />
                    &nbsp; Preview
                  </button>

                  <button className="primary-btn">
                    <Download size={16} />
                    &nbsp; Use
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