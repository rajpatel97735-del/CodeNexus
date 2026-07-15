import { deleteProject } from "../services/project.service";

function ProjectCard({ project, refresh, onEdit }) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(project._id);

      alert("Project Deleted Successfully");

      refresh();
    } catch (error) {
      console.log(error);

      alert("Delete Failed");
    }
  };

  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        marginBottom: "20px",
      }}
    >
      <h3>{project.title}</h3>

      <p>{project.description}</p>

      <p>
  <strong>Status:</strong>{" "}
  <span
    style={{
      background:
        project.status === "Completed"
          ? "#16a34a"
          : project.status === "In Progress"
          ? "#2563eb"
          : "#f59e0b",
      color: "white",
      padding: "5px 12px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "bold",
    }}
  >
    {project.status}
  </span>
</p>

      <button
        onClick={() => onEdit(project)}
        style={{
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "8px 15px",
          marginRight: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ✏ Edit
      </button>

      <button
        onClick={handleDelete}
        style={{
          background: "#ef4444",
          color: "white",
          border: "none",
          padding: "8px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🗑 Delete
      </button>
    </div>
  );
}

export default ProjectCard;