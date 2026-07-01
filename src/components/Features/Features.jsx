import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Features.css';
import img15 from "../../assets/img15.webp"
import img16 from "../../assets/img16.webp"
import img17 from "../../assets/img17.webp"
import img18 from "../../assets/img18.webp"
import img19 from "../../assets/img19.webp"
import img20 from "../../assets/img20.webp"


const ArrowIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Features = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-feature').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: '⚡',
      title: 'Instant Torque',
      description: 'Electric motors deliver immediate power response for unparalleled acceleration and smooth flight.',
      image: img15
    },
    {
      icon: '🔋',
      title: 'Advanced Battery',
      description: 'Next-generation solid-state batteries with 450 Wh/kg density for extended range and rapid charging.',
      image: img16
    },
    {
      icon: '🔄',
      title: 'Regenerative Systems',
      description: 'Energy recovery during descent and braking extends range and reduces energy consumption.',
      image: img17
    },
    {
      icon: '🌊',
      title: 'Silent Operation',
      description: 'Whisper-quiet propulsion makes flights peaceful for passengers and communities alike.',
      image: img18
    },
    {
      icon: '🛡️',
      title: 'Redundant Safety',
      description: 'Multiple independent systems ensure fail-safe operation with real-time monitoring and diagnostics.',
      image: img19
    },
    {
      icon: '🌍',
      title: 'Zero Emissions',
      description: '100% electric propulsion eliminates direct CO₂ emissions and reduces environmental impact.',
      image: img20
    }
  ];

  return (
    <div className="features-page">
      {/* Hero Section */}
      <section className="features-hero">
        <div className="features-hero-bg"></div>
        <div className="container">
          <div className="features-hero-content">
            <span className="features-hero-tag">Features</span>
            <h1 className="features-hero-title">
              Engineering the<br />
              <span className="highlight">Future of Flight</span>
            </h1>
            <p className="features-hero-text">
              Every component of our aircraft is designed with precision, 
              innovation, and sustainability in mind.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-grid-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card reveal-feature"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card-image">
                  <img src={feature.image} alt={feature.title} />
                  <div className="feature-card-overlay">
                    <div className="feature-icon">{feature.icon}</div>
                  </div>
                </div>
                <div className="feature-card-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <button className="feature-learn-more" onClick={() => navigate('/404')}>
                    Learn More <ArrowIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="features-demo">
        <div className="container">
          <div className="demo-wrapper">
            <div className="demo-content reveal-feature">
              <span className="section-tag">Interactive Experience</span>
              <h2 className="section-title">
                See the <span className="highlight">Technology</span> in Action
              </h2>
              <p className="section-text">
                Explore our interactive 3D model to understand how each 
                component works together to create the future of flight.
              </p>
              <button className="btn-primary" onClick={() => navigate('/404')}>
                Launch Demo <ArrowIcon />
              </button>
            </div>
            <div className="demo-visual reveal-feature">
              <div className="demo-orbital">
                <div className="demo-orbit orbit-1"></div>
                <div className="demo-orbit orbit-2"></div>
                <div className="demo-orbit orbit-3"></div>
                <div className="demo-core">✈️</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs Section */}
      <section className="features-specs">
        <div className="container">
          <div className="specs-header reveal-feature">
            <span className="section-tag">Technical Specifications</span>
            <h2 className="section-title">
              Built for <span className="highlight">Performance</span>
            </h2>
          </div>
          <div className="specs-grid">
            <div className="spec-item reveal-feature">
              <div className="spec-value">450 km</div>
              <div className="spec-label">Range</div>
              <div className="spec-bar"><div className="spec-bar-fill" style={{ width: '85%' }}></div></div>
            </div>
            <div className="spec-item reveal-feature">
              <div className="spec-value">280 km/h</div>
              <div className="spec-label">Cruise Speed</div>
              <div className="spec-bar"><div className="spec-bar-fill" style={{ width: '75%' }}></div></div>
            </div>
            <div className="spec-item reveal-feature">
              <div className="spec-value">30 min</div>
              <div className="spec-label">Charge Time</div>
              <div className="spec-bar"><div className="spec-bar-fill" style={{ width: '90%' }}></div></div>
            </div>
            <div className="spec-item reveal-feature">
              <div className="spec-value">95%</div>
              <div className="spec-label">Efficiency</div>
              <div className="spec-bar"><div className="spec-bar-fill" style={{ width: '95%' }}></div></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;