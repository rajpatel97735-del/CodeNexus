import { createContext, useContext, useState } from "react";

const ConsoleContext = createContext();

export const ConsoleProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = "info") => {
    const time = new Date().toLocaleTimeString();

    setLogs((prev) => [
      ...prev,
      {
        id: Date.now(),
        message,
        type,
        time,
      },
    ]);
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <ConsoleContext.Provider
      value={{
        logs,
        addLog,
        clearLogs,
      }}
    >
      {children}
    </ConsoleContext.Provider>
  );
};

export const useConsole = () => useContext(ConsoleContext);