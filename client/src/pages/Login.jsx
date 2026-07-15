import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Sending Login Request...");

    const res = await loginUser(formData);

    console.log("Response:", res.data);

    login(res.data.user, res.data.token);

    console.log("User Saved");

    navigate("/dashboard");

  }catch (err) {
  console.log("FULL ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);
  console.log("MESSAGE:", err.message);
}
};

  return (
    <div
      style={{
        background: "#0f172a",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "380px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          CodeNexus Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account?
          <Link
            to="/register"
            style={{ color: "#38bdf8", marginLeft: "8px" }}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  cursor: "pointer",
};

export default Login;