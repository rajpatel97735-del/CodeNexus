import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();

  // ======================================
  // Loading State
  // ======================================

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          fontSize: "18px",
          fontWeight: 600,
        }}
      >
        Loading...
      </div>
    );
  }

  // ======================================
  // Not Authenticated
  // ======================================

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ======================================
  // Authorized
  // ======================================

  return children;
}