import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useNavigate } from "react-router-dom";
import "./../styles/dashboard-v2.css";
import StatCard from "../components/dashboard/StatCard";
import useProjects from "../hooks/useProjects";
import AIQuickActions from "../components/dashboard/AIQuickActions";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";

function DashboardV2() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { projects } = useProjects();
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Topbar />

        <h1>Welcome Back {user?.name} 👋</h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "10px",
          }}
        >
          Build • Analyze • Learn • Deploy
        </p>

        {/* ===== Stats ===== */}

        <div className="stats-grid">
          <StatCard
            title="Projects"
            value={projects.length}
            color="#3b82f6"
          />

          <StatCard
            title="Completed"
            value={
              projects.filter(
                (p) => p.status === "Completed"
              ).length
            }
            color="#22c55e"
          />

          <StatCard
            title="Pending"
            value={
              projects.filter(
                (p) => p.status === "Pending"
              ).length
            }
            color="#f59e0b"
          />

          <StatCard
            title="AI Requests"
            value="Coming Soon"
            color="#8b5cf6"
          />
        </div>

        {/* ===== Recent Projects ===== */}

        <div
          style={{
            marginTop: "40px",
            background: "#1e293b",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>
            📂 Recent Projects
          </h2>

          {projects.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>
              No projects available.
            </p>
          ) : (
            projects.slice(0, 5).map((project) => (
              <div
                key={project._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: "1px solid #334155",
                }}
              >
                <div>
                  <h3>{project.title}</h3>

                  <p style={{ color: "#94a3b8" }}>
                    {project.description}
                  </p>
                </div>

                <span
                  style={{
                    background:
                      project.status === "Completed"
                        ? "#16a34a"
                        : project.status === "Pending"
                        ? "#f59e0b"
                        : "#2563eb",

                    padding: "6px 12px",
                    borderRadius: "20px",
                    color: "white",
                  }}
                >
                  {project.status}
                </span>
                <button
  onClick={() => navigate(`/editor/${project._id}`)}
  style={{
    marginLeft: "10px",
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Open
</button>
              </div>
            ))
          )}
        </div>

        {/* ===== AI Studio ===== */}

        <AIQuickActions />
        <AnalyticsChart />
      </div>
    </div>
  );
}

export default DashboardV2;