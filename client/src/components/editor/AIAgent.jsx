const intentRules = [
  // ================= COMPONENT =================
  {
    action: "component",
    keywords: [
      "section",
      "component",
      "navbar",
      "hero",
      "footer",
      "pricing",
      "testimonial",
      "faq",
      "contact form",
      "login form",
      "signup form",
      "card",
      "gallery",
      "team",
      "feature",
      "services",
      "about section",
      "stats",
      "timeline",
      "accordion",
      "modal",
      "popup",
    ],
  },

  // ================= GENERATE =================
  {
    action: "generate",
keywords: [
  "create",
  "build",
  "generate",
  "make",
  "develop",

  "website",
  "web app",
  "application",
  "app",

  "react app",
  "react project",
  "react vite",
  "vite project",

  "todo app",
  "portfolio",
  "dashboard",
  "landing page",
  "clone",

  "full website",
  "full project"
]
  },

  // ================= EDIT =================
  {
    action: "edit",
    keywords: [
      "add",
      "change",
      "modify",
      "replace",
      "update",
      "remove",
      "delete",
      "convert",
      "move",
      "resize",
      "dark mode",
      "light mode",
      "change color",
      "increase",
      "decrease",
    ],
  },

  // ================= FIX =================
  {
    action: "fix",
    keywords: [
      "fix",
      "bug",
      "error",
      "issue",
      "broken",
      "not working",
      "repair",
      "resolve",
    ],
  },

  // ================= OPTIMIZE =================
  {
    action: "optimize",
    keywords: [
      "optimize",
      "performance",
      "speed",
      "responsive",
      "clean code",
      "improve",
      "faster",
    ],
  },

  // ================= EXPLAIN =================
  {
    action: "explain",
    keywords: [
      "explain",
      "how",
      "why",
      "what is",
      "describe",
      "documentation",
    ],
  },
];

export function detectIntent(prompt) {
  const text = prompt.toLowerCase();

  for (const rule of intentRules) {
    for (const keyword of rule.keywords) {
      if (text.includes(keyword)) {
        return rule.action;
      }
    }
  }

  return "generate";
}