import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  verifyOTP,
  resendOTP,
} from "../services/auth.service";

function VerifyOTP() {
  const navigate = useNavigate();

  const email = localStorage.getItem("verifyEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  // ======================================
  // Redirect if email not found
  // ======================================

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email, navigate]);

  // ======================================
  // Verify OTP
  // ======================================

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const res = await verifyOTP({
        email,
        otp,
      });

      alert(res.data.message);

      localStorage.removeItem("verifyEmail");

      navigate("/login");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "OTP Verification Failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================
  // Resend OTP
  // ======================================

  const handleResendOTP = async () => {
    try {
      setResending(true);

      const res = await resendOTP(email);

      alert(res.data.message);

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "80px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2>Email Verification</h2>

      <p>
        Enter the OTP sent to
        <br />
        <strong>{email}</strong>
      </p>

      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter 6 Digit OTP"
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          fontSize: "18px",
          textAlign: "center",
          letterSpacing: "5px",
        }}
      />

      <br />
      <br />

      <button
        onClick={handleVerify}
        disabled={loading}
        style={{
          width: "100%",
          padding: "12px",
          cursor: "pointer",
        }}
      >
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      <br />
      <br />

      <button
        onClick={handleResendOTP}
        disabled={resending}
        style={{
          width: "100%",
          padding: "12px",
          cursor: "pointer",
        }}
      >
        {resending ? "Sending..." : "Resend OTP"}
      </button>
    </div>
  );
}

export default VerifyOTP;