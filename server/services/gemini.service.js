import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateWebsiteFromAI = async (prompt) => {
  const fullPrompt = `
You are an expert frontend developer.

Generate a complete responsive website.

Return ONLY valid JSON.

Format:

{
  "html":"",
  "css":"",
  "javascript":""
}

Rules:
- No markdown
- No explanation
- No code block
- No \`\`\`
- HTML only in html
- CSS only in css
- JavaScript only in javascript

User Request:
${prompt}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt,
  });

  let text = response.text;

  // Remove markdown code blocks if present
  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("Invalid Gemini Response:");
    console.log(text);

    throw new Error("Gemini returned invalid JSON.");
  }
};
export const editWebsiteWithAI = async ({
  prompt,
  html,
  css,
  javascript,
}) => {
  const fullPrompt = `
You are an expert frontend developer.

Modify the existing website according to the user's request.

Return ONLY valid JSON.

Format:

{
  "html":"",
  "css":"",
  "javascript":""
}

Rules:
- Preserve existing code unless modification is required.
- No markdown.
- No explanation.
- No \`\`\`.

Current HTML:
${html}

Current CSS:
${css}

Current JavaScript:
${javascript}

User Request:
${prompt}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: fullPrompt,
  });

  let text = response.text;

  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
};