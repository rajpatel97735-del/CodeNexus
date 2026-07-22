import { useEffect, useState } from "react";
import { getProjects } from "../services/project.service";

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const res = await getProjects();

      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loading,
    loadProjects,
    setProjects,
  };
}