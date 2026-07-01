import React, { useEffect } from 'react';
import './Stats.css';

const Stats = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-stats').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      number: '15,000+',
      label: 'Flight Hours',
      description: 'Accumulated flight time across our fleet',
      progress: 85
    },
    {
      number: '200+',
      label: 'Aircraft Built',
      description: 'Manufactured and delivered worldwide',
      progress: 70
    },
    {
      number: '50+',
      label: 'Countries',
      description: 'Global presence and operations',
      progress: 55
    },
    {
      number: '0',
      label: 'CO₂ Emissions',
      description: 'Zero direct emissions during flight',
      progress: 100
    },
    {
      number: '450 km',
      label: 'Max Range',
      description: 'Industry-leading electric range',
      progress: 92
    },
    {
      number: '30 min',
      label: 'Charge Time',
      description: 'Fast-charging capability',
      progress: 88
    }
  ];

  return (
    <div className="stats-page">
      {/* Hero Section */}
      <section className="stats-hero">
        <div className="stats-hero-bg"></div>
        <div className="container">
          <div className="stats-hero-content">
            <span className="stats-hero-tag">Statistics</span>
            <h1 className="stats-hero-title">
              The <span className="highlight">Impact</span> of<br />
              Electric Aviation
            </h1>
            <p className="stats-hero-text">
              Numbers that tell the story of our journey toward 
              sustainable, efficient, and accessible flight.
            </p>
          </div>
        </div>
      </section>

      {/* Main Stats Grid */}
      <section className="stats-grid-section">
        <div className="container">
          <div className="stats-main-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stats-card reveal-stats"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="stats-card-number">{stat.number}</div>
                <div className="stats-card-label">{stat.label}</div>
                <p className="stats-card-desc">{stat.description}</p>
                <div className="stats-card-bar">
                  <div className="stats-card-progress" style={{ width: `${stat.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Stats */}
      <section className="stats-visual">
        <div className="container">
          <div className="visual-wrapper">
            <div className="visual-content reveal-stats">
              <span className="section-tag">Visual Data</span>
              <h2 className="section-title">
                Growth &amp; <span className="highlight">Trajectory</span>
              </h2>
              <p className="section-text">
                Our growth reflects the increasing adoption of electric 
                aviation technology and the trust placed in our solutions.
              </p>
            </div>
            <div className="visual-chart reveal-stats">
              <div className="chart-container">
                <div className="chart-bars">
                  <div className="chart-bar">
                    <div className="chart-bar-fill" style={{ height: '40%' }}>
                      <span className="chart-bar-label">2020</span>
                    </div>
                  </div>
                  <div className="chart-bar">
                    <div className="chart-bar-fill" style={{ height: '60%' }}>
                      <span className="chart-bar-label">2021</span>
                    </div>
                  </div>
                  <div className="chart-bar">
                    <div className="chart-bar-fill" style={{ height: '75%' }}>
                      <span className="chart-bar-label">2022</span>
                    </div>
                  </div>
                  <div className="chart-bar">
                    <div className="chart-bar-fill" style={{ height: '92%' }}>
                      <span className="chart-bar-label">2023</span>
                    </div>
                  </div>
                  <div className="chart-bar">
                    <div className="chart-bar-fill" style={{ height: '100%' }}>
                      <span className="chart-bar-label">2024</span>
                    </div>
                  </div>
                </div>
                <div className="chart-grid">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="stats-milestones">
        <div className="container">
          <div className="milestones-header reveal-stats">
            <span className="section-tag">Milestones</span>
            <h2 className="section-title">
              Key <span className="highlight">Achievements</span>
            </h2>
          </div>
          <div className="milestones-grid">
            <div className="milestone-item reveal-stats">
              <div className="milestone-number">1</div>
              <div className="milestone-content">
                <h4>First Flight</h4>
                <p>Successful maiden voyage of prototype</p>
                <span className="milestone-date">2020</span>
              </div>
            </div>
            <div className="milestone-item reveal-stats">
              <div className="milestone-number">10</div>
              <div className="milestone-content">
                <h4>Fleet Expansion</h4>
                <p>Delivered 10 aircraft to operators</p>
                <span className="milestone-date">2021</span>
              </div>
            </div>
            <div className="milestone-item reveal-stats">
              <div className="milestone-number">100</div>
              <div className="milestone-content">
                <h4>Major Milestone</h4>
                <p>100th aircraft produced</p>
                <span className="milestone-date">2023</span>
              </div>
            </div>
            <div className="milestone-item reveal-stats">
              <div className="milestone-number">200</div>
              <div className="milestone-content">
                <h4>Global Leader</h4>
                <p>200+ aircraft in operation worldwide</p>
                <span className="milestone-date">2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stats;