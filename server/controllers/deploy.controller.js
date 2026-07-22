import { deployWebsite } from "../services/deploy.service.js";

export const deployProject = async (req, res) => {
  try {
    const { html, css, javascript } = req.body;

    if (!html) {
      return res.status(400).json({
        success: false,
        message: "HTML is required",
      });
    }

    const result = await deployWebsite({
      html,
      css,
      javascript,
    });

    res.json({
      success: true,
      url: result.url,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Deployment failed",
    });
  }
};