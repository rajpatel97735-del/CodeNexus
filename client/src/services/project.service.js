import API from "./api";

// ======================================
// Authorization Header
// ======================================

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ======================================
// Project APIs
// ======================================

export const createProject = (data) =>
  API.post("/projects", data, authHeader());

export const getProjects = () =>
  API.get("/projects", authHeader());

export const getProject = (id) =>
  API.get(`/projects/${id}`, authHeader());

export const updateProject = (id, data) =>
  API.put(`/projects/${id}`, data, authHeader());

export const deleteProject = (id) =>
  API.delete(`/projects/${id}`, authHeader());