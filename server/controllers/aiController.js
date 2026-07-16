import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateCode = async (req, res) => {
  try {
    const { prompt } = req.body;
const response = await ai.models.generateContent({
  model: "gemini-3.5-flash",
      contents: `
Return ONLY valid JSON.

Format:
{
  "html":"",
  "css":"",
  "javascript":""
}

User Prompt:
${prompt}
`,
    });

    res.json({
      success: true,
      result: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};