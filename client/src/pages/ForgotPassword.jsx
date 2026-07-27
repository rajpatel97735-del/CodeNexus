import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  Sparkles,
  ShieldCheck,
  Rocket,
} from "lucide-react";

import "./Login.css";
import { forgotPassword } from "../services/auth.service";

function ForgotPassword() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await forgotPassword({ email });

      alert(res.data.message);

      localStorage.setItem("resetEmail", email);

      navigate("/reset-password");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to send OTP."
      );
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
            Reset
            <br />
            Password
          </h1>

          <p>
            Enter your registered email.
            We'll send you a secure OTP
            to reset your password.
          </p>

          <div className="features">

            <div className="feature">
              <Sparkles />
              <span>Fast Recovery</span>
            </div>

            <div className="feature">
              <ShieldCheck />
              <span>Secure OTP Verification</span>
            </div>

            <div className="feature">
              <Rocket />
              <span>Back To Coding Quickly</span>
            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="login-card">

          <h2>Forgot Password 🔐</h2>

          <p>
            Enter your registered email
            to receive an OTP.
          </p>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >

            <div className="input-group">

              <label>Email Address</label>

              <div className="password-wrapper">

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />

                <Mail size={20} />

              </div>

            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? (
                "Sending OTP..."
              ) : (
                <>
                  Send OTP
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="signup-text">

              Remember your password?

              <Link to="/login">
                {" "}Sign In
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;