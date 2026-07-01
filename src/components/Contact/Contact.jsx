import React, { useEffect, useState } from 'react';
import './Contact.css';

const ArrowIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-contact').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      details: ['hello@aether.aviation', 'support@aether.aviation']
    },
    {
      icon: '📍',
      title: 'Location',
      details: ['San Francisco, CA', 'United States']
    },
    {
      icon: '📞',
      title: 'Phone',
      details: ['+1 (555) 123-4567', 'Mon-Fri 9:00-18:00 PST']
    },
    {
      icon: '🌐',
      title: 'Social',
      details: ['@AetherAviation', 'LinkedIn / Twitter / YouTube']
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-hero-tag">Contact</span>
            <h1 className="contact-hero-title">
              Let's <span className="highlight">Connect</span>
            </h1>
            <p className="contact-hero-text">
              Whether you're an investor, pilot, or aviation enthusiast, 
              we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-main">
        <div className="container">
          <div className="contact-wrapper">
            {/* Contact Form */}
            <div className="contact-form-wrapper reveal-contact">
              <div className="contact-form-header">
                <span className="section-tag">Get in Touch</span>
                <h2 className="section-title">
                  Send Us a <span className="highlight">Message</span>
                </h2>
                <p className="section-text">
                  Fill out the form below and our team will respond within 24 hours.
                </p>
              </div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-input"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary">
                  Send Message <ArrowIcon />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper reveal-contact">
              <div className="contact-info-header">
                <span className="section-tag">Connect</span>
                <h2 className="section-title">
                  Reach Out <span className="highlight">Directly</span>
                </h2>
              </div>
              <div className="contact-info-grid">
                {contactInfo.map((item, index) => (
                  <div key={index} className="contact-info-item">
                    <div className="contact-info-icon">{item.icon}</div>
                    <div className="contact-info-content">
                      <h4>{item.title}</h4>
                      {item.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="contact-cta">
                <p>We're always looking for talented individuals to join our team.</p>
                <button className="btn-secondary">
                  View Careers <ArrowIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map">
        <div className="container">
          <div className="map-wrapper reveal-contact">
            <div className="map-content">
              <span className="section-tag">Location</span>
              <h2 className="section-title">
                Our <span className="highlight">Headquarters</span>
              </h2>
              <p className="section-text">
                Visit our state-of-the-art facility in the heart of San Francisco's 
                innovation district.
              </p>
              <div className="map-address">
                <div className="address-item">
                  <span>📍</span>
                  <div>
                    <strong>Aether Aviation HQ</strong>
                    <p>123 Innovation Way, San Francisco, CA 94105</p>
                  </div>
                </div>
                <div className="address-item">
                  <span>🕐</span>
                  <div>
                    <strong>Hours</strong>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="map-visual">
              <div className="map-placeholder">
                <div className="map-grid"></div>
                <div className="map-pin">
                  <div className="pin-dot"></div>
                  <span>Aether HQ</span>
                </div>
                <div className="map-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta-section">
        <div className="container">
          <div className="cta-wrapper reveal-contact">
            <h2>Ready to Shape the Future of Aviation?</h2>
            <p>Join us in our mission to make electric flight accessible to all.</p>
            <div className="cta-buttons">
              <button className="btn-primary">Get Started <ArrowIcon /></button>
              <button className="btn-secondary">Learn More</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;