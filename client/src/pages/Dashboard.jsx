import { useState } from "react";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import useProjects from "../hooks/useProjects";
import { createProject } from "../services/project.service";
import Footer from "../components/Footer";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const { projects, loadProjects } = useProjects();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
const [editingProject, setEditingProject] = useState(null);
const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createProject(formData);

      alert(res.data.message);

      setFormData({
        title: "",
        description: "",
        status: "Pending",
      });

      loadProjects();

    } catch (error) {
      console.log(error);
      alert("Project Create Failed");
    }
  };
const handleEdit = (project) => {
  setFormData({
    title: project.title,
    description: project.description,
    status: project.status,
  });

  setEditingProject(project);
  setIsEditing(true);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
  return (
    <>
      <Navbar />

    <div
  style={{
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "25px",
    background: "#f8fafc",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
  }}
>
        <h1
  style={{
    textAlign: "center",
    color: "#1e3a8a",
    marginBottom: "30px",
  }}
>
  👋 Welcome, {user?.name}
</h1>

        <div style={statsContainer}>
          <div style={statsCard}>
            <h2>{projects.length}</h2>
            <p>Total Projects</p>
          </div>

          <div style={statsCard}>
            <h2>
              {
                projects.filter(
                  (p) => p.status === "Pending"
                ).length
              }
            </h2>

            <p>Pending</p>
          </div>

          <div style={statsCard}>
            <h2>
              {
                projects.filter(
                  (p) => p.status === "Completed"
                ).length
              }
            </h2>

            <p>Completed</p>
          </div>
        </div>

        <hr />

        <h2
  style={{
    color: "#2563eb",
    marginTop: "20px",
  }}
>
  ➕ Add New Project
</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            style={textareaStyle}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <button
            type="submit"
            style={buttonStyle}
          >
            Add Project
          </button>

        </form>

        <hr />

        <h2
  style={{
    color: "#2563eb",
    marginTop: "30px",
  }}
>
  📂 My Projects
</h2>

<input
  type="text"
  placeholder="🔍 Search Project..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  }}
/>

{/* 👇 YE CODE YAHAN PASTE KARNA HAI */}
<select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  }}
>
  <option value="All">All Projects</option>
  <option value="Pending">Pending</option>
  <option value="In Progress">In Progress</option>
  <option value="Completed">Completed</option>
</select>

{projects.length === 0 ? (

          <p>No Projects Found</p>

        ) : (

          <div style={projectContainer}>
{projects
  .filter((project) =>
    project.title
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .filter((project) =>
    filter === "All"
      ? true
      : project.status === filter
  )
  .map((project) => (

              <ProjectCard
  key={project._id}
  project={project}
  refresh={loadProjects}
  onEdit={handleEdit}
/>

            ))}

          </div>

        )}

      </div>
<Footer />
    </>
  );
}
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const textareaStyle = {
  width: "100%",
  height: "120px",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
};

const buttonStyle = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const statsContainer = {
  display: "flex",
  gap: "20px",
  margin: "20px 0",
};

const statsCard = {
  flex: 1,
  background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
  color: "white",
  padding: "25px",
  borderRadius: "15px",
  textAlign: "center",
  boxShadow: "0 8px 18px rgba(37,99,235,0.3)",
};

const projectContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "20px",
  marginTop: "20px",
};

export default Dashboard;