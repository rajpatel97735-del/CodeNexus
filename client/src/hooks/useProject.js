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
  const loadProject = async () => {
    try {
      const res = await getProject(id);

      const project = res.data.project;

      replaceContent({
        html: project.html || "",
        css: project.css || "",
        javascript: project.javascript || "",
      });
      setProjectTitle(project.title);

      setChatHistory(project.chatHistory || []);
    } catch (err) {
      console.error(err);
    }
  };

  const saveChatHistory = async (chatHistory) => {
    try {
      const { html, css, javascript } = getContent();
await updateProject(id, {
  title: projectTitle,
  html,
  css,
  javascript,
  chatHistory,
});
    } catch (err) {
      console.error(err);
    }
  };

const handleSave = async (titleArg) => {
  const title =
    typeof titleArg === "string"
      ? titleArg
      : projectTitle;

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
  } catch (err) {
    console.error(err);
    setSaveStatus("❌ Error");
    toast.error("Failed to Save Project");
  }
};

  return {
    loadProject,
    saveChatHistory,
    handleSave,
  };
}