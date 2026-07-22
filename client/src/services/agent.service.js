export async function runAgent(prompt, actions) {
  const intent = detectIntent(prompt);

  switch (intent) {
    case "generate":
      return actions.generate(prompt);

    case "edit":
      return actions.edit(prompt);

    case "fix":
      return actions.fix(prompt);

    case "optimize":
      return actions.optimize(prompt);

    case "explain":
      return actions.explain(prompt);

    default:
      return actions.generate(prompt);
  }
}