import { Search, Bell, Moon } from "lucide-react";

function Topbar() {
  return (
    <header className="topbar">

      <div className="search-box">
        <Search size={18} />
        <input type="text" placeholder="Search Projects..." />
      </div>

      <div className="topbar-right">
        <Bell size={22} />
        <Moon size={22} />

        <div className="profile">
          👤 Raj
        </div>
      </div>

    </header>
  );
}

export default Topbar;