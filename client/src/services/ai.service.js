import axios from "./axios";

// ================= Generate Website =================
export const generateWebsite = async (prompt) => {
  try {
   const { data } = await axios.post("/ai/generate", {
  prompt,
});

return data;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};

// ================= Edit Website =================
export const editWebsite = async (payload) => {

    const { data } = await axios.post(
        "/ai/edit",
        payload
    );

    return data;

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
// ================= Vision Website =================
export const visionWebsite = async (formData) => {
  try {
    const res = await axios.post("/ai/vision", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};
export const generateComponent = async (prompt) => {
  try {
    const { data } = await axios.post("/ai/component", {
      prompt,
    });

    return data;
  } catch (err) {
    console.log("Backend Response:", err.response?.data);
    throw err;
  }
};