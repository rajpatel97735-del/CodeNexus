import {
  Search,
  Bell,
  Moon,
  Menu,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Topbar({ onNewProject }) {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  return (
    <header className="topbar">

      <div className="topbar-left">

        <button className="menu-btn">
          <Menu size={20} />
        </button>

       <div className="search-box">
  <Search size={18} />

  <input
    type="text"
    placeholder="Search anything..."
  />

  <span className="search-shortcut">
    ⌘ K
  </span>
</div>

      </div>

      <div className="topbar-right">

        <button className="icon-btn">
          <Moon size={20} />
        </button>

      <button className="icon-btn notification-btn">
  <Bell size={20} />
  <span className="notification-dot"></span>
</button>

       <button
  className="new-project-btn"
  onClick={onNewProject}
>
  <Plus size={18} />
  New Project
</button>

        <div className="profile">

          <div className="avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "R"}
          </div>

          <div>

          <div className="profile-name">

  <strong>
    {user?.name || "Raj"}
  </strong>

  <span>▼</span>

</div>

            <p>Premium</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;