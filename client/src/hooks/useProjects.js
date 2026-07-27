import { useState, useEffect, useCallback } from "react";
import { getProjects } from "../services/project.service";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await getProjects();

      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const refreshProjects = async () => {
    await loadProjects();
  };

  return {
    projects,
    loading,
    refreshProjects,
    setProjects,
  };
}