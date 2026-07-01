import { useState } from "react";
import "./Register.css";
import { useNavigate,Link } from "react-router-dom";

// Letters and spaces only (e.g. "Arjun Mehta")
const NAME_REGEX = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
// Letters only, no spaces/numbers/symbols (e.g. "arjunmehta")
const USERNAME_REGEX = /^[A-Za-z]+$/;
// Gmail addresses only
const GMAIL_REGEX = /^[^\s@]+@gmail\.com$/i;

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSocialClick = () => {
    navigate("/404");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!NAME_REGEX.test(fullName.trim())) {
      setError("Full name can only contain letters (e.g. Arjun Mehta).");
      return;
    }

    if (!USERNAME_REGEX.test(username.trim())) {
      setError("Username can only contain letters — no numbers, spaces, or symbols.");
      return;
    }

    if (!GMAIL_REGEX.test(email.trim())) {
      setError("Only Gmail addresses are accepted (e.g. name@gmail.com).");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords do not match.");
      return;
    }

    if (!agreed) {
      setError("Please accept the Terms & Conditions to continue.");
      return;
    }

    setError("");
    navigate("/404");
  };

  return (
    <div className="stage">
      {/* LEFT: INSTRUMENT PANEL — hidden on mobile */}
      <div className="instrument">
        <div className="gauge-wrap">
          <div className="gauge">
            <svg viewBox="0 0 160 160">
              <defs>
                <linearGradient id="chargeGradientReg" x1="0%" y1="0%" x2="100%" y2="100%">
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
                style={{ stroke: "url(#chargeGradientReg)" }}
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
            <strong>ONBOARDING</strong> NEW PILOT
          </span>
        </div>
      </div>

      {/* RIGHT: REGISTER */}
      <div className="login">
        <div className="login-inner">
          <a href="/404" className="back-home">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>

          <div className="eyebrow">PRE-FLIGHT REGISTRATION</div>
          <h1 className="login-title">Join the fleet</h1>
          <p className="sub">
            Create an account to monitor charge status, plan routes, and manage your electric aircraft.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="fullName">FULL NAME</label>
                <div className="field-input">
                 <input
  type="text"
  id="fullName"
  name="fullName"
  placeholder="Arjun Mehta"
  autoComplete="name"
  pattern="[A-Za-z ]+"
  value={fullName}
  onChange={(e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setFullName(value);
  }}
  required
/>
                </div>
              </div>

              <div className="field">
                <label htmlFor="username">USERNAME</label>
                <div className="field-input">
                  <input
  type="text"
  id="username"
  name="username"
  placeholder="arjunmehta"
  autoComplete="username"
  pattern="[A-Za-z]+"
  value={username}
  onChange={(e) => {
    const value = e.target.value.replace(/[^A-Za-z]/g, "");
    setUsername(value);
  }}
  required
/>
                </div>
              </div>
            </div>

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
                  className="has-toggle"
                  placeholder="••••••••••"
                  autoComplete="new-password"
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
              <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
              <div className="field-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="has-toggle"
                  placeholder="••••••••••"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? (
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

            <label className="terms">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setError("");
                }}
              />
              <span className="terms-box"></span>
              <span className="terms-text">
                I accept the <a href="/terms" className="link">Terms &amp; Conditions</a>
              </span>
            </label>

            {error && (
              <p className="error-text" role="alert">
                {error}
              </p>
            )}

            <button type="submit" className="engage">
              REGISTER
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </form>

          <div className="divider">OR SIGN UP WITH</div>

          <div className="social-row">
            <button type="button" className="social-btn" onClick={handleSocialClick}>
              <svg viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.56-5.17 3.56-8.66Z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.07 7.94-2.9l-3.87-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24Z"/>
                <path fill="#FBBC05" d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4-3.1Z"/>
                <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.27 6.61l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z"/>
              </svg>
              Google
            </button>
            <button type="button" className="social-btn" onClick={handleSocialClick}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.53.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.02 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/>
              </svg>
              GitHub
            </button>
            <button type="button" className="social-btn" onClick={handleSocialClick}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.37 1.43c.1 1.02-.28 2.02-.94 2.76-.68.76-1.79 1.35-2.86 1.27-.12-1 .34-2.05.98-2.75.7-.78 1.9-1.35 2.82-1.28Zm2.7 17.06c-.5 1.16-.74 1.68-1.38 2.7-.9 1.43-2.16 3.2-3.73 3.22-1.39.02-1.75-.9-3.64-.89-1.88.01-2.28.9-3.67.89-1.57-.02-2.76-1.62-3.66-3.05C.6 18.4-.1 14.83 1.2 12.4c.72-1.34 2-2.19 3.4-2.21 1.34-.02 2.6.9 3.42.9.82 0 2.35-1.12 3.96-.95.67.03 2.57.27 3.79 2.04-.1.06-2.26 1.32-2.24 3.93.03 3.12 2.74 4.16 2.77 4.18-.02.07-.43 1.48-1.03 2.2Z"/>
              </svg>
              Apple
            </button>
          </div>

          <p className="footer-line">
            Already have an account? <Link to="/login" className="link">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}