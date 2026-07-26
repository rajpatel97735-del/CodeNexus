import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import "../styles/page.css";

import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  Shield,
} from "lucide-react";

export default function Profile() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="page-container">

          <div className="page-header">
            <div>
              <h1 className="page-title">👤 My Profile</h1>
              <p className="page-subtitle">
                Manage your personal information and account.
              </p>
            </div>

            <button className="primary-btn">
              <Edit size={18} />
              &nbsp; Edit Profile
            </button>
          </div>

          <div className="page-grid">

            {/* Profile Card */}

            <div className="page-card">

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg,#8b5cf6,#3b82f6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                    fontSize: "45px",
                    color: "#fff",
                  }}
                >
                  R
                </div>

                <button className="primary-btn">
                  <Camera size={16} />
                  &nbsp; Change Photo
                </button>
              </div>

            </div>

            {/* Details */}

            <div className="page-card">

              <h2 style={{ marginBottom: "20px" }}>
                Personal Information
              </h2>

              <div style={{ marginBottom: "18px" }}>
                <User size={18} /> &nbsp; Raj Patel
              </div>

              <div style={{ marginBottom: "18px" }}>
                <Mail size={18} /> &nbsp; raj@example.com
              </div>

              <div style={{ marginBottom: "18px" }}>
                <Phone size={18} /> &nbsp; +91 9876543210
              </div>

              <div style={{ marginBottom: "18px" }}>
                <MapPin size={18} /> &nbsp; India
              </div>

              <div>
                <Calendar size={18} /> &nbsp; Joined July 2026
              </div>

            </div>

            {/* Account */}

            <div className="page-card">

              <h2 style={{ marginBottom: "20px" }}>
                Account Status
              </h2>

              <p>
                <strong>Plan:</strong> Premium
              </p>

              <p style={{ marginTop: "10px" }}>
                <strong>Projects:</strong> 12
              </p>

              <p style={{ marginTop: "10px" }}>
                <strong>AI Requests:</strong> 284
              </p>

              <p style={{ marginTop: "10px" }}>
                <strong>Storage:</strong> 1.2 GB
              </p>

              <button
                className="primary-btn"
                style={{ marginTop: "20px" }}
              >
                Upgrade Plan
              </button>

            </div>

            {/* Security */}

            <div className="page-card">

              <h2 style={{ marginBottom: "20px" }}>
                Security
              </h2>

              <p>
                <Shield size={18} /> Password Protected
              </p>

              <button
                className="primary-btn"
                style={{ marginTop: "20px" }}
              >
                Change Password
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}