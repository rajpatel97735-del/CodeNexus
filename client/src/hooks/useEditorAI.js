import toast from "react-hot-toast";
import { detectIntent } from "../components/editor/AIAgent";

import {
  generateWebsite,
  editWebsite,
  fixWebsite,
  optimizeWebsite,
  explainWebsite,
  generateComponent,
} from "../services/ai.service";

export default function useEditorAI({
  getContent,
  replaceContent,
  replaceFiles,
  files,
  addConsoleLog,
  addMessage,
  saveVersion,
  saveChatHistory,
  setChatHistory,
  setAiState,
  setPendingChanges,
}) {

  // ===========================
  // Helpers
  // ===========================

  const getCurrentWebsite = () => getContent();

  const startLoading = (progress, step) => {
    setAiState((prev) => ({
      ...prev,
      loading: true,
      progress,
      step,
    }));
  };

  const stopLoading = () => {
    setAiState({
      loading: false,
      progress: 100,
      step: "",
      logs: [],
    });
  };

  const addLog = (message) => {
    setAiState((prev) => ({
      ...prev,
      loading: true,
      logs: [...(prev.logs || []), message],
    }));
  };

  // ===========================
  // Generate Website
  // ===========================

  const handleGenerate = async (prompt) => {
    startLoading(10, "Reading Project...");

    addLog("📂 Reading project files...");
    addConsoleLog(`Generating website: ${prompt}`, "info");

    try {
      addMessage("user", prompt);

      startLoading(35, "Understanding Prompt...");
      addLog("🧠 Understanding Prompt...");

      const res = await generateWebsite(prompt);

      if (
        res.framework === "react-vite" &&
        Array.isArray(res.files)
      ) {
        replaceFiles(res.files);

        toast.success(
          "React Project Generated Successfully"
        );

        stopLoading();
        return;
      }

      startLoading(70, "Generating Website...");

      replaceContent({
        html: res.html,
        css: res.css,
        javascript: res.javascript,
      });

      saveVersion(
        res.html,
        res.css,
        res.javascript
      );

      startLoading(95, "Finalizing Website...");

      addConsoleLog(
        "Website generated successfully",
        "success"
      );

      toast.success(
        "Website Generated Successfully"
      );

    } catch (error) {

      console.error(error);

      addConsoleLog(
        "Failed to Generate Website",
        "error"
      );

      toast.error(
        "Failed to Generate Website"
      );

    } finally {

      stopLoading();

    }
  };
    // ===========================
  // Edit Website
  // ===========================

  const handleEdit = async (prompt) => {
    startLoading(20, "Analyzing Project...");

    addConsoleLog(`Editing website: ${prompt}`, "info");

    try {
      addMessage("user", prompt);

      const { html, css, javascript } = getCurrentWebsite();

      const isReactProject = files.some(
        (file) => file.path === "src/App.jsx"
      );

      if (isReactProject) {
        startLoading(50, "Updating React Project...");

        const res = await editWebsite({
          prompt,
          framework: "react-vite",
          files,
        });

        if (res.framework === "react-vite") {
          replaceFiles(res.files);

          toast.success("React Project Updated");

          stopLoading();
          return;
        }
      }

      startLoading(70, "Generating Changes...");

      const res = await editWebsite({
        prompt,
        html,
        css,
        javascript,
      });

      setPendingChanges({
        html: res.html,
        css: res.css,
        javascript: res.javascript,
      });

      addConsoleLog(
        "AI changes are ready to apply",
        "success"
      );

      toast.success("Review AI Changes");

    } catch (error) {

      console.error(error);

      addConsoleLog(
        "Failed to Update Website",
        "error"
      );

      toast.error("Failed to Update Website");

    } finally {

      stopLoading();

    }
  };

  // ===========================
  // Fix Website
  // ===========================

  const handleFix = async () => {

    startLoading(25, "Finding Issues...");

    addConsoleLog("Fixing website...", "info");

    try {

      addMessage("user", "🛠 Fix my website");

      const { html, css, javascript } =
        getCurrentWebsite();

      const res = await fixWebsite({
        html,
        css,
        javascript,
      });

      setPendingChanges({
        html: res.html,
        css: res.css,
        javascript: res.javascript,
      });

      addConsoleLog(
        "AI fixes are ready",
        "success"
      );

      toast.success("Review AI Changes");

    } catch (error) {

      console.error(error);

      addConsoleLog(
        "Failed to Fix Website",
        "error"
      );

      toast.error("Failed to Fix Website");

    } finally {

      stopLoading();

    }
  };

  // ===========================
  // Optimize Website
  // ===========================

  const handleOptimize = async () => {

    startLoading(25, "Optimizing Website...");

    addConsoleLog(
      "Optimizing website...",
      "info"
    );

    try {

      addMessage(
        "user",
        "✨ Optimize my website"
      );

      const { html, css, javascript } =
        getCurrentWebsite();

      const res = await optimizeWebsite({
        html,
        css,
        javascript,
      });

      setPendingChanges({
        html: res.html,
        css: res.css,
        javascript: res.javascript,
      });

      addConsoleLog(
        "Optimization completed",
        "success"
      );

      toast.success("Review AI Changes");

    } catch (error) {

      console.error(error);

      addConsoleLog(
        "Failed to Optimize Website",
        "error"
      );

      toast.error("Failed to Optimize Website");

    } finally {

      stopLoading();

    }
  };

  // ===========================
  // Explain Website
  // ===========================

  const handleExplain = async () => {

    startLoading(30, "Understanding Code...");

    try {

      const history = addMessage(
        "user",
        "Explain my current website"
      );

      const { html, css, javascript } =
        getCurrentWebsite();

      const res = await explainWebsite({
        html,
        css,
        javascript,
      });

      const aiHistory = [
        ...history,
        {
          id: Date.now(),
          sender: "ai",
          message: res.explanation,
          time: new Date().toLocaleTimeString(),
        },
      ];

      setChatHistory(aiHistory);

      await saveChatHistory(aiHistory);

    } catch (error) {

      console.error(error);

      toast.error("Failed to Explain Website");

    } finally {

      stopLoading();

    }
  };
    // ===========================
  // Generate Component
  // ===========================

  const handleGenerateComponent = async (prompt) => {
    startLoading(30, "Generating Component...");

    try {
      const res = await generateComponent(prompt);

      if (!res?.html) {
        toast.error("AI failed to generate component");
        return;
      }

      const current = getContent();

      setPendingChanges({
        html: current.html + "\n" + (res.html || ""),
        css: current.css + "\n" + (res.css || ""),
        javascript:
          current.javascript +
          "\n" +
          (res.javascript || ""),
      });

      toast.success("Component generated successfully");

    } catch (error) {

      console.error(error);

      toast.error("Failed to Generate Component");

    } finally {

      stopLoading();

    }
  };

  // ===========================
  // AI Agent
  // ===========================

  const handleAgent = async (request) => {

    const data =
      typeof request === "string"
        ? {
            prompt: request,
            mode: "chat",
          }
        : request;

    // Vision Mode (currently uses Generate)
    if (data.mode === "vision") {

      addConsoleLog(
        "AI detected Vision Mode",
        "info"
      );

      return handleGenerate(data.prompt);
    }

    const action = detectIntent(data.prompt);

    addConsoleLog(
      `AI detected action: ${action}`,
      "info"
    );

    switch (action) {

      case "generate":
        return handleGenerate(data.prompt);

      case "edit":
        return handleEdit(data.prompt);

      case "fix":
        return handleFix();

      case "optimize":
        return handleOptimize();

      case "component":
        return handleGenerateComponent(data.prompt);

      case "explain":
        return handleExplain();

      default:
        return handleGenerate(data.prompt);
    }
  };

  // ===========================
  // Exports
  // ===========================

  return {
    handleGenerate,
    handleEdit,
    handleFix,
    handleOptimize,
    handleExplain,
    handleGenerateComponent,
    handleAgent,
  };
}