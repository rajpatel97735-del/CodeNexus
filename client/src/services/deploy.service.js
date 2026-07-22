import api from "./axios";

export const deployProject = async ({
  html,
  css,
  javascript,
}) => {
  const res = await api.post("/deploy", {
    html,
    css,
    javascript,
  });

  return res.data;
};