const intentRules = [
  {
    action: "generate",
    keywords: [
      "create",
      "build",
      "generate",
      "make website",
      "design",
      "portfolio",
      "landing page",
      "dashboard",
      "ecommerce",
      "restaurant",
      "website",
    ],
  },

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
      "make",
      "convert",
      "move",
      "resize",
    ],
  },

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