import { Link } from "react-router-dom";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing-page">

      {/* Background Glow */}
      <div className="bg-glow glow1"></div>
      <div className="bg-glow glow2"></div>

      {/* Navbar */}
      <nav className="navbar">

        <div className="nav-left">

          <img
            src="/logo-icon.png"
            alt="CodeNexus AI"
            className="nav-logo"
          />

          <h2>CodeNexus AI</h2>

        </div>

        <div className="nav-right">

          <Link to="/login" className="nav-login">
            Login
          </Link>

          <Link to="/register" className="nav-btn">
            Get Started
          </Link>

        </div>

      </nav>

      {/* Hero */}

      <section className="hero">

        <div className="hero-left">

          <span className="hero-badge">
            🚀 AI Powered Website Builder
          </span>

          <h1>

            Build Stunning
            <br />

            Websites using AI

          </h1>

          <p>

            Generate beautiful responsive websites,
            smart code, live preview and deployment
            in seconds.

          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-btn"
            >
              Start Building
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
            >
              Live Demo
            </Link>

          </div>

        </div>

        <div className="hero-right">

          <div className="preview-card">

            <div className="preview-header">

              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>

            </div>

            <div className="preview-body">

              <div className="code-line w90"></div>
              <div className="code-line w70"></div>
              <div className="code-line w100"></div>
              <div className="code-line w50"></div>
              <div className="code-line w80"></div>

            </div>

          </div>

        </div>

      </section>
      {/* =======================
    TRUSTED BY
======================= */}

<section className="trusted-section">

  <p>Trusted by developers using modern technologies</p>

  <div className="trusted-grid">

    <span>React</span>

    <span>Node.js</span>

    <span>MongoDB</span>

    <span>Express</span>

    <span>OpenAI</span>

    <span>Vercel</span>

  </div>

</section>

{/* =======================
      STATS
======================= */}

<section className="stats-section">

  <div className="stat-card">

    <h2>10K+</h2>

    <span>Projects Generated</span>

  </div>

  <div className="stat-card">

    <h2>98%</h2>

    <span>User Satisfaction</span>

  </div>

  <div className="stat-card">

    <h2>120+</h2>

    <span>Templates</span>

  </div>

  <div className="stat-card">

    <h2>24/7</h2>

    <span>AI Assistance</span>

  </div>

</section>
{/* =========================
        FEATURES
========================= */}

<section className="features-section">

  <div className="section-title">

    <span>WHY CODENEXUS AI</span>

    <h2>
      Everything You Need to Build
      Modern Websites
    </h2>

    <p>
      From idea to deployment —
      everything happens in one platform.
    </p>

  </div>

  <div className="feature-grid">

    <div className="feature-card">
      <h3>🤖 AI Website Builder</h3>
      <p>
        Generate complete responsive
        websites in seconds.
      </p>
    </div>

    <div className="feature-card">
      <h3>⚡ Live Preview</h3>
      <p>
        Instantly preview every change
        while editing.
      </p>
    </div>

    <div className="feature-card">
      <h3>💻 Smart Code Editor</h3>
      <p>
        Beautiful editor with syntax
        highlighting and AI support.
      </p>
    </div>

    <div className="feature-card">
      <h3>🚀 One Click Deploy</h3>
      <p>
        Deploy directly to production
        with one click.
      </p>
    </div>

    <div className="feature-card">
      <h3>🛡 Secure Authentication</h3>
      <p>
        JWT authentication with protected
        routes and secure APIs.
      </p>
    </div>

    <div className="feature-card">
      <h3>📊 Analytics Dashboard</h3>
      <p>
        Monitor projects, traffic and
        AI usage in real time.
      </p>
    </div>

  </div>

</section>
{/* =========================
        PRICING
========================= */}

<section className="pricing-section">

  <div className="section-title">
    <span>PRICING</span>
    <h2>Simple Pricing</h2>
    <p>Choose the plan that fits your workflow.</p>
  </div>

  <div className="pricing-grid">

    <div className="pricing-card">
      <h3>Free</h3>
      <h1>$0</h1>
      <p>Perfect for beginners.</p>
      <button>Get Started</button>
    </div>

    <div className="pricing-card featured">
      <div className="popular-badge">Most Popular</div>

      <h3>Pro</h3>
      <h1>$19<span>/month</span></h1>

      <p>Unlimited AI generation & deployment.</p>

      <button>Start Pro</button>
    </div>

    <div className="pricing-card">
      <h3>Enterprise</h3>
      <h1>Custom</h1>
      <p>For teams and organizations.</p>
      <button>Contact Sales</button>
    </div>

  </div>

</section>

{/* =========================
      TESTIMONIALS
========================= */}

<section className="testimonial-section">

  <div className="section-title">
    <span>TESTIMONIALS</span>
    <h2>Loved by Developers</h2>
  </div>

  <div className="testimonial-grid">

    <div className="testimonial-card">
      <p>
        "The fastest AI website builder I've used."
      </p>
      <h4>— Alex</h4>
    </div>

    <div className="testimonial-card">
      <p>
        "Amazing UI and excellent AI code generation."
      </p>
      <h4>— Sarah</h4>
    </div>

    <div className="testimonial-card">
      <p>
        "Saved me hours of frontend development."
      </p>
      <h4>— Michael</h4>
    </div>

  </div>

</section>

{/* =========================
         FOOTER
========================= */}

<footer className="footer">

  <img
    src="/logo-icon.png"
    alt="logo"
    className="footer-logo"
  />

  <h2>CodeNexus AI</h2>

  <p>
    Build smarter websites using Artificial Intelligence.
  </p>

  <span>
    © 2026 CodeNexus AI. All Rights Reserved.
  </span>

</footer>

    </div>
  );
}

export default Landing;