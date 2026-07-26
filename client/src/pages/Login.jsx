import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  Rocket,
  ArrowRight,
} from "lucide-react";

import "./Login.css";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(formData);

      login(res.data.user, res.data.token);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* Background */}

      <div className="bg-circle one"></div>
      <div className="bg-circle two"></div>

      <div className="login-container">

        {/* LEFT */}

        <div className="left-panel">

          <img
            src="/logo-icon.png"
            alt="CodeNexus AI"
            className="brand-logo"
          />

          <span className="badge">
            AI Powered Platform
          </span>

          <h1>
            Build Websites
            <br />
            with AI.
          </h1>

          <p>
            Generate beautiful websites, write
            production-ready code and deploy
            instantly using CodeNexus AI.
          </p>

          <div className="features">

            <div className="feature">

              <Sparkles />

              <span>AI Website Generator</span>

            </div>

            <div className="feature">

              <ShieldCheck />

              <span>Smart Code Analysis</span>

            </div>

            <div className="feature">

              <Rocket />

              <span>One Click Deployment</span>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="login-card">

          <h2>Welcome Back 👋</h2>

          <p>
            Sign in to continue building amazing
            AI powered projects.
          </p>
          <form onSubmit={handleSubmit} className="login-form">

  <div className="input-group">

    <label>Email Address</label>

    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
      required
    />

  </div>

  <div className="input-group">

    <label>Password</label>

    <div className="password-wrapper">

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button
        type="button"
        className="toggle-password"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>

    </div>

  </div>

  <div className="form-options">

    <label className="remember">

      <input type="checkbox" />

      Remember me

    </label>

    <Link to="/forgot-password">
      Forgot Password?
    </Link>

  </div>

  <button
    type="submit"
    className="login-btn"
    disabled={loading}
  >
    {loading ? (
  <>
    <span className="loader"></span>
    Signing In...
  </>
) : (
  <>
    Sign In
    <ArrowRight size={18} />
  </>
)}
  </button>

  <div className="divider">
    <span>OR</span>
  </div>

  <button
    type="button"
    className="google-btn"
  >
    Continue with Google
  </button>

  <p className="signup-text">

    Don't have an account?

    <Link to="/register">
      Create Account
    </Link>

  </p>

</form>

</div>

</div>

</div>
);
}

export default Login;