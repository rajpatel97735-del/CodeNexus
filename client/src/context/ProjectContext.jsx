/**
 * ==========================================================
 * CodeNexus AI
 * Project Context
 * ----------------------------------------------------------
 * Handles:
 * • Project Metadata
 * • Save Project
 * • Restore Project
 * • Auto Save
 * • Save Status
 * • Last Saved
 * • Ctrl + S (Future)
 * • Cloud Sync (Future)
 * ----------------------------------------------------------
 * Version : 2.0
 * Status  : Production
 * ==========================================================
 */

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from "react";

import { useFiles } from "./FileContext";
import { useTabs } from "./TabContext";

import {
  saveProject,
  loadProject,
  addRecentProject,
} from "../services/storage.service";

const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {

  /* ==========================================
      FILES
  ========================================== */

  const {
    files,
    setFiles,
  } = useFiles();

  /* ==========================================
      TABS
  ========================================== */

  const {
    openTabs,
    setOpenTabs,
    activeFileId,
    setActiveFileId,
  } = useTabs();

  /* ==========================================
      PROJECT STATE
  ========================================== */

  const [projectId] = useState(() => crypto.randomUUID());

  const [projectName, setProjectName] =
    useState("Untitled Project");

  const [saveStatus, setSaveStatus] =
    useState("Not Saved");

  const [lastSaved, setLastSaved] =
    useState(null);

  const [isRestored, setIsRestored] =
    useState(false);

  /* ==========================================
      SAVE PROJECT
  ========================================== */

  const saveCurrentProject = useCallback(() => {

    const now = new Date().toISOString();

    const project = {

      id: projectId,

      name: projectName,

      files,

      openTabs,

      activeFileId,

      lastSaved: now,

    };

    const success = saveProject(project);

    if (!success) {

      setSaveStatus("Save Failed");

      return;
    }

    addRecentProject({

      id: projectId,

      name: projectName,

      lastSaved: now,

    });

    setSaveStatus("Saved");

    setLastSaved(now);

  }, [
    projectId,
    projectName,
    files,
    openTabs,
    activeFileId,
  ]);
    /* ==========================================
      RESTORE PROJECT
  ========================================== */

  const restoreProject = useCallback(() => {

    const project = loadProject();

    if (!project) {
      setIsRestored(true);
      return;
    }

    if (project.name) {
      setProjectName(project.name);
    }

    if (Array.isArray(project.files)) {
      setFiles(project.files);
    }

    if (Array.isArray(project.openTabs)) {
      setOpenTabs(project.openTabs);
    }

    if (project.activeFileId) {
      setActiveFileId(project.activeFileId);
    }

    if (project.lastSaved) {
      setLastSaved(project.lastSaved);
    }

    setSaveStatus("Saved");

    setIsRestored(true);

  }, [
    setFiles,
    setOpenTabs,
    setActiveFileId,
  ]);

  /* ==========================================
      INITIAL RESTORE
  ========================================== */

  useEffect(() => {

    restoreProject();

  }, [restoreProject]);

  /* ==========================================
      AUTO SAVE
  ========================================== */

  useEffect(() => {

    if (!isRestored) return;

    setSaveStatus("Saving...");

    const timer = setTimeout(() => {

      saveCurrentProject();

    }, 2000);

    return () => clearTimeout(timer);

  }, [
    files,
    openTabs,
    activeFileId,
    projectName,
    isRestored,
    saveCurrentProject,
  ]);

  /* ==========================================
      RENAME PROJECT
  ========================================== */

  const renameProject = useCallback((name) => {

    if (!name?.trim()) return;

    setProjectName(name.trim());

  }, []);
  /* ==========================================
      CONTEXT VALUE
  ========================================== */

  const value = useMemo(
    () => ({
      // Project
      projectId,
      projectName,
      saveStatus,
      lastSaved,

      // Actions
      setProjectName,
      renameProject,

      saveCurrentProject,
      restoreProject,
    }),
    [
      projectId,
      projectName,
      saveStatus,
      lastSaved,

      renameProject,
      saveCurrentProject,
      restoreProject,
    ]
  );

  /* ==========================================
      PROVIDER
  ========================================== */

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

/* ==========================================
    CUSTOM HOOK
========================================== */

export function useProject() {

  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error(
      "useProject must be used inside ProjectProvider"
    );
  }

  return context;
}