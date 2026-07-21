import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ConsoleProvider } from "./context/ConsoleContext";
import { FileProvider } from "./context/FileContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ConsoleProvider>
          <FileProvider>
            <App />
            <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#1e293b",
      color: "#fff",
      border: "1px solid #334155",
    },
  }}
/>
          </FileProvider>
        </ConsoleProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);