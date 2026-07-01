import React, { useEffect } from 'react';
import './Testimonals.css';

const Testimonals = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-testimonial').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Test Pilot',
      avatar: 'https://i.pravatar.cc/150?img=1',
      quote: 'The silence is surreal. You feel connected to the sky in a way you never could before.',
      rating: 5,
      date: 'December 2024'
    },
    {
      name: 'James Rodriguez',
      role: 'Commercial Pilot',
      avatar: 'https://i.pravatar.cc/150?img=2',
      quote: 'Incredible range and performance. This is not the future—it is the present.',
      rating: 5,
      date: 'November 2024'
    },
    {
      name: 'Emily Park',
      role: 'Aerospace Engineer',
      avatar: 'https://i.pravatar.cc/150?img=3',
      quote: 'The instant torque and smooth power delivery make every flight effortless.',
      rating: 5,
      date: 'October 2024'
    },
    {
      name: 'Michael Torres',
      role: 'Fleet Operator',
      avatar: 'https://i.pravatar.cc/150?img=4',
      quote: 'Operating costs are significantly lower. This is the future of regional aviation.',
      rating: 5,
      date: 'September 2024'
    },
    {
      name: 'Dr. Lisa Nakamura',
      role: 'Environmental Scientist',
      avatar: 'https://i.pravatar.cc/150?img=5',
      quote: 'Zero emissions without compromising performance. A true breakthrough.',
      rating: 5,
      date: 'August 2024'
    },
    {
      name: 'David Okafor',
      role: 'Airline Executive',
      avatar: 'https://i.pravatar.cc/150?img=6',
      quote: 'Passenger satisfaction scores are off the charts. Quiet, smooth, and sustainable.',
      rating: 5,
      date: 'July 2024'
    }
  ];

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="testimonials-hero-bg"></div>
        <div className="container">
          <div className="testimonials-hero-content">
            <span className="testimonials-hero-tag">Testimonials</span>
            <h1 className="testimonials-hero-title">
              What Our<br />
              <span className="highlight">Community Says</span>
            </h1>
            <p className="testimonials-hero-text">
              Real feedback from pilots, engineers, and aviation enthusiasts 
              who have experienced the future of flight.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-grid-section">
        <div className="container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="testimonial-card reveal-testimonial"
                style={{ transitionDelay: `${index * 0.08}s` }}
              >
                <div className="testimonial-card-header">
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-meta">
                    <h4>{testimonial.name}</h4>
                    <span className="testimonial-role">{testimonial.role}</span>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {'★'.repeat(testimonial.rating)}
                  {'☆'.repeat(5 - testimonial.rating)}
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-footer">
                  <span className="testimonial-date">{testimonial.date}</span>
                </div>
                <div className="testimonial-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="testimonials-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item reveal-testimonial">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '98%' }}></div></div>
            </div>
            <div className="stat-item reveal-testimonial">
              <div className="stat-number">250+</div>
              <div className="stat-label">Testimonials</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '85%' }}></div></div>
            </div>
            <div className="stat-item reveal-testimonial">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Average Rating</div>
              <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '90%' }}></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="testimonials-featured">
        <div className="container">
          <div className="featured-wrapper reveal-testimonial">
            <div className="featured-content">
              <span className="featured-tag">Featured Testimonial</span>
              <h2>"Truly Revolutionary"</h2>
              <p>
                "The Aether aircraft represents everything we've been working toward 
                in sustainable aviation. It's not just an incremental improvement—it's 
                a complete reimagining of what flight can be."
              </p>
              <div className="featured-author">
                <div className="featured-avatar">
                  <img src="https://i.pravatar.cc/150?img=10" alt="Featured author" />
                </div>
                <div>
                  <strong>Dr. Alan Wright</strong>
                  <span>Former NASA Director of Aeronautics</span>
                </div>
              </div>
            </div>
            <div className="featured-visual">
              <div className="featured-quote-mark">"</div>
              <div className="featured-image">
                <img 
                  src="https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80" 
                  alt="Featured aircraft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonals;