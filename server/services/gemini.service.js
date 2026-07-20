import axios from "axios";

export async function generateWebsite(prompt) {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content: `You are an expert web developer.

Return ONLY valid JSON in this format:

{
  "html": "",
  "css": "",
  "javascript": ""
}

Do not add markdown.
Do not use \`\`\`.
Do not explain anything.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  let text = response.data.choices[0].message.content.trim();

  // Remove markdown if the model returns it
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  return text;
}