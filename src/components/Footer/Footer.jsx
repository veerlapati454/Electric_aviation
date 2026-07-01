import React from 'react';
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <svg width="28" height="28" viewBox="0 0 256 256" fill="none">
              <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z" fill="#00a8e8" />
              <path d="M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="#00a8e8" opacity="0.6" />
            </svg>
            <span className="brand-name">Aether</span>
            <p>Electric Aviation for a Sustainable Future</p>
          </div>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Careers</a>
            <a href="#">Press Kit</a>
          </div>
          <div className="footer-social">
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">in</a>
            <a href="#" className="social-link">▶</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Aether Aviation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;