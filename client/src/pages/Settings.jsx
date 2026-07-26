import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import "../styles/page.css";

import {
  User,
  Palette,
  Bell,
  Shield,
  Key,
  Bot,
} from "lucide-react";

export default function Settings() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-container">

          <div className="page-header">
            <div>
              <h1 className="page-title">⚙️ Settings</h1>
              <p className="page-subtitle">
                Manage your account and application preferences.
              </p>
            </div>
          </div>

          <div className="page-grid">

            <div className="page-card">
              <User size={30} />
              <h3 style={{ marginTop: 15 }}>Profile</h3>
              <p>Edit your profile information.</p>

              <button className="primary-btn">
                Manage Profile
              </button>
            </div>

            <div className="page-card">
              <Palette size={30} />
              <h3 style={{ marginTop: 15 }}>Appearance</h3>
              <p>Dark Mode, Themes and Editor Style.</p>

              <button className="primary-btn">
                Customize
              </button>
            </div>

            <div className="page-card">
              <Bell size={30} />
              <h3 style={{ marginTop: 15 }}>Notifications</h3>
              <p>Manage email and push notifications.</p>

              <button className="primary-btn">
                Configure
              </button>
            </div>

            <div className="page-card">
              <Shield size={30} />
              <h3 style={{ marginTop: 15 }}>Security</h3>
              <p>Password, Two-Factor Authentication and Sessions.</p>

              <button className="primary-btn">
                Security
              </button>
            </div>

            <div className="page-card">
              <Bot size={30} />
              <h3 style={{ marginTop: 15 }}>AI Provider</h3>

              <p>Select your preferred AI model.</p>

              <select
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "15px",
                  borderRadius: "10px",
                  background: "#0f172a",
                  color: "#fff",
                  border: "1px solid #334155",
                }}
              >
                <option>Gemini 2.5 Flash</option>
                <option>Groq Llama 3.3</option>
                <option>Groq Kimi K2</option>
              </select>
            </div>

            <div className="page-card">
              <Key size={30} />
              <h3 style={{ marginTop: 15 }}>API Keys</h3>

              <p>Manage Gemini, Groq and Vercel API Keys.</p>

              <button className="primary-btn">
                View Keys
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}