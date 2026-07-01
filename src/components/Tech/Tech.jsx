import React, { useEffect } from 'react';
import './Tech.css';

const ArrowIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Tech = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-tech').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const technologies = [
    {
      name: 'Battery Technology',
      icon: '🔋',
      description: 'Advanced solid-state cells with 450 Wh/kg energy density',
      specs: ['450 Wh/kg', '30 min charge', '2000+ cycles'],
      image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80'
    },
    {
      name: 'Propulsion System',
      icon: '⚡',
      description: 'Dual-coil axial flux motor with 300 kW peak power',
      specs: ['300 kW', '95% efficiency', 'Direct drive'],
      image: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=600&q=80'
    },
    {
      name: 'Aerodynamics',
      icon: '🛩️',
      description: 'Optimized carbon-fiber airframe for maximum efficiency',
      specs: ['Drag coefficient 0.02', 'Carbon-fiber', '6 passengers'],
      image: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=600&q=80'
    },
    {
      name: 'Avionics',
      icon: '📡',
      description: 'Integrated flight control system with real-time AI assistance',
      specs: ['AI-powered', 'Real-time monitoring', 'Redundant systems'],
      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80'
    }
  ];

  return (
    <div className="tech-page">
      {/* Hero Section */}
      <section className="tech-hero">
        <div className="tech-hero-bg"></div>
        <div className="container">
          <div className="tech-hero-content">
            <span className="tech-hero-tag">Technology</span>
            <h1 className="tech-hero-title">
              The <span className="highlight">Science</span> of<br />
              Silent Flight
            </h1>
            <p className="tech-hero-text">
              Every system is engineered for maximum performance, 
              efficiency, and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Grid */}
      <section className="tech-grid-section">
        <div className="container">
          <div className="tech-grid">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="tech-card reveal-tech"
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="tech-card-icon">{tech.icon}</div>
                <h3>{tech.name}</h3>
                <p className="tech-card-desc">{tech.description}</p>
                <div className="tech-card-specs">
                  {tech.specs.map((spec, i) => (
                    <span key={i} className="tech-spec">{spec}</span>
                  ))}
                </div>
                <div className="tech-card-image">
                  <img src={tech.image} alt={tech.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Visualization */}
      <section className="tech-visualization">
        <div className="container">
          <div className="viz-wrapper">
            <div className="viz-content reveal-tech">
              <span className="section-tag">Interactive</span>
              <h2 className="section-title">
                Visualizing <span className="highlight">Innovation</span>
              </h2>
              <p className="section-text">
                Explore how our technologies work together to create 
                the future of sustainable aviation.
              </p>
              <button className="btn-primary">
                Explore Now <ArrowIcon />
              </button>
            </div>
            <div className="viz-visual reveal-tech">
              <div className="viz-graph">
                <svg viewBox="0 0 400 200">
                  <polyline 
                    points="0,180 60,140 120,160 180,80 240,120 300,40 360,90 400,50"
                    fill="none" 
                    stroke="#00a8e8" 
                    strokeWidth="3"
                  />
                  <polyline 
                    points="0,180 60,140 120,160 180,80 240,120 300,40 360,90 400,50"
                    fill="none" 
                    stroke="url(#grad)" 
                    strokeWidth="6"
                    strokeDasharray="400"
                    strokeDashoffset="400"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00a8e8" />
                      <stop offset="100%" stopColor="#6c5ce7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="viz-dots">
                  <div className="viz-dot" style={{ left: '15%', bottom: '30%' }}></div>
                  <div className="viz-dot" style={{ left: '45%', bottom: '60%' }}></div>
                  <div className="viz-dot" style={{ left: '75%', bottom: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Stats */}
      <section className="tech-stats">
        <div className="container">
          <div className="stats-header reveal-tech">
            <span className="section-tag">Innovation Metrics</span>
            <h2 className="section-title">
              By the <span className="highlight">Numbers</span>
            </h2>
          </div>
          <div className="stats-grid">
            <div className="stat-card reveal-tech">
              <div className="stat-number">94%</div>
              <div className="stat-label">Energy Efficiency</div>
            </div>
            <div className="stat-card reveal-tech">
              <div className="stat-number">450</div>
              <div className="stat-label">Wh/kg Battery Density</div>
            </div>
            <div className="stat-card reveal-tech">
              <div className="stat-number">300</div>
              <div className="stat-label">kW Peak Power</div>
            </div>
            <div className="stat-card reveal-tech">
              <div className="stat-number">0</div>
              <div className="stat-label">CO₂ Emissions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="tech-roadmap">
        <div className="container">
          <div className="roadmap-header reveal-tech">
            <span className="section-tag">Development Roadmap</span>
            <h2 className="section-title">
              Building the <span className="highlight">Future</span>
            </h2>
          </div>
          <div className="roadmap-grid">
            <div className="roadmap-item reveal-tech">
              <div className="roadmap-icon">🔬</div>
              <div className="roadmap-content">
                <h4>Phase 1: Research</h4>
                <p>Advanced materials and battery chemistry</p>
                <span className="roadmap-status">Complete</span>
              </div>
            </div>
            <div className="roadmap-item reveal-tech">
              <div className="roadmap-icon">⚡</div>
              <div className="roadmap-content">
                <h4>Phase 2: Prototype</h4>
                <p>First flight testing and validation</p>
                <span className="roadmap-status active">In Progress</span>
              </div>
            </div>
            <div className="roadmap-item reveal-tech">
              <div className="roadmap-icon">🛩️</div>
              <div className="roadmap-content">
                <h4>Phase 3: Certification</h4>
                <p>Regulatory approval and production</p>
                <span className="roadmap-status upcoming">Upcoming</span>
              </div>
            </div>
            <div className="roadmap-item reveal-tech">
              <div className="roadmap-icon">🌍</div>
              <div className="roadmap-content">
                <h4>Phase 4: Scaling</h4>
                <p>Global deployment and fleet expansion</p>
                <span className="roadmap-status upcoming">Upcoming</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tech;