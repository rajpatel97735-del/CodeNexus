import { useEffect, useState } from "react";
import { getProjects } from "../services/project.service";

function useProjects() {
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return {
    projects,
    loadProjects,
  };
}

export default useProjects;