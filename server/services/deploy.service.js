import fs from "fs-extra";
import path from "path";
import os from "os";
import { v4 as uuid } from "uuid";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export const deployWebsite = async ({ html, css = "", javascript = "" }) => {
  try {
    // Unique folder name
    const projectId = uuid();

    // Temp directory
    const projectDir = path.join(os.tmpdir(), `codenexus-${projectId}`);

    // Create folder
    await fs.ensureDir(projectDir);

    // HTML
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>CodeNexus Project</title>
<link rel="stylesheet" href="style.css" />
</head>

<body>

${html}

<script src="script.js"></script>

</body>
</html>
`;

    // Write files
    await fs.writeFile(
      path.join(projectDir, "index.html"),
      htmlContent,
      "utf8"
    );

    await fs.writeFile(
      path.join(projectDir, "style.css"),
      css,
      "utf8"
    );

    await fs.writeFile(
      path.join(projectDir, "script.js"),
      javascript,
      "utf8"
    );

    console.log("✅ Temporary project created:");
    console.log(projectDir);

    // Return folder for next step
  // Deploy to Vercel
const { stdout, stderr } = await execAsync(
  `vercel deploy --yes --token=${process.env.VERCEL_TOKEN}`,
  {
    cwd: projectDir,
  }
);

if (stderr) {
  console.log(stderr);
}

const output = stdout.trim();

// Find deployment URL
const urlMatch = output.match(/https:\/\/[^\s]+\.vercel\.app/);

if (!urlMatch) {
  throw new Error("Deployment URL not found.");
}

const deploymentUrl = urlMatch[0];

return {
  url: deploymentUrl,
};
  } catch (err) {
    console.error(err);
    throw err;
  }
};