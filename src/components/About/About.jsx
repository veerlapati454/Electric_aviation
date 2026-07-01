import React, { useEffect, useRef } from 'react';
import './About.css';

const ArrowIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const About = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-about').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="about-hero-content">
            <span className="about-hero-tag">About Aether</span>
            <h1 className="about-hero-title">
              Pioneering the<br />
              <span className="highlight">Electric Sky</span>
            </h1>
            <p className="about-hero-text">
              We're redefining aviation through innovation, sustainability, 
              and an unwavering commitment to excellence.
            </p>
          </div>
        </div>
        <div className="about-hero-scroll">
          <span>Scroll to explore</span>
          <div className="scroll-indicator"></div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission" ref={el => sectionRefs.current[0] = el}>
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content reveal-about">
              <span className="section-tag">Our Mission</span>
              <h2 className="section-title">
                Making Electric Flight<br />
                <span className="highlight">Accessible to All</span>
              </h2>
              <p className="section-text">
                We believe that sustainable aviation shouldn't be a luxury. 
                Our mission is to democratize electric flight through 
                innovative technology, scalable manufacturing, and 
                relentless pursuit of efficiency.
              </p>
              <div className="mission-values">
                <div className="value-item">
                  <div className="value-icon">🌱</div>
                  <div>
                    <h4>Sustainability</h4>
                    <p>Zero-emission flight for a cleaner future</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">🔬</div>
                  <div>
                    <h4>Innovation</h4>
                    <p>Pushing the boundaries of what's possible</p>
                  </div>
                </div>
                <div className="value-item">
                  <div className="value-icon">🌍</div>
                  <div>
                    <h4>Accessibility</h4>
                    <p>Making electric flight available to everyone</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mission-visual reveal-about">
              <div className="mission-image-frame">
                <img 
                  src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80" 
                  alt="Electric aircraft in flight"
                />
                <div className="mission-image-overlay"></div>
                <div className="mission-stat">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Aircraft Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team" ref={el => sectionRefs.current[1] = el}>
        <div className="container">
          <div className="team-header reveal-about">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title">
              The Minds Behind<br />
              <span className="highlight">The Revolution</span>
            </h2>
          </div>
          <div className="team-grid">
            <div className="team-card reveal-about">
              <div className="team-card-image">
                <img src="https://i.pravatar.cc/400?img=11" alt="CEO" />
                <div className="team-card-overlay">
                  <div className="team-social">
                    <a href="#">LinkedIn</a>
                    <a href="#">Twitter</a>
                  </div>
                </div>
              </div>
              <div className="team-card-content">
                <h3>Dr. Elena Vogt</h3>
                <span className="team-role">CEO & Co-Founder</span>
                <p>Former NASA engineer with 20+ years in aerospace innovation</p>
              </div>
            </div>
            <div className="team-card reveal-about">
              <div className="team-card-image">
                <img src="https://i.pravatar.cc/400?img=12" alt="CTO" />
                <div className="team-card-overlay">
                  <div className="team-social">
                    <a href="#">LinkedIn</a>
                    <a href="#">Twitter</a>
                  </div>
                </div>
              </div>
              <div className="team-card-content">
                <h3>Marcus Thorne</h3>
                <span className="team-role">CTO</span>
                <p>Battery technology expert with 15 patents in energy storage</p>
              </div>
            </div>
            <div className="team-card reveal-about">
              <div className="team-card-image">
                <img src="https://i.pravatar.cc/400?img=13" alt="COO" />
                <div className="team-card-overlay">
                  <div className="team-social">
                    <a href="#">LinkedIn</a>
                    <a href="#">Twitter</a>
                  </div>
                </div>
              </div>
              <div className="team-card-content">
                <h3>Sarah Chen</h3>
                <span className="team-role">COO</span>
                <p>Operations expert scaling sustainable technology globally</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline" ref={el => sectionRefs.current[2] = el}>
        <div className="container">
          <div className="timeline-header reveal-about">
            <span className="section-tag">Our Journey</span>
            <h2 className="section-title">
              Building the<br />
              <span className="highlight">Future of Flight</span>
            </h2>
          </div>
          <div className="timeline-grid">
            <div className="timeline-item reveal-about">
              <div className="timeline-year">2018</div>
              <div className="timeline-content">
                <h4>Company Founded</h4>
                <p>Started with a vision to revolutionize electric aviation</p>
              </div>
            </div>
            <div className="timeline-item reveal-about">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h4>First Prototype</h4>
                <p>Successful test flight of our first electric aircraft</p>
              </div>
            </div>
            <div className="timeline-item reveal-about">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h4>Certification</h4>
                <p>Received FAA certification for commercial operations</p>
              </div>
            </div>
            <div className="timeline-item reveal-about">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h4>Global Expansion</h4>
                <p>Launched operations in 15 countries worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-wrapper">
            <h2>Ready to Join the<br />Electric Revolution?</h2>
            <p>Be part of the future of sustainable aviation</p>
            <button className="btn-primary">
              Get Started <ArrowIcon />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;