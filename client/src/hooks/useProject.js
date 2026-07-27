import { useCallback } from "react";
import { getProject, updateProject } from "../services/project.service";
import toast from "react-hot-toast";

export default function useProject({
  id,
  getContent,
  replaceContent,
  setChatHistory,
  setSaveStatus,
  setHasUnsavedChanges,
  setProjectTitle,
  projectTitle,
}) {
  // ======================================
  // Load Project
  // ======================================

  const loadProject = useCallback(async () => {
    if (!id) return;

    try {
      const { data } = await getProject(id);

      if (!data?.project) return;

      const project = data.project;

      replaceContent({
        html: project.html ?? "",
        css: project.css ?? "",
        javascript: project.javascript ?? "",
      });

      setProjectTitle(project.title ?? "Untitled Project");
      setChatHistory(project.chatHistory ?? []);
    } catch (error) {
      console.error("Load Project Error:", error);
      toast.error("Failed to load project");
    }
  }, [id, replaceContent, setProjectTitle, setChatHistory]);

  // ======================================
  // Save Chat History
  // ======================================

  const saveChatHistory = useCallback(
    async (chatHistory) => {
      if (!id) return;

      try {
        const { html, css, javascript } = getContent();

        await updateProject(id, {
          title: projectTitle || "Untitled Project",
          html,
          css,
          javascript,
          chatHistory,
        });
      } catch (error) {
        console.error("Save Chat Error:", error);
      }
    },
    [id, getContent, projectTitle]
  );

  // ======================================
  // Save Project
  // ======================================

  const handleSave = useCallback(
    async (titleArg) => {
      if (!id) return;

      const title =
        typeof titleArg === "string"
          ? titleArg
          : projectTitle || "Untitled Project";

      try {
        const { html, css, javascript } = getContent();

        await updateProject(id, {
          title,
          html,
          css,
          javascript,
        });

        setSaveStatus(
          `✅ Saved • ${new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`
        );

        setHasUnsavedChanges(false);

        toast.success("Project Saved Successfully");
      } catch (error) {
        console.error("Save Project Error:", error);

        setSaveStatus("❌ Error");

        toast.error("Failed to Save Project");
      }
    },
    [
      id,
      getContent,
      projectTitle,
      setHasUnsavedChanges,
      setSaveStatus,
    ]
  );

  // ======================================
  // Exports
  // ======================================

  return {
    loadProject,
    saveChatHistory,
    handleSave,
  };
}