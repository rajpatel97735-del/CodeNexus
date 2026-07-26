export default function buildAIContext({ prompt, website }) {
  return `
You are an expert Full Stack Web Developer.

USER REQUEST:
${prompt}

CURRENT HTML:
${website.html}

CURRENT CSS:
${website.css}

CURRENT JAVASCRIPT:
${website.javascript}

Rules:
- Keep the existing website unless the user asks to replace it.
- Modify only what is requested.
- Preserve responsive design.
- Return only valid HTML, CSS and JavaScript.
`;
}