// ElectricAviation404.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const ElectricAviation404 = () => {
  const navigate = useNavigate();

  return (
    <div className="error-wrapper">
      {/* Animated electric grid background */}
      <div className="grid-background" />
      
      {/* Floating energy particles */}
      <div className="particles-container">
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`} />
        ))}
      </div>

      {/* Lightning bolt decoration */}
      <div className="lightning-bolt lightning-1">⚡</div>
      <div className="lightning-bolt lightning-2">⚡</div>

      {/* Main 404 card */}
      <div className="error-card">
        {/* Electric aviation badge */}
        <div className="badge">
          <svg viewBox="0 0 24 24" className="badge-icon">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="12" r="2" fill="#00ccff" stroke="none" />
            <path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
            <path d="M6 8l3 4-3 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <path d="M18 8l-3 4 3 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
          <span>Electric Aviation</span>
          <span className="badge-dot">●</span>
          <span className="badge-status">Active</span>
        </div>

        {/* 404 number with glow */}
        <div className="big-404">404</div>

        {/* Title */}
        <h1 className="title">Flight Path Not Found</h1>

        {/* Sub-message with animated pulse */}
        <div className="sub-message">
          <span className="pulse-dot">⟡</span>
          The electric aircraft you're looking for is off-radar
          <span className="pulse-dot">⟡</span>
        </div>

        <div className="divider" />

        {/* Description */}
        <p className="description">
          This destination doesn't exist in our navigation system. 
          The skies are clear — let's get you back on course.
        </p>

        {/* Action buttons */}
        <div className="button-group">
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Home
          </button>
          
          <button 
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Go Back
          </button>
        </div>

        {/* Footer note */}
        <div className="footer-note">
          <span className="freq-line">◉◉◉◉◉</span>
          <span>⚡ cruising at 35,000 ft • all electric</span>
          <span className="freq-line">◉◉◉◉◉</span>
        </div>
      </div>
    </div>
  );
};

export default ElectricAviation404;