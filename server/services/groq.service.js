import Groq from "groq-sdk";

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

export async function generateWebsiteFromAI(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: `
You are an expert frontend developer.

Create modern responsive websites.

Return EXACTLY in this format.

###HTML###
<body content only>

###CSS###
(all css)

###JAVASCRIPT###
(all javascript)

Rules:

- No JSON
- No markdown
- No \`\`\`
- No explanation
- HTML must NOT contain:
<!DOCTYPE html>
<html>
<head>
<body>
</body>
</html>

Do not write anything except these three sections.
`,
      },
      {
        role: "user",
        content: prompt,
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
  html,
  css,
  javascript,
})
 {
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