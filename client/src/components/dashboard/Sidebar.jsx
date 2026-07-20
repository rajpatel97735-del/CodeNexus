import { LayoutDashboard, FolderOpen, Bot, BarChart3, Settings } from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>🚀 CodeNexus AI</h2>
      </div>

      <nav>
        <a href="#"><LayoutDashboard size={20}/> Dashboard</a>
        <a href="#"><FolderOpen size={20}/> Projects</a>
        <a href="#"><Bot size={20}/> AI Studio</a>
        <a href="#"><BarChart3 size={20}/> Analytics</a>
        <a href="#"><Settings size={20}/> Settings</a>
      </nav>
    </aside>
  );
}

export default Sidebar;