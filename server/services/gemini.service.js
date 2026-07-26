import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-2.5-flash-lite";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



// ===============================
// COMMON HELPERS
// ===============================

function cleanResponse(text = "") {
  return text
    .replace(/```json/gi, "")
    .replace(/```html/gi, "")
    .replace(/```css/gi, "")
    .replace(/```javascript/gi, "")
    .replace(/```js/gi, "")
    .replace(/```/g, "")
    .trim();
}

function parseJSON(text) {
  try {
    return JSON.parse(cleanResponse(text));
  } catch (err) {
    console.error("❌ Gemini Invalid JSON");
    console.log(text);
    throw new Error("Gemini returned invalid JSON.");
  }
}

async function askGemini(prompt) {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });

  return cleanResponse(response.text);
}

// ===============================
// GENERATE WEBSITE
// ===============================

export async function generateWebsiteFromAI(prompt) {
  const fullPrompt = `
You are a world-class Senior Frontend Engineer and UI/UX Designer.

Generate a production-quality website.

Return ONLY valid JSON.

Format:

{
  "html":"",
  "css":"",
  "javascript":""
}

Rules:

- Modern UI
- Fully Responsive
- Mobile First
- Professional Color Palette
- Beautiful Typography
- Hero Section
- Navbar
- Features
- Cards
- CTA
- Footer
- Attractive Buttons
- Animations
- Glassmorphism where suitable
- Vanilla HTML
- Vanilla CSS
- Vanilla JavaScript

Do NOT use:

React
Vue
Angular
Bootstrap
Tailwind

Do NOT include:

<!DOCTYPE html>

<html>

<head>

<body>

Return ONLY JSON.

User Request:

${prompt}
`;

  const text = await askGemini(fullPrompt);

  const result = parseJSON(text);

  return {
    html: result.html || "",
    css: result.css || "",
    javascript: result.javascript || "",
  };
}
// ===============================
// EDIT WEBSITE
// ===============================

export async function editWebsiteFromAI({
  prompt,
  html,
  css,
  javascript,
}) {
  const fullPrompt = `
You are a world-class Senior Frontend Engineer.

The user already has a website.

Modify the website according to the user's request.

Return ONLY valid JSON.

Format:

{
  "html":"",
  "css":"",
  "javascript":""
}

Rules:

- Preserve the existing design unless requested.
- Return COMPLETE updated code.
- Do NOT return only changed lines.
- No explanation.
- No markdown.
- No code block.

Current HTML:

${html}

Current CSS:

${css}

Current JavaScript:

${javascript}

User Request:

${prompt}
`;

  const text = await askGemini(fullPrompt);

  const result = parseJSON(text);

  return {
    html: result.html || html,
    css: result.css || css,
    javascript: result.javascript || javascript,
  };
}

// ===============================
// FIX WEBSITE
// ===============================

export async function fixWebsiteFromAI({
  html,
  css,
  javascript,
}) {
  const fullPrompt = `
You are a Senior Frontend Debugging Expert.

Fix every issue in the website.

Fix:

- HTML errors
- CSS errors
- JavaScript errors
- Responsive issues
- Broken layouts
- Accessibility issues
- Missing tags
- Console errors

Do NOT redesign the website.

Return ONLY valid JSON.

Format:

{
  "html":"",
  "css":"",
  "javascript":""
}

Current HTML:

${html}

Current CSS:

${css}

Current JavaScript:

${javascript}
`;

  const text = await askGemini(fullPrompt);

  const result = parseJSON(text);

  return {
    html: result.html || html,
    css: result.css || css,
    javascript: result.javascript || javascript,
  };
}
// ===============================
// OPTIMIZE WEBSITE
// ===============================

export async function optimizeWebsiteFromAI({
  html,
  css,
  javascript,
}) {
  const fullPrompt = `
You are a Senior Frontend Performance Engineer.

Optimize the website.

Goals:

- Improve HTML structure
- Improve CSS organization
- Reduce duplicate CSS
- Improve JavaScript
- Improve responsiveness
- Improve accessibility
- Improve SEO
- Improve performance
- Keep the same design

Return ONLY valid JSON.

Format:

{
  "html":"",
  "css":"",
  "javascript":""
}

Current HTML:

${html}

Current CSS:

${css}

Current JavaScript:

${javascript}
`;

  const text = await askGemini(fullPrompt);

  const result = parseJSON(text);

  return {
    html: result.html || html,
    css: result.css || css,
    javascript: result.javascript || javascript,
  };
}

// ===============================
// EXPLAIN WEBSITE
// ===============================

export async function explainWebsiteFromAI({
  html,
  css,
  javascript,
}) {
  const fullPrompt = `
You are a Senior Frontend Mentor.

Analyze the following website.

Explain in simple professional English.

Use this format:

HTML
- ...

CSS
- ...

JavaScript
- ...

Performance
- ...

Accessibility
- ...

SEO
- ...

Suggestions
- ...

Current HTML:

${html}

Current CSS:

${css}

Current JavaScript:

${javascript}
`;

  return await askGemini(fullPrompt);
}
// ===============================
// AI CHAT
// ===============================

export async function chatWithAI(messages) {
  const history = messages
    .map((msg) => {
      const role = msg.sender === "user" ? "user" : "model";
      return `${role.toUpperCase()}:\n${msg.message}`;
    })
    .join("\n\n");

  const prompt = `
You are CodeNexus AI.

You are a professional AI software engineer.

You help users with:

- HTML
- CSS
- JavaScript
- React
- Node.js
- Express
- MongoDB
- UI Design
- Debugging
- Website Generation
- API Development

Rules:

- Give clean answers.
- Use Markdown.
- Wrap code inside markdown code blocks.
- If user asks for website generation, explain first and suggest using the Website Builder.
- Be concise unless detailed explanation is requested.

Conversation:

${history}
`;

  const text = await askGemini(prompt);

  return text;
}