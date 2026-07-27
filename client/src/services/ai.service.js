import axios from "./axios";

/**
 * Generic POST helper
 */
const post = async (url, payload = {}, config = {}) => {
  try {
    const { data } = await axios.post(url, payload, config);
    return data;
  } catch (error) {
    console.error(
      `AI Service Error (${url}):`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// ===============================
// Generate Website
// ===============================

export const generateWebsite = (prompt) =>
  post("/ai/generate", { prompt });

// ===============================
// Edit Website
// ===============================

export const editWebsite = (payload) =>
  post("/ai/edit", payload);

// ===============================
// Fix Website
// ===============================

export const fixWebsite = (payload) =>
  post("/ai/fix", payload);

// ===============================
// Optimize Website
// ===============================

export const optimizeWebsite = (payload) =>
  post("/ai/optimize", payload);

// ===============================
// Explain Website
// ===============================

export const explainWebsite = (payload) =>
  post("/ai/explain", payload);

// ===============================
// Generate Component
// ===============================

export const generateComponent = (prompt) =>
  post("/ai/component", { prompt });

// ===============================
// Vision Website
// ===============================

export const visionWebsite = (formData) =>
  post("/ai/vision", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });