import toast from "react-hot-toast";
import buildAIContext from "../utils/buildAIContext";
import { detectIntent } from "../components/editor/AIAgent";
import {
  generateWebsite,
  editWebsite,
  fixWebsite,
  optimizeWebsite,
  explainWebsite,
  visionWebsite,
  generateComponent
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
}){


    const handleGenerate = async (prompt) => {
      console.count("HANDLE GENERATE");
setAiState({
  loading: true,
  progress: 10,
  step: "Reading Project...",
  logs: [],
});
addLog("📂 Reading project files...");
  addConsoleLog(`Generating website: ${prompt}`, "info");
setAiState((prev)=>({
    ...prev,
    progress:40,
    step:"Understanding Prompt..."
}));

addLog("🧠 Understanding prompt...");
  try {
    addMessage("user", prompt);
    setAiState({
  loading: true,
  step: "Generating website...",
  progress: 50,
});
setAiState({
  loading: true,
  step: "Generating HTML...",
  progress: 35,
});
setAiState((prev)=>({
    ...prev,
    progress:40,
    step:"Understanding Prompt..."
}));

addLog("🧠 Understanding prompt...");
    const res = await generateWebsite(prompt);
    console.log("========== AI RESPONSE ==========");
console.log(res);
console.log("Framework:", res.framework);
console.log("Files:", res.files);
console.log("HTML:", res.html);
console.log("================================");
    if (res.framework === "react-vite" && Array.isArray(res.files)) {
  replaceFiles(res.files);

  toast.success("React Project Generated Successfully");

  return;
}

    setAiState({
  loading: true,
  step: "Applying generated code...",
  progress: 80,
});
setAiState({
  loading: true,
  step: "Generating CSS & JavaScript...",
  progress: 70,
});
setAiState((prev)=>({
    ...prev,
    progress:90,
    step:"Applying Changes..."
}));

addLog("✅ Applying generated code...");
   
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
setAiState({
  loading: true,
  step: "Finalizing website...",
  progress: 95,
});

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
   setAiState({
  loading: false,
  step: "",
  progress: 100,
});
  }
};
const handleEdit = async (prompt) => {
  setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});

  addConsoleLog(`Editing website: ${prompt}`, "info");

  try {
    addMessage("user", prompt);

    const { html, css, javascript } = getCurrentWebsite();
// ================= React Project =================

const isReactProject = files.some(
  (file) => file.path === "src/App.jsx"
);

if (isReactProject) {

  const res = await editWebsite({
    prompt,
    framework: "react-vite",
    files,
  });

  if (res.framework === "react-vite") {

    replaceFiles(res.files);

    toast.success("React Project Updated");

    return;
  }

}
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
  } catch (err) {
    console.error(err);

    addConsoleLog(
      "Failed to Update Website",
      "error"
    );

    toast.error("Failed to Update Website");
  } finally {
    setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});
  }
};
const handleFix = async () => {
  setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});

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
  html: res.html,
  css: res.css,
  javascript: res.javascript,
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
   setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});
  }
};
const handleOptimize = async () => {
  setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});

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
  html: res.html,
  css: res.css,
  javascript: res.javascript,
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
  setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});
  }
};
const handleExplain = async () => {
  try {
    setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});

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
       message: res.explanation,
        time: new Date().toLocaleTimeString(),
      },
    ];

    setChatHistory(aiHistory);

    await saveChatHistory(aiHistory);
  } catch (err) {
    console.error(err);
    toast.error("Failed to Explain Website");
  } finally {
setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});
  }
};
const handleGenerateComponent = async (prompt) => {
  try {
    setAiState({
      loading: true,
      step: "Generating Component...",
      progress: 30,
    });

console.log("1 Before API");

const res = await generateComponent(prompt);

console.log("2 Response =>", res);

console.log("3 Before setPendingChanges");

if (!res?.html) {
  toast.error("AI failed to generate component");
  return;
}

setPendingChanges({
  html: getContent().html + "\n" + res.html,
  css: getContent().css + "\n" + res.css,
  javascript: getContent().javascript + "\n" + res.javascript,
});

toast.success("Component generated successfully");

setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});
  } catch (err) {
   setAiState({
  loading: false,
  progress: 100,
  step: "",
  logs: [],
});
    throw err;
  }
};
const handleAgent = async (request) => {
  
  const data =
    typeof request === "string"
      ? {
          prompt: request,
          mode: "chat",
        }
      : request;

  // 🚀 Vision Mode
  if (data.mode === "vision") {
    addConsoleLog("AI detected Vision Mode", "info");

    console.log("Vision Request:", data);

    // Abhi temporary:
    return handleGenerate(data.prompt);

    // Future:
    // return handleVision(data);
  }

  // 💬 Normal Chat
  const action = detectIntent(data.prompt);

  addConsoleLog(`AI detected action: ${action}`, "info");

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
const getCurrentWebsite = () => {
  return getContent();
};
const addLog = (message) => {
  setAiState((prev) => ({
    ...(typeof prev === "object" && prev ? prev : {}),
    loading: true,
    logs: [...((prev && prev.logs) || []), message],
  }));
};
return {
  handleGenerate,
  handleEdit,
  handleFix,
  handleOptimize,
  handleExplain,
  handleAgent,
  handleGenerateComponent,
};
}