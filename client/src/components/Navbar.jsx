import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "linear-gradient(90deg,#2563eb,#1d4ed8)",
        color: "white",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
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
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "17px",
          }}
        >
          🏠 Dashboard
        </Link>

        <span
          style={{
            fontWeight: "bold",
            background: "rgba(255,255,255,0.2)",
            padding: "8px 15px",
            borderRadius: "20px",
          }}
        >
          👤 {user?.name}
        </span>

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            border: "none",
            color: "white",
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