import { generateWebsite } from "../services/groq.service.js";

export const generateCode = async (req, res) => {
  try {
    const { prompt } = req.body;

    const result = await generateWebsite(prompt);

    res.json(JSON.parse(result));
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};