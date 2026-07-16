import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();

  const { dark, toggleTheme } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: dark
          ? "#111827"
          : "#f8fafc",
        color: dark ? "white" : "black",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: dark
          ? "1px solid #374151"
          : "1px solid #ddd",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        🚀 CodeNexus
      </h2>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          to="/dashboard"
          style={{
            color: dark ? "white" : "black",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          🏠 Dashboard
        </Link>

        <span
          style={{
            fontWeight: "bold",
            background: dark
              ? "#374151"
              : "#e5e7eb",
            padding: "8px 15px",
            borderRadius: "20px",
          }}
        >
          👤 {user?.name}
        </span>

        {/* Theme Button */}
        <button
          onClick={toggleTheme}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;