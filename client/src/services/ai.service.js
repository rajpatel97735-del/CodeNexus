import axios from "./axios";

export const generateWebsite = async (prompt) => {
  return axios.post("/ai/generate", {
    prompt,
  });
};