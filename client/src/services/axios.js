import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://codenexus-2.onrender.com/api",
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// ================================
// Request Interceptor
// ================================

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================================
// Response Interceptor
// ================================

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (!error.response) {
      console.error("Network Error");
    } else if (error.response.status === 401) {
      console.warn("Session Expired");

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    } else if (error.response.status === 403) {
      console.warn("Access Denied");
    } else if (error.response.status >= 500) {
      console.error("Server Error");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;