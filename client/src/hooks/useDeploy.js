import { deployProject } from "../services/deploy.service";
import toast from "react-hot-toast";

export default function useDeploy({
  getContent,
  addConsoleLog,
}) {
  const handleDeploy = async () => {
    try {
      addConsoleLog("🚀 Deploying Project...", "info");

      const { html, css, javascript } = getContent();

      const res = await deployProject({
        html,
        css,
        javascript,
      });

      toast.success("Website deployed successfully!");

      addConsoleLog(`🌍 ${res.url}`, "success");

      window.open(res.url, "_blank");

    } catch (err) {
      console.error(err);

      toast.error("Deployment Failed");

      addConsoleLog("Deployment failed", "error");
    }
  };

  return {
    handleDeploy,
  };
}