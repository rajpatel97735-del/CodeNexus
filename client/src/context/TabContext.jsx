/**
 * ==========================================================
 * CodeNexus AI
 * Tab Context
 * ----------------------------------------------------------
 * Handles:
 * • Open Tabs
 * • Active Tab
 * • Open File
 * • Close File
 * • Switch Tab
 * ----------------------------------------------------------
 * Version : 1.0
 * Status  : Production
 * ==========================================================
 */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

const TabContext = createContext(null);

export function TabProvider({ children }) {

  /* ==========================================
      TAB STATE
  ========================================== */

  const [openTabs, setOpenTabs] = useState([]);

  const [activeFileId, setActiveFileId] = useState(null);

  /* ==========================================
      OPEN TAB
  ========================================== */

  const openTab = useCallback((file) => {

    if (!file) return;

    setOpenTabs((prev) => {

      const exists = prev.some(
        (tab) => tab.id === file.id
      );

      if (exists) return prev;

      return [...prev, file];
    });

    setActiveFileId(file.id);

  }, []);
    /* ==========================================
      CLOSE TAB
  ========================================== */

  const closeTab = useCallback((fileId) => {

    setOpenTabs((prev) => {

      const updatedTabs = prev.filter(
        (tab) => tab.id !== fileId
      );

      if (activeFileId === fileId) {

        if (updatedTabs.length > 0) {
          setActiveFileId(
            updatedTabs[updatedTabs.length - 1].id
          );
        } else {
          setActiveFileId(null);
        }

      }

      return updatedTabs;

    });

  }, [activeFileId]);

  /* ==========================================
      SWITCH TAB
  ========================================== */

  const switchTab = useCallback((fileId) => {

    setActiveFileId(fileId);

  }, []);

  /* ==========================================
      CHECK TAB
  ========================================== */

  const isTabOpen = useCallback((fileId) => {

    return openTabs.some(
      (tab) => tab.id === fileId
    );

  }, [openTabs]);
    /* ==========================================
      CONTEXT VALUE
  ========================================== */

  const value = useMemo(
    () => ({
      // State
      openTabs,
      activeFileId,

      // Setters
      setOpenTabs,
      setActiveFileId,

      // Actions
      openTab,
      closeTab,
      switchTab,
      isTabOpen,
    }),
    [
      openTabs,
      activeFileId,
      openTab,
      closeTab,
      switchTab,
      isTabOpen,
    ]
  );

  /* ==========================================
      PROVIDER
  ========================================== */

  return (
    <TabContext.Provider value={value}>
      {children}
    </TabContext.Provider>
  );
}

/* ==========================================
    CUSTOM HOOK
========================================== */

export function useTabs() {

  const context = useContext(TabContext);

  if (!context) {
    throw new Error(
      "useTabs must be used inside TabProvider"
    );
  }

  return context;
}