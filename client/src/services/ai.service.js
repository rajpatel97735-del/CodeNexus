import axios from "./axios";

// ================= Generate Website =================
export const generateWebsite = async (prompt) => {
  try {
    const res = await axios.post("/ai/generate", { prompt });
    return res;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};

// ================= Edit Website =================
export const editWebsite = async ({
  prompt,
  html,
  css,
  javascript,
}) => {
  try {
    const res = await axios.post("/ai/edit", {
      prompt,
      html,
      css,
      javascript,
    });

    return res;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};

// ================= Fix Website =================
export const fixWebsite = async ({
  html,
  css,
  javascript,
}) => {
  try {
    const res = await axios.post("/ai/fix", {
      html,
      css,
      javascript,
    });

    return res;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};
// ================= Explain Website =================
export const explainWebsite = async ({
  html,
  css,
  javascript,
}) => {
  try {
    const res = await axios.post("/ai/explain", {
      html,
      css,
      javascript,
    });

    return res;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};
// ================= Optimize Website =================
export const optimizeWebsite = async ({
  html,
  css,
  javascript,
}) => {
  try {
    const res = await axios.post("/ai/optimize", {
      html,
      css,
      javascript,
    });

    return res;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};