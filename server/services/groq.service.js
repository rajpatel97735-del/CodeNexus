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