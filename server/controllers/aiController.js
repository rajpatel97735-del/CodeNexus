import { generateWebsiteFromAI } from "../services/groq.service.js";
export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await generateWebsiteFromAI(prompt);

    console.log("Controller Result:");
    console.log(result);

    return res.status(200).json({
      success: true,
      html: result.html,
      css: result.css,
      javascript: result.javascript,
    });

  } catch (error) {
    console.error("========== CONTROLLER ERROR ==========");
    console.error(error);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};