import {
  generateWebsiteFromAI,
  editWebsiteFromAI,
  fixWebsiteFromAI,
  explainWebsiteFromAI,
  optimizeWebsiteFromAI,
   generateComponentFromAI
} from "../services/groq.service.js";

// ================= GENERATE WEBSITE =================
export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
const result = await generateWebsiteFromAI(prompt);

if (result.framework === "react-vite") {
    return res.json({
        success: true,
        framework: result.framework,
        files: result.files
    });
}

return res.json({
    success: true,
    html: result.html,
    css: result.css,
    javascript: result.javascript
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EDIT WEBSITE =================
export const editWebsite = async (req, res) => {
  try {
    const {
  prompt,
  framework,
  files,
  html,
  css,
  javascript,
} = req.body;

 const result = await editWebsiteFromAI({
    prompt,
    framework,
    files,
    html,
    css,
    javascript,
});
 if (result.framework === "react-vite") {
  return res.status(200).json({
    success: true,
    framework: result.framework,
    files: result.files,
  });
}

return res.status(200).json({
  success: true,
  html: result.html,
  css: result.css,
  javascript: result.javascript,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= FIX WEBSITE =================
export const fixWebsite = async (req, res) => {
  try {
    const { html, css, javascript } = req.body;

    const result = await fixWebsiteFromAI({
      html,
      css,
      javascript,
    });

    return res.status(200).json({
      success: true,
      html: result.html,
      css: result.css,
      javascript: result.javascript,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ================= EXPLAIN WEBSITE =================
export const explainWebsite = async (req, res) => {
  try {
    const { html, css, javascript } = req.body;

    const explanation = await explainWebsiteFromAI({
      html,
      css,
      javascript,
    });

    return res.status(200).json({
      success: true,
      explanation,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const optimizeWebsite = async (req, res) => {
  try {
    const { html, css, javascript } = req.body;

    const optimized = await optimizeWebsiteFromAI({
      html,
      css,
      javascript,
    });

    res.status(200).json({
      success: true,
      ...optimized,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ================= GENERATE COMPONENT =================
export const generateComponent = async (req, res) => {
  try {
    const { prompt } = req.body;
console.log("🔥 generateComponent called");

const result = await generateComponentFromAI(prompt);

console.log("RESULT =>", result);

console.log("✅ Sending response");
    res.status(200).json({
      success: true,
      html: result.html,
      css: result.css,
      javascript: result.javascript,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// ================= VISION WEBSITE =================
export const visionWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Temporary (AI integration next step)
    console.log("Image:", image.originalname);
    console.log("Prompt:", prompt);

    return res.status(200).json({
      success: true,
      html: `
<div class="container">
  <h1>Vision Mode Working 🚀</h1>
  <p>${prompt}</p>
</div>
      `,
      css: `
body{
  background:#0f172a;
  color:white;
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
}

.container{
  text-align:center;
}
      `,
      javascript: `console.log("Vision Mode Active");`,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


