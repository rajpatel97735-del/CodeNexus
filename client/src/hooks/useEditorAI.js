import toast from "react-hot-toast";
import buildAIContext from "../utils/buildAIContext";
import { detectIntent } from "../components/editor/AIAgent";

import {
  generateWebsite,
  editWebsite,
  fixWebsite,
  optimizeWebsite,
  explainWebsite,
} from "../services/ai.service";

export default function useEditorAI({
  getContent,
  replaceContent,
  addConsoleLog,
  addMessage,
  saveVersion,
  saveChatHistory,
  setChatHistory,
  setAiTyping,
  setPendingChanges,
}){


    const handleGenerate = async (prompt) => {
  setAiTyping(true);

  addConsoleLog(`Generating website: ${prompt}`, "info");

  try {
    addMessage("user", prompt);

    const res = await generateWebsite(prompt);
   
replaceContent({
  html: res.data.html,
  css: res.data.css,
  javascript: res.data.javascript,
});

saveVersion(
  res.data.html,
  res.data.css,
  res.data.javascript
);

addConsoleLog(
  "Website generated successfully",
  "success"
);

toast.success("Website Generated Successfully");
  } catch (err) {
    console.error(err);

    addConsoleLog(
      "Failed to Generate Website",
      "error"
    );

    toast.error("Failed to Generate Website");
  } finally {
    setAiTyping(false);
  }
};
const handleEdit = async (prompt) => {
  setAiTyping(true);

  addConsoleLog(`Editing website: ${prompt}`, "info");

  try {
    addMessage("user", prompt);

    const { html, css, javascript } = getCurrentWebsite();

    const res = await editWebsite({
      prompt,
      html,
      css,
      javascript,
    });

    setPendingChanges({
  html: res.data.html,
  css: res.data.css,
  javascript: res.data.javascript,
});

addConsoleLog(
  "AI changes are ready to apply",
  "success"
);

toast.success("Review AI Changes");
  } catch (err) {
    console.error(err);

    addConsoleLog(
      "Failed to Update Website",
      "error"
    );

    toast.error("Failed to Update Website");
  } finally {
    setAiTyping(false);
  }
};
const handleFix = async () => {
  setAiTyping(true);

  addConsoleLog("Fixing website...", "info");

  try {
    addMessage("user", "🛠 Fix my website");

    const { html, css, javascript } = getCurrentWebsite();

    const res = await fixWebsite({
      html,
      css,
      javascript,
    });

setPendingChanges({
  html: res.data.html,
  css: res.data.css,
  javascript: res.data.javascript,
});

addConsoleLog(
  "AI changes are ready to apply",
  "success"
);

toast.success("Review AI Changes");
  } catch (err) {
    console.error(err);

    addConsoleLog(
      "Failed to Fix Website",
      "error"
    );

    toast.error("Failed to Fix Website");
  } finally {
    setAiTyping(false);
  }
};
const handleOptimize = async () => {
  setAiTyping(true);

  addConsoleLog("Optimizing website...", "info");

  try {
    addMessage("user", "✨ Optimize my website");

    const { html, css, javascript } = getCurrentWebsite();

    const res = await optimizeWebsite({
      html,
      css,
      javascript,
    });
setPendingChanges({
  html: res.data.html,
  css: res.data.css,
  javascript: res.data.javascript,
});

addConsoleLog(
  "AI changes are ready to apply",
  "success"
);

toast.success("Review AI Changes");
  } catch (err) {
    console.error(err);

    addConsoleLog(
      "Failed to Optimize Website",
      "error"
    );

    toast.error("Failed to Optimize Website");
  } finally {
    setAiTyping(false);
  }
};
const handleExplain = async () => {
  try {
    setAiTyping(true);

    const userHistory = addMessage(
      "user",
      "Explain my current website"
    );

    const { html, css, javascript } = getCurrentWebsite();

    const res = await explainWebsite({
      html,
      css,
      javascript,
    });

    const aiHistory = [
      ...userHistory,
      {
        id: Date.now(),
        sender: "ai",
        message: res.data.explanation,
        time: new Date().toLocaleTimeString(),
      },
    ];

    setChatHistory(aiHistory);

    await saveChatHistory(aiHistory);
  } catch (err) {
    console.error(err);
    toast.error("Failed to Explain Website");
  } finally {
    setAiTyping(false);
  }
};
const handleAgent = async (prompt) => {
  const action = detectIntent(prompt);

  addConsoleLog(`AI detected action: ${action}`, "info");

  switch (action) {
    case "generate":
      return handleGenerate(prompt);

    case "edit":
      return handleEdit(prompt);

    case "fix":
      return handleFix();

    case "optimize":
      return handleOptimize();

    case "explain":
      return handleExplain();

    default:
      return handleGenerate(prompt);
  }
};
const getCurrentWebsite = () => {
  return getContent();
};
return {
  handleGenerate,
  handleEdit,
  handleFix,
  handleOptimize,
  handleExplain,
  handleAgent,
};
}