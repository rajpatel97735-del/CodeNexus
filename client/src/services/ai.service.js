import axios from "./axios";

export const generateWebsite = async (prompt) => {
  try {
    const res = await axios.post("/ai/generate", { prompt });
    return res;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};