import Groq from "groq-sdk";
import { jsonrepair } from "jsonrepair";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function extractSection(text, section) {
  const startTag = `###${section}###`;
  const endTags = ["###HTML###", "###CSS###", "###JAVASCRIPT###"];

  const start = text.indexOf(startTag);

  if (start === -1) return "";

  const contentStart = start + startTag.length;

  let end = text.length;

  for (const tag of endTags) {
    if (tag === startTag) continue;

    const index = text.indexOf(tag, contentStart);

    if (index !== -1 && index < end) {
      end = index;
    }
  }

  return text.substring(contentStart, end).trim();
}
function detectFramework(prompt) {
  const text = prompt.toLowerCase();

  if (text.includes("react")) return "react";
  if (text.includes("vite")) return "react";
  if (text.includes("next")) return "next";
  if (text.includes("tailwind")) return "tailwind";

  return "html";
}
export async function generateWebsiteFromAI(prompt) {
  const framework = detectFramework(prompt);
   console.log("========== DETECTION ==========");
  console.log("Prompt:", prompt);
  console.log("Framework:", framework);
  console.log("===============================");
  if (framework === "react") {
        return generateReactWebsiteFromAI(prompt);
    }
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    messages: [
      {
        role: "system",
      content: `
You are a world-class Senior Frontend Engineer and UI/UX Designer.

Generate production-quality websites.

The website MUST look like it was designed by a professional agency.

Requirements:

• Modern UI
• Responsive on Mobile, Tablet and Desktop
• Beautiful typography
• Proper spacing
• Glassmorphism where appropriate
• Gradient backgrounds
• Soft shadows
• Smooth hover animations
• Attractive buttons
• Cards with rounded corners
• CSS transitions
• Professional color palette
• Semantic HTML
• Clean CSS
• Vanilla JavaScript only

Always include:

- Hero Section
- Navigation Bar
- Main Content
- Footer

If suitable also generate:

- Features
- Services
- Pricing
- Testimonials
- Contact Form
- FAQ

Use only:

HTML
CSS
Vanilla JavaScript

Do NOT use:

React
Vue
Angular
Bootstrap
Tailwind
External CSS
External JS

Return EXACTLY in this format.

###HTML###
(body content only)

###CSS###
(all css)

###JAVASCRIPT###
(all javascript)

Rules:

- No JSON
- No Markdown
- No Explanation
- No Triple Backticks

HTML MUST NOT contain:

<!DOCTYPE html>
<html>
<head>
<body>
</body>
</html>

Return ONLY these three sections.
`,
      },
      {
        role: "user",
       content: `
Create this website:

${prompt}

Make it visually stunning.

Ensure:

- Fully responsive
- Modern UI
- Beautiful animations
- Professional layout
- Clean code
- Accessibility
- Good spacing
- Premium appearance
`,
      },
    ],
  });

  let text = completion.choices[0].message.content.trim();

  console.log("\n===== RAW AI =====\n");
  console.log(text);
  console.log("\n==================\n");

  // Remove markdown if model adds it
  text = text
    .replace(/```html/gi, "")
    .replace(/```css/gi, "")
    .replace(/```javascript/gi, "")
    .replace(/```js/gi, "")
    .replace(/```/g, "");

  const html = extractSection(text, "HTML");
  const css = extractSection(text, "CSS");
  const javascript = extractSection(text, "JAVASCRIPT");

  if (!html && !css && !javascript) {
    throw new Error("AI response format is invalid.");
  }
  

  return {
    html,
    css,
    javascript,
  };
}
export async function editWebsiteFromAI({
    prompt,
    framework,
    files,
    html,
    css,
    javascript,
})
 {// ================= React Project Edit =================

if (framework === "react-vite") {

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `
You are a Senior React + Vite Engineer.

The user already has a React project.

Modify the project according to the request.

Return ONLY valid JSON.

Format:

{
  "framework":"react-vite",
  "files":[
    {
      "path":"src/App.jsx",
      "language":"jsx",
      "content":"..."
    }
  ]
}

Rules:

- Return COMPLETE updated files.
- Keep existing file paths.
- Create new files if required.
- Delete files only if necessary.
- No markdown.
- No explanation.
- No triple backticks.
`
      },
      {
        role: "user",
        content: JSON.stringify({
          prompt,
          files
        })
      }
    ]
  });

  let text = completion.choices[0].message.content.trim();

  text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

let project;

try {
  project = JSON.parse(text);
} catch {
  project = JSON.parse(jsonrepair(text));
}
const pkg = project.files?.find(
  (f) => f.path === "package.json"
);

if (pkg) {
  try {
    JSON.parse(pkg.content);
  } catch {
    pkg.content = JSON.stringify(
      JSON.parse(jsonrepair(pkg.content)),
      null,
      2
    );
  }
}
return project;

}
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    messages: [
      {
        role: "system",
        content: `
You are an expert frontend developer.

The user already has a website.

Modify ONLY according to the user's request.

Return EXACTLY in this format.

###HTML###
(updated html)

###CSS###
(updated css)

###JAVASCRIPT###
(updated javascript)

Rules:

- Return COMPLETE updated code.
- Do not return only changed lines.
- No markdown
- No JSON
- No explanation
- No \`\`\`
- HTML must NOT contain:
<!DOCTYPE html>
<html>
<head>
<body>
</body>
</html>
`,
      },
      {
        role: "user",
        content: `
Current HTML:

${html}

Current CSS:

${css}

Current JavaScript:

${javascript}

User Request:

${prompt}
`,
      },
    ],
  });

  let text = completion.choices[0].message.content.trim();

  text = text
    .replace(/```html/gi, "")
    .replace(/```css/gi, "")
    .replace(/```javascript/gi, "")
    .replace(/```js/gi, "")
    .replace(/```/g, "");

  const updatedHtml = extractSection(text, "HTML");
  const updatedCss = extractSection(text, "CSS");
  const updatedJavascript = extractSection(text, "JAVASCRIPT");

  if (!updatedHtml && !updatedCss && !updatedJavascript) {
    throw new Error("AI response format is invalid.");
  }

  return {
    html: updatedHtml,
    css: updatedCss,
    javascript: updatedJavascript,
  };
}
// ================= FIX WEBSITE =================
export async function fixWebsiteFromAI({
  html,
  css,
  javascript,
}) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are an expert frontend developer.

Your job is to FIX errors in the given website.

Fix:
- HTML syntax
- CSS syntax
- JavaScript syntax
- Missing tags
- Broken layouts
- Invalid code

Do NOT redesign the website.
Keep the same UI.

Return ONLY this format.

###HTML###
(updated html)

###CSS###
(updated css)

###JAVASCRIPT###
(updated javascript)

Rules:
- Return COMPLETE code.
- No markdown.
- No JSON.
- No explanation.
- No \`\`\`
- Do NOT include:
<!DOCTYPE html>
<html>
<head>
<body>
</body>
</html>
`,
      },
      {
        role: "user",
        content: `
Current HTML:
${html}

Current CSS:
${css}

Current JavaScript:
${javascript}
`,
      },
    ],
  });

  let text = completion.choices[0].message.content.trim();

  text = text
    .replace(/```html/gi, "")
    .replace(/```css/gi, "")
    .replace(/```javascript/gi, "")
    .replace(/```js/gi, "")
    .replace(/```/g, "");

  const fixedHtml = extractSection(text, "HTML");
  const fixedCss = extractSection(text, "CSS");
  const fixedJavascript = extractSection(text, "JAVASCRIPT");

  return {
    html: fixedHtml,
    css: fixedCss,
    javascript: fixedJavascript,
  };
}

// ================= OPTIMIZE WEBSITE =================
export async function optimizeWebsiteFromAI({
  html,
  css,
  javascript,
}) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are an expert frontend developer.

Optimize the given website.

Rules:
- Improve HTML structure
- Remove unnecessary code
- Optimize CSS
- Improve JavaScript
- Improve performance
- Improve responsiveness
- Improve accessibility

Return ONLY this format.

###HTML###
(updated html)

###CSS###
(updated css)

###JAVASCRIPT###
(updated javascript)
`,
      },
      {
        role: "user",
        content: `
HTML:
${html}

CSS:
${css}

JavaScript:
${javascript}
`,
      },
    ],
  });

  let text = completion.choices[0].message.content.trim();

  text = text
    .replace(/```html/gi, "")
    .replace(/```css/gi, "")
    .replace(/```javascript/gi, "")
    .replace(/```js/gi, "")
    .replace(/```/g, "");

  const optimizedHtml = extractSection(text, "HTML");
  const optimizedCss = extractSection(text, "CSS");
  const optimizedJavascript = extractSection(text, "JAVASCRIPT");

  return {
    html: optimizedHtml,
    css: optimizedCss,
    javascript: optimizedJavascript,
  };
}

// ================= EXPLAIN WEBSITE =================
export async function explainWebsiteFromAI({
  html,
  css,
  javascript,
}) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are an expert frontend developer.

Analyze the given website.

Return ONLY plain text.

Explain using this format:

HTML:
...

CSS:
...

JavaScript:
...

Performance:
...

Accessibility:
...

SEO:
...

Suggestions:
...
`,
      },
      {
        role: "user",
        content: `
HTML:
${html}

CSS:
${css}

JavaScript:
${javascript}
`,
      },
    ],
  });

  return completion.choices[0].message.content.trim();
}
export async function generateComponentFromAI(prompt) {
  console.log("1. Before Groq API");
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: `
You are an expert frontend developer.

Generate ONLY the requested component.

Return ONLY this format.

###HTML###
(component html)

###CSS###
(component css)

###JAVASCRIPT###
(component javascript)

Rules:
- No markdown
- No explanation
- No JSON
- No <!DOCTYPE>
- No <html>
- No <body>
`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  console.log("2. After Groq API");

  let text = completion.choices[0].message.content;
console.log("3. AI Response:");
console.log(text)
  text = text
    .replace(/```html/gi, "")
    .replace(/```css/gi, "")
    .replace(/```javascript/gi, "")
    .replace(/```js/gi, "")
    .replace(/```/g, "");

  return {
    html: extractSection(text, "HTML"),
    css: extractSection(text, "CSS"),
    javascript: extractSection(text, "JAVASCRIPT"),
  };
}
async function generateReactWebsiteFromAI(prompt) {

  const completion = await groq.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    temperature: 0.3,

    messages: [

      {
        role: "system",

        
content: `
You are a Senior React, Vite and Frontend Architect.

Generate a COMPLETE production-ready React Vite project.

Return ONLY valid JSON.

The JSON format MUST be:

{
  "framework": "react-vite",
  "files": [
    {
      "path": "package.json",
      "language": "json",
      "content": "..."
    }
  ]
}

IMPORTANT RULES

1. Return ONLY JSON.
2. No markdown.
3. No explanation.
4. No triple backticks.
5. Every file must contain COMPLETE code.
6. Never return partial code.
7. Never omit required files.

The project MUST contain these files:

- package.json
- vite.config.js
- index.html
- src/main.jsx
- src/App.jsx
- src/index.css

If additional files are required, include them.

package.json MUST include:

- name
- private
- version
- type: module
- scripts
    - dev
    - build
    - preview
- dependencies
- devDependencies

Use:

React
Vite
JavaScript

Do NOT use TypeScript unless the user explicitly requests it.

Do NOT use CDN links.

All imports must work correctly.

The project must run successfully after:

npm install
npm run dev

Generate clean, production-quality code.
`
      },

      {
        role: "user",
        content: prompt
      }

    ]

  });

  let text = completion.choices[0].message.content.trim();
console.log("========== RAW REACT RESPONSE ==========");
console.log(text);
console.log("========================================");
  text = text.replace(/```json/gi, "")
             .replace(/```/g, "")
             .trim();

 let project;

try {
    project = JSON.parse(text);
} catch {
    project = JSON.parse(jsonrepair(text));
}

return project;

}