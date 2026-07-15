import API from "./api";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Create Project
export const createProject = (data) =>
  API.post("/projects", data, authHeader());

// Get All Projects
export const getProjects = () =>
  API.get("/projects", authHeader());

// Get Single Project
export const getProject = (id) =>
  API.get(`/projects/${id}`, authHeader());

// Update Project
export const updateProject = (id, data) =>
  API.put(`/projects/${id}`, data, authHeader());

// Delete Project
export const deleteProject = (id) =>
  API.delete(`/projects/${id}`, authHeader());