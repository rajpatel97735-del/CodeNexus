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

import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit=async(e)=>{

    e.preventDefault();

    setLoading(true);

    setTimeout(()=>{

      setLoading(false);

      navigate("/login");

    },1500);

  };

  return(

<div className="register-page">

<div className="bg-circle one"></div>
<div className="bg-circle two"></div>

<div className="register-container">

{/* LEFT */}

<div className="left-panel">

<img
src="/logo-icon.png"
className="brand-logo"
alt="logo"
/>

<span className="badge">
AI Powered Platform
</span>

<h1>

Join
<br/>

CodeNexus AI

</h1>

<p>

Create your account and start
building websites using
Artificial Intelligence.

</p>

<div className="features">

<div className="feature">

<Sparkles/>

<span>AI Website Generator</span>

</div>

<div className="feature">

<ShieldCheck/>

<span>Smart Code Analysis</span>

</div>

<div className="feature">

<Rocket/>

<span>One Click Deployment</span>

</div>

</div>

</div>

{/* RIGHT */}

<div className="login-card">

<h2>Create Account 🚀</h2>

<p>

Start your journey with
CodeNexus AI.

</p>
<form onSubmit={handleSubmit} className="login-form">

  <div className="input-group">
    <label>Full Name</label>

    <input
      type="text"
      name="name"
      placeholder="Enter your full name"
      value={formData.name}
      onChange={handleChange}
      required
    />
  </div>

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
        placeholder="Create password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button
        type="button"
        className="toggle-password"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
      </button>

    </div>

  </div>

  <div className="input-group">

    <label>Confirm Password</label>

    <div className="password-wrapper">

      <input
        type={showConfirmPassword ? "text" : "password"}
        name="confirmPassword"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <button
        type="button"
        className="toggle-password"
        onClick={() =>
          setShowConfirmPassword(!showConfirmPassword)
        }
      >
        {showConfirmPassword
          ? <EyeOff size={20}/>
          : <Eye size={20}/>}
      </button>

    </div>

  </div>

  {/* Password Strength */}

  <div className="strength-box">

    <div className="strength-bar">
      <div className="strength-fill"></div>
    </div>

    <span>Strong Password</span>

  </div>

  <button
    type="submit"
    className="login-btn"
    disabled={loading}
  >
    {loading ? (
      "Creating Account..."
    ) : (
      <>
        Create Account
        <ArrowRight size={18}/>
      </>
    )}
  </button>

  <p className="signup-text">

    Already have an account?

    <Link to="/login">
      Sign In
    </Link>

  </p>

</form>

</div>

</div>

</div>

);

}

export default Register;