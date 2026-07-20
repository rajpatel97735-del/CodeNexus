import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateWebsite(prompt) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `
You are an expert frontend web developer.

Return ONLY valid JSON.

Format:

{
  "html": "",
  "css": "",
  "javascript": ""
}

Do not use markdown.
Do not use \`\`\`.
Do not explain anything.
        `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let text = completion.choices[0].message.content.trim();

  text = text.replace(/```json/g, "")
             .replace(/```/g, "")
             .trim();

  return text;
}