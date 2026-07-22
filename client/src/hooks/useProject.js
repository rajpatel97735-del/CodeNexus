import { getProject, updateProject } from "../services/project.service";

export default function useProject({
  id,
  getContent,
  replaceContent,
  setChatHistory,
  setSaveStatus,
}) {
  const loadProject = async () => {
    try {
      const res = await getProject(id);

      const project = res.data.project;

      replaceContent({
        html: project.html || "",
        css: project.css || "",
        javascript: project.javascript || "",
      });

      setChatHistory(project.chatHistory || []);
    } catch (err) {
      console.error(err);
    }
  };

  const saveChatHistory = async (chatHistory) => {
    try {
      const { html, css, javascript } = getContent();

      await updateProject(id, {
        html,
        css,
        javascript,
        chatHistory,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      const { html, css, javascript } = getContent();

      await updateProject(id, {
        html,
        css,
        javascript,
      });

      setSaveStatus("✅ Saved");
    } catch (err) {
      console.error(err);

      setSaveStatus("❌ Error");
    }
  };

  return {
    loadProject,
    saveChatHistory,
    handleSave,
  };
}