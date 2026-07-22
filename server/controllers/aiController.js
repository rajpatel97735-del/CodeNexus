import {
  generateWebsiteFromAI,
  editWebsiteFromAI,
  fixWebsiteFromAI,
  explainWebsiteFromAI,
  optimizeWebsiteFromAI,
} from "../services/groq.service.js";

// ================= GENERATE WEBSITE =================
export const generateWebsite = async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await generateWebsiteFromAI(prompt);

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

// ================= EDIT WEBSITE =================
export const editWebsite = async (req, res) => {
  try {
    const { prompt, html, css, javascript } = req.body;

    const result = await editWebsiteFromAI({
      prompt,
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