import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useNavigate } from "react-router-dom";
import "./../styles/dashboard-v2.css";
import StatCard from "../components/dashboard/StatCard";
import useProjects from "../hooks/useProjects";
import AIQuickActions from "../components/dashboard/AIQuickActions";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import { deleteProject } from "../services/project.service";
import {
  FolderOpen,
  CalendarDays,
  ArrowRight,
  Trash2,
  Clock3,
  Code2,
  Bot,
} from "lucide-react";
import { createProject } from "../services/project.service";
import { toast } from "react-hot-toast";


function DashboardV2() {
  const user = JSON.parse(localStorage.getItem("user"));
  const { projects } = useProjects();
  const navigate = useNavigate();
const handleDelete = async (id) => {
  if (!window.confirm("Delete this project?")) return;

  try {
    await deleteProject(id);
    window.location.reload();
  } catch (err) {
    alert("Failed to delete project.");
  }
};
const handleNewProject = async () => {
  try {
    const res = await createProject({
      title: "Untitled Project",
      html: "",
      css: "",
      javascript: "",
      language: "HTML",
      description: "",
    });

    console.log("Response:", res);
    console.log("Data:", res.data);
    console.log("Project:", res.data.project);
    console.log("Project ID:", res.data.project?._id);

    navigate(`/editor/${res.data.project._id}`);
  } catch (err) {
    console.error(err);
  }
};
const handleQuickAction = (action) => {

  switch (action) {

    case "generate":
      toast.success("Opening AI Website Generator...");
      navigate("/ai-studio", {
        state: { mode: "generate" }
      });
      break;

    case "analyze":
      toast.success("Opening Code Analyzer...");
      navigate("/ai-studio", {
        state: { mode: "analyze" }
      });
      break;

    case "debug":
      toast.success("Opening AI Debugger...");
      navigate("/ai-studio", {
        state: { mode: "debug" }
      });
      break;

    case "chat":
      toast.success("Opening AI Chat...");
      navigate("/ai-studio", {
        state: { mode: "chat" }
      });
      break;

    default:
      break;
  }

};
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
  <Topbar onNewProject={handleNewProject} />

      <div className="hero-banner">

  <div>

    <span className="hero-badge">
      🚀 CodeNexus AI Workspace
    </span>

    <h1>
      Welcome Back,
      <span className="gradient-name">
        {" "}{user?.name}
      </span>
    </h1>

    <p>
      Build modern websites with AI, edit code instantly,
      optimize performance and deploy in one click.
    </p>

    <div className="hero-buttons">

      <button
        className="hero-primary"
        onClick={handleNewProject}
      >
        ✨ New Project
      </button>

      <button
        className="hero-secondary"
        onClick={() => navigate("/ai-studio")}
      >
        🤖 AI Studio
      </button>

    </div>

  </div>

  <div className="hero-right">

      <div className="hero-chip">
          🟢 AI Connected
      </div>

      <div className="hero-chip">
          📂 {projects.length} Projects
      </div>

      <div className="hero-chip">
          ⚡ Llama 3.3 70B
      </div>

  </div>

</div>

        {/* ===== Stats ===== */}

        <div className="stats-grid">
         <StatCard
  title="Projects"
  value={projects.length}
  color="#2563eb"
  icon={<FolderOpen size={22} />}
/>

<StatCard
  title="AI Chats"
  value="127"
  color="#7c3aed"
  icon={<Bot size={22} />}
/>

<StatCard
  title="Lines of Code"
  value="24.8K"
  color="#16a34a"
  icon={<Code2 size={22} />}
/>

<StatCard
  title="Hours Saved"
  value="83"
  color="#ea580c"
  icon={<Clock3 size={22} />}
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
  className="project-card"
>
  <div className="project-info">

    <div className="project-icon">
      <FolderOpen size={22} />
    </div>

    <div>

      <h3>{project.title}</h3>

      <p>
        {project.description || "No description"}
      </p>

   <div className="project-meta">

    <span className="language-badge">

        <Code2 size={13}/>

        {project.language}

    </span>

    <span>

        <Clock3 size={13}/>

        Updated

        {new Date(project.updatedAt).toLocaleDateString()}

    </span>

</div>

    </div>

  </div>

 <div className="project-actions">

  <button
    className="open-project-btn"
    onClick={() => navigate(`/editor/${project._id}`)}
  >
    ✏ Open
  </button>

  <button
    className="deploy-btn"
  >
    🚀 Deploy
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(project._id)}
  >
    🗑
  </button>

</div>
              </div>
            ))
          )}
        </div>

        {/* ===== AI Studio ===== */}

      <div className="dashboard-bottom">

  {/* LEFT */}

  <div className="dashboard-left">

    <AIQuickActions onOpen={handleQuickAction} />

    <div className="recent-projects-card">
      <h2>📂 Recent Projects</h2>

      {projects.length === 0 ? (
        <p>No Projects Yet</p>
      ) : (
        projects.slice(0,5).map(project=>(
          <div
            key={project._id}
            className="mini-project"
            onClick={()=>navigate(`/editor/${project._id}`)}
          >
            <span>📄 {project.title}</span>

            <ArrowRight size={16}/>
          </div>
        ))
      )}

    </div>

  </div>

  {/* RIGHT */}

  <div className="dashboard-right">

    <AnalyticsChart />

    <div className="dashboard-widget">

      <h3>🟢 AI Status</h3>

      <p>Provider : Groq</p>

      <p>Model : Llama 3.3 70B</p>

      <p>Status :
        <span style={{color:"#22c55e"}}>
          Connected
        </span>
      </p>

    </div>

    <div className="dashboard-widget">

      <h3>📊 Workspace</h3>

      <p>Projects : {projects.length}</p>

      <p>AI Chats : 127</p>

      <p>Deployments : 8</p>

    </div>

    <div className="dashboard-widget">

      <h3>💡 AI Tip</h3>

      <p>
        Use detailed prompts for better UI generation.
      </p>

    </div>

  </div>

</div>
      </div>
    </div>
  );
}

export default DashboardV2;