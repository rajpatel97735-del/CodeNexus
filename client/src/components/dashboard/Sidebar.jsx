import {
  LayoutDashboard,
  Code2,
  Bot,
  FolderOpen,
  LayoutTemplate,
  FileCode2,
  GraduationCap,
  BarChart3,
  Settings,
  CreditCard,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  {
    title: "Code Editor",
    icon: <Code2 size={20} />,
    path: "/editor",
  },
 {
  title: "AI Studio",
  icon: <Bot size={20} />,
  path: "/ai-studio",
},
  {
    title: "Projects",
    icon: <FolderOpen size={20} />,
    path: "/projects",
  },
  {
    title: "Templates",
    icon: <LayoutTemplate size={20} />,
    path: "/templates",
  },
  {
    title: "Snippets",
    icon: <FileCode2 size={20} />,
    path: "/snippets",
  },
  {
    title: "Learn",
    icon: <GraduationCap size={20} />,
    path: "/learn",
  },
  {
    title: "Analytics",
    icon: <BarChart3 size={20} />,
    path: "/analytics",
  },
];

export default function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
   <div
  className="sidebar-logo"
  style={{
    transition: ".35s",
    cursor: "pointer",
  }}
>
  <div className="brand">
<div className="brand-icon">
<img
  src="/logo-icon.png"
  alt="CodeNexus AI"
  className="brand-logo"
/>
  
<img
  src="/logo-icon.png"
  alt="CodeNexus"
  className="brand-logo"
/>
</div>

    <div className="brand-text">
     <h2
  style={{
    margin: 0,
    fontSize: "30px",
    fontWeight: "800",
    letterSpacing: "-1px",
  
  }}
><span
  style={{
    background:
      "linear-gradient(90deg,#ffffff,#93c5fd,#8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  }}
>
  CodeNexus
</span>
</h2>

<div
  style={{
    marginTop: "4px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
<div className="premium-badge">
  ✨ PRO
</div>
  <span
    style={{
     color:"#cbd5e1",
      fontSize: "10px",
      fontWeight: "600",
      letterSpacing: "3px",
    }}
  >
    AI WEBSITE BUILDER
  </span>
</div>
    </div>
  </div>
</div>

      <div className="sidebar-menu">
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>
      

      <div className="sidebar-footer">
        <NavLink to="/settings" className="menu-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>

        <NavLink to="/billing" className="menu-item">
          <CreditCard size={20} />
          <span>Billing</span>
        </NavLink>

        <button className="menu-item logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
      <div className="developer-card">

<div className="developer-avatar">

  RP

  <span className="online-dot"></span>

</div>

  <div className="developer-info">

<div className="developer-name">

  <h4>Raj Patel</h4>

  <span className="verified-badge">✔</span>

</div>

    <p>Founder & Developer</p>

    <span>CodeNexus AI</span>

  </div>

</div>
    </aside>
  );
}