import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ConsoleProvider } from "./context/ConsoleContext";
import { FileProvider } from "./context/FileContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ConsoleProvider>
          <FileProvider>
            <App />
          </FileProvider>
        </ConsoleProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);