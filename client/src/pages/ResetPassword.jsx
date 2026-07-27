import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Rocket,
} from "lucide-react";

import "./Login.css";
import { resetPassword } from "../services/auth.service";

function ResetPassword() {
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword({
        email,
        otp: formData.otp,
        newPassword: formData.password,
      });

      alert(res.data.message);

      localStorage.removeItem("resetEmail");

      navigate("/login");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Password reset failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

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
            Create
            <br />
            New Password
          </h1>

          <p>
            Verify your OTP and choose a
            strong password to secure your
            CodeNexus account.
          </p>

          <div className="features">

            <div className="feature">
              <Sparkles />
              <span>Secure Recovery</span>
            </div>

            <div className="feature">
              <ShieldCheck />
              <span>OTP Protected</span>
            </div>

            <div className="feature">
              <Rocket />
              <span>Get Back To Coding</span>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="login-card">

          <h2>Reset Password 🔒</h2>

          <p>
            Enter the OTP and your new password.
          </p>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            <div className="input-group">
              <label>OTP</label>

              <input
                type="text"
                name="otp"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">

              <label>New Password</label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? <EyeOff size={20}/>
                    : <Eye size={20}/>}
                </button>

              </div>

            </div>

            <div className="input-group">

              <label>Confirm Password</label>

              <div className="password-wrapper">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
                    ? <EyeOff size={20}/>
                    : <Eye size={20}/>}
                </button>

              </div>

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                "Updating..."
              ) : (
                <>
                  Reset Password
                  <ArrowRight size={18}/>
                </>
              )}
            </button>

            <p className="signup-text">
              Back to
              <Link to="/login">
                {" "}Login
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;