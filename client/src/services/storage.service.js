// ===============================================
// CodeNexus AI
// Storage Service
// Version : 1.0 (Production)
// ===============================================

const PROJECT_KEY = "codenexus-project";
const RECENT_PROJECTS_KEY = "codenexus-recent-projects";

// ----------------------------
// Save Current Project
// ----------------------------
export function saveProject(project) {
  try {
    localStorage.setItem(
      PROJECT_KEY,
      JSON.stringify(project)
    );

    return true;
  } catch (error) {
    console.error("Save Project Error:", error);
    return false;
  }
}

// ----------------------------
// Load Current Project
// ----------------------------
export function loadProject() {
  try {
    const data = localStorage.getItem(PROJECT_KEY);

    if (!data) return null;

    return JSON.parse(data);
  } catch (error) {
    console.error("Load Project Error:", error);
    return null;
  }
}

// ----------------------------
// Delete Current Project
// ----------------------------
export function deleteProject() {
  try {
    localStorage.removeItem(PROJECT_KEY);

    return true;
  } catch (error) {
    console.error("Delete Project Error:", error);
    return false;
  }
}

// ----------------------------
// Save Recent Project
// ----------------------------
export function addRecentProject(project) {
  try {
    const recent = getRecentProjects();

    const filtered = recent.filter(
      (item) => item.id !== project.id
    );

    filtered.unshift(project);

    localStorage.setItem(
      RECENT_PROJECTS_KEY,
      JSON.stringify(filtered.slice(0, 10))
    );

    return true;
  } catch (error) {
    console.error("Recent Project Error:", error);
    return false;
  }
}

// ----------------------------
// Get Recent Projects
// ----------------------------
export function getRecentProjects() {
  try {
    const data = localStorage.getItem(
      RECENT_PROJECTS_KEY
    );

    if (!data) return [];

    return JSON.parse(data);
  } catch {
    return [];
  }
}

// ----------------------------
// Clear Recent Projects
// ----------------------------
export function clearRecentProjects() {
  localStorage.removeItem(
    RECENT_PROJECTS_KEY
  );
}

// ----------------------------
// Clear Everything
// ----------------------------
export function clearStorage() {
  localStorage.removeItem(PROJECT_KEY);
  localStorage.removeItem(
    RECENT_PROJECTS_KEY
  );
}