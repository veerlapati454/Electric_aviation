import { useState } from "react";
import "./Login.css";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/stackly_logo.webp";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isGmail = /^[^\s@]+@gmail\.com$/i.test(email.trim());
    if (!isGmail) {
      setError("Only Gmail addresses are accepted (e.g. name@gmail.com).");
      return;
    }
    // Any password is accepted — no strength/match validation here.
    setError("");

    if (role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }
  };

  return (
    <div className="stage">
      {/* LEFT: INSTRUMENT PANEL — hidden on mobile */}
      <div className="instrument">
        <div
          className="brand"
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
        </div>

        <div className="gauge-wrap">
          <div className="gauge">
            <svg viewBox="0 0 160 160">
              <defs>
                <linearGradient id="chargeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--amber)" />
                  <stop offset="100%" stopColor="var(--electric)" />
                </linearGradient>
              </defs>
              <circle
                className="gauge-track"
                cx="80"
                cy="80"
                r="72"
                strokeDasharray="4 6"
                transform="rotate(-90 80 80)"
              />
              <circle
                className="gauge-fill"
                cx="80"
                cy="80"
                r="72"
                transform="rotate(-90 80 80)"
              />
            </svg>
            <div className="gauge-center">
              <div className="gauge-value">
                86<sup>%</sup>
              </div>
              <div className="gauge-label">BATTERY CHARGE</div>
            </div>
          </div>
        </div>

        <div className="readouts">
          <div className="readout">
            <div className="readout-label">VOLTAGE</div>
            <div className="readout-value">402V</div>
          </div>
          <div className="readout">
            <div className="readout-label">RANGE</div>
            <div className="readout-value">210km</div>
          </div>
          <div className="readout">
            <div className="readout-label">STATUS</div>
            <div className="readout-value">
              <span className="dot"></span>READY
            </div>
          </div>
        </div>

        <div className="status-line">
          <span>SYS/CTRL v4.2</span>
          <span>
            <strong>CLEARED</strong> FOR ACCESS
          </span>
        </div>
      </div>

      {/* RIGHT: LOGIN */}
      <div className="login">
        <div className="login-inner">
          <Link to="/" className="back-home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <img src={logo} alt="Company Logo" className="form-logo" />
          <h1 className="login-title">Welcome back to the fleet</h1>
          <p className="sub">
            Sign in to monitor charge status, plan routes, and manage your electric aircraft.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="email">EMAIL</label>
              <div className="field-input">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@gmail.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="password">PASSWORD</label>
              <div className="field-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-6 0-10-6-10-8a12.9 12.9 0 0 1 3.06-4.94M9.9 4.24A10.6 10.6 0 0 1 12 4c6 0 10 6 10 8a12.86 12.86 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="field">
              <label>ROLE</label>
              <div className="role-toggle" role="radiogroup" aria-label="Select role">
                <button
                  type="button"
                  role="radio"
                  aria-checked={role === "user"}
                  className={role === "user" ? "role-btn active" : "role-btn"}
                  onClick={() => setRole("user")}
                >
                  User
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={role === "admin"}
                  className={role === "admin" ? "role-btn active" : "role-btn"}
                  onClick={() => setRole("admin")}
                >
                  Admin
                </button>
              </div>
            </div>

            <div className="row-between">
              <span></span>
              <Link to="/404" className="link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="engage">
              ENGAGE
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="footer-line">
            New user? <Link to="/register" className="link">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
}