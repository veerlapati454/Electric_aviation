import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Home.css';
import {
  useInView,
  useReducedMotion,
  useCountUp,
  useTilt,
  useCarouselKeyboard,
} from './Hooks';
import img1 from "../../assets/img1.webp"
import img2 from "../../assets/img2.webp"
import img3 from "../../assets/img3.webp"
import img4 from "../../assets/img4.webp"
import img5 from "../../assets/img5.webp"
import img6 from "../../assets/img6.webp"
import img7 from "../../assets/img7.webp"
import img8 from "../../assets/img8.webp"
import img9 from "../../assets/img9.webp"

// --- Icons (unchanged) ---
const ArrowIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const PlayIcon = () => (
  <svg className="icon-sm" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="rgba(0,168,232,0.2)" />
    <polygon fill="white" points="10,8 16,12 10,16" />
  </svg>
);

const LightningIcon = () => (
  <svg className="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const BatteryIcon = () => (
  <svg className="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="2" y="7" width="16" height="10" rx="1" strokeWidth="1.5" />
    <path d="M22 11v2" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeWidth="1.5" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="icon-feature" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.5" />
  </svg>
);

// Small corner-bracket / HUD frame used as a recurring signature device (unchanged)
const CornerFrame = () => (
  <svg className="corner-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M2 18 L2 2 L18 2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M82 2 L98 2 L98 18" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M98 82 L98 98 L82 98" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 98 L2 98 L2 82" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

// --- New icons used only by the redesigned sections ---
const PlusIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5c0-1.1.9-2 2-2h2.28a1 1 0 01.97.76l.86 3.45a1 1 0 01-.5 1.13l-1.7.85a11.05 11.05 0 005.5 5.5l.85-1.7a1 1 0 011.13-.5l3.45.86a1 1 0 01.76.97V19c0 1.1-.9 2-2 2h-1C7.82 21 3 16.18 3 10.5V5z" />
  </svg>
);

// --- Assets (Two Images for Hero) — unchanged ---
const BG_IMAGE_1 =img2
const BG_IMAGE_2 =img3

// --- Aviation-themed imagery for redesigned sections ---
const IMG_COCKPIT = img4
const IMG_PROPELLER = img5
const IMG_CLOUDS = img6
const IMG_CHARGE = img7
const IMG_RUNWAY = img1;
const IMG_WING = img8
const IMG_AERIAL = img9
const IMG_NIGHTFLIGHT = img9

// --- Spotlight Component (Two Images) ---
// FIXED: no longer uses <canvas> + toDataURL() to build a per-frame PNG mask.
// That approach forced a synchronous, main-thread-blocking image encode on
// every mousemove-driven animation frame (~60x/sec), which is what delayed
// nav-link clicks specifically while on the homepage. Now the spotlight is a
// pure CSS radial-gradient mask, and its position is updated by writing CSS
// custom properties directly to the DOM node via a ref — no React re-render,
// no canvas, no toDataURL, so the main thread stays free for click handling.
const SpotlightReveal = ({ baseImage, revealImage, revealRef }) => (
  <>
    <div className="hero-base-image" style={{ backgroundImage: `url(${baseImage})` }} />
    <div
      ref={revealRef}
      className="hero-reveal-image"
      style={{ backgroundImage: `url(${revealImage})` }}
    />
  </>
);

/* ======================================================================
   SECTION 2 — ABOUT: scroll-revealed mission timeline + tilt visual card
   ====================================================================== */

const AboutStat = ({ value, suffix = '', label, isInView, delay = 0 }) => {
  const count = useCountUp(value, isInView, { duration: 1200 });
  return (
    <div
      className="stat-card glass-card about-reveal"
      style={{ '--reveal-delay': `${delay}ms` }}
      data-revealed={isInView}
    >
      <span className="stat-number" aria-hidden="true">
        {count}{suffix}
      </span>
      <span className="stat-label">{label}</span>
      {/* Real value for assistive tech — avoids announcing intermediate counter frames */}
      <span className="sr-only">{value}{suffix} {label}</span>
    </div>
  );
};

const AboutSection = ({ innerRef }) => {
  const navigate = useNavigate();
  const [revealRef, isInView] = useInView({ threshold: 0.25 });
  const tiltRef = useTilt({ max: 6, scale: 1.03 });

  const timeline = [
    { id: '01', label: 'Zero emissions propulsion', detail: 'Electric drivetrains replace combustion entirely — no fuel burn, no exhaust.' },
    { id: '02', label: 'Revolutionary battery technology', detail: 'High energy-density cells engineered for aviation-grade safety margins.' },
    { id: '03', label: 'Whisper-quiet operation', detail: 'Sub-65dB cruise noise — quiet enough for urban approach corridors.' },
  ];

  return (
    <section className="section about" ref={innerRef}>
      <div className="container">
        <div className="about-grid" ref={revealRef}>
          <div className="about-text">
            <span className="section-tag">Mission Brief</span>
            <h2 className="section-title">
              Redefining the <span className="highlight">Future</span> of Flight
            </h2>
            <p className="section-text">
              Aether is pioneering the next generation of electric aviation technology.
              Our aircraft combine cutting-edge battery systems with advanced aerodynamics
              to create silent, efficient, and sustainable flight.
            </p>

            {/* Timeline reads as a true sequence (engineering milestones), so numbering is meaningful here */}
            <ol className="about-timeline">
              {timeline.map((item, i) => (
                <li
                  key={item.id}
                  className="timeline-item about-reveal"
                  data-revealed={isInView}
                  style={{ '--reveal-delay': `${150 + i * 120}ms` }}
                >
                  <span className="timeline-marker" aria-hidden="true">{item.id}</span>
                  <div className="timeline-body">
                    <strong>{item.label}</strong>
                    <p>{item.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <button className="btn-primary" onClick={() => navigate('/404')}>
              Learn More <ArrowIcon />
            </button>
          </div>

          <div className="about-visual">
            <div
              ref={tiltRef}
              className="about-image-card glass-card tilt-card"
              style={{
                transform:
                  'perspective(900px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale(var(--tilt-scale, 1))',
              }}
            >
              <img
                src={IMG_COCKPIT}
                srcSet={`${IMG_COCKPIT.replace('w=1200', 'w=600')} 600w, ${IMG_COCKPIT} 1200w`}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Pilot's-eye view of the Aether electric aircraft cockpit instrumentation"
                loading="lazy"
                width="1200"
                height="900"
              />
              <CornerFrame />
              <span className="about-image-tag">COCKPIT / 01</span>
            </div>

            <div className="about-stat-stack">
              <AboutStat value={200} suffix="+" label="Flight Hours" isInView={isInView} delay={0} />
              <AboutStat value={100} suffix="%" label="Electric" isInView={isInView} delay={120} />
              <AboutStat value={0} suffix="" label="Emissions" isInView={isInView} delay={240} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



/* ======================================================================
   SECTION 4 — TECHNOLOGY: data-driven SVG radial metrics (replaces the
   purely decorative spinning orbital with one that represents real values)
   ====================================================================== */

const RADIAL_R = 52;
const RADIAL_CIRC = 2 * Math.PI * RADIAL_R;

const RadialMetric = ({ value, max, suffix, label, isInView, delay = 0 }) => {
  const animatedValue = useCountUp(value, isInView, { duration: 1600 });
  const reduced = useReducedMotion();
  const ratio = Math.min(animatedValue / max, 1);
  const offset = RADIAL_CIRC * (1 - ratio);

  return (
    <div
      className="radial-metric about-reveal"
      data-revealed={isInView}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      <svg viewBox="0 0 120 120" className="radial-svg" aria-hidden="true">
        <circle cx="60" cy="60" r={RADIAL_R} className="radial-track" />
        <circle
          cx="60"
          cy="60"
          r={RADIAL_R}
          className="radial-progress"
          strokeDasharray={RADIAL_CIRC}
          strokeDashoffset={reduced ? RADIAL_CIRC * (1 - value / max) : offset}
        />
      </svg>
      <div className="radial-value">
        <span className="metric-value">{Math.round(animatedValue)}{suffix}</span>
        <span className="metric-label">{label}</span>
      </div>
    </div>
  );
};

const TechnologySection = ({ innerRef }) => {
  const navigate = useNavigate();
  const [revealRef, isInView] = useInView({ threshold: 0.3 });
  const metrics = [
    { value: 450, max: 500, suffix: '', label: 'km Range' },
    { value: 30, max: 60, suffix: '', label: 'Min Charge' },
    { value: 95, max: 100, suffix: '%', label: 'Efficiency' },
  ];
  // Plain-text summary for screen readers / no-JS — avoids relying on the animated SVG alone.
  const metricsSummary = metrics.map((m) => `${m.label}: ${m.value}${m.suffix}`).join(', ');

  return (
    <section className="section technology" ref={innerRef}>
      <div className="container">
        <div className="tech-grid" ref={revealRef}>
          <div className="tech-content">
            <span className="section-tag">Performance</span>
            <h2 className="section-title">The <span className="highlight">Science</span> Behind the Silence</h2>

            <div
              className="tech-metrics radial-metrics"
              role="group"
              aria-label="Key performance metrics"
            >
              {metrics.map((m, i) => (
                <RadialMetric key={m.label} {...m} isInView={isInView} delay={i * 150} />
              ))}
            </div>
            {/* Announces final values once, after the count-up settles — not on every frame */}
            <p className="sr-only" aria-live="polite">{isInView ? metricsSummary : ''}</p>

            <p className="section-text">
              Our proprietary battery technology delivers unprecedented energy density
              while maintaining safety and longevity. The result is practical electric
              flight that meets real-world demands.
            </p>
            <button className="btn-primary" onClick={() => navigate('/404')}>
              Discover Technology <ArrowIcon />
            </button>
          </div>

          <div className="tech-visual">
            <div className="tech-image-frame glass-card">
              <img
                src={IMG_RUNWAY}
                alt="Electric aircraft on the runway at dusk"
                loading="lazy"
                width="1200"
                height="900"
              />
              <CornerFrame />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ======================================================================
   SECTION 5 — TESTIMONIALS: accessible scroll-snap carousel
   (native horizontal scroll + dot pagination + keyboard, no JS-only
   dependency; prev/next arrow buttons removed — native scroll/swipe and
   the dot pagination below remain the navigation surface)
   ====================================================================== */

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    role: 'Test Pilot',
    avatar: 'https://i.pravatar.cc/150?img=1',
    quote: 'The silence is surreal. You feel connected to the sky in a way you never could before.',
  },
  {
    name: 'James Rodriguez',
    role: 'Commercial Pilot',
    avatar: 'https://i.pravatar.cc/150?img=2',
    quote: "Incredible range and performance. This isn't the future, it's the present.",
  },
  {
    name: 'Emily Park',
    role: 'Aerospace Engineer',
    avatar: 'https://i.pravatar.cc/150?img=3',
    quote: 'The instant torque and smooth power delivery make every flight effortless.',
  },
];

const TestimonialsSection = ({ innerRef }) => {
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [current, setCurrent] = useState(0);
  const reduced = useReducedMotion();

  const goTo = useCallback((index) => {
    const clamped = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
    const node = slideRefs.current[clamped];
    if (node && trackRef.current) {
      node.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
    setCurrent(clamped);
  }, [reduced]);

  const handleKeyDown = useCarouselKeyboard(TESTIMONIALS.length, current, (updater) => {
    const next = typeof updater === 'function' ? updater(current) : updater;
    goTo(next);
  });

  // Keep `current` in sync if the user scrolls/swipes the track directly.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = Number(entry.target.dataset.index);
            if (!Number.isNaN(idx)) setCurrent(idx);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );

    slideRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section testimonials" ref={innerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Pilot Reports</span>
          <h2 className="section-title">What Our <span className="highlight">Pilots</span> Say</h2>
        </div>

        <div
          className="testimonials-track"
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Pilot testimonials"
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => (slideRefs.current[i] = el)}
              data-index={i}
              className="testimonial glass-card holographic"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${TESTIMONIALS.length}`}
            >
              <div className="testimonial-avatar">
                <img
                  src={t.avatar}
                  alt=""
                  loading="lazy"
                  width="56"
                  height="56"
                />
              </div>
              <div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>

        {/* NOTE: left functional (carousel pagination), not wired to navigate —
            see message accompanying this file for why. */}
        <div className="carousel-dots" role="tablist" aria-label="Select testimonial">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={current === i}
              aria-label={`Show testimonial from ${t.name}`}
              className="carousel-dot"
              data-active={current === i}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {`Showing testimonial ${current + 1} of ${TESTIMONIALS.length}: ${TESTIMONIALS[current].name}`}
        </p>
      </div>
    </section>
  );
};

/* ======================================================================
   SECTION 6 — STATS: full-bleed banner with count-up stat circles
   ====================================================================== */

const StatCircle = ({ value, suffix, progress, label, isInView, delay = 0 }) => {
  const count = useCountUp(value, isInView, { duration: 1500 });
  return (
    <div
      className="stat about-reveal"
      data-revealed={isInView}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      <div className="stat-circle" style={{ '--progress': `${progress}%` }}>
        <span className="stat-number" aria-hidden="true">{count}{suffix}</span>
      </div>
      <span className="stat-label">{label}</span>
      <span className="sr-only">{value}{suffix} {label}</span>
    </div>
  );
};

const StatsSection = ({ innerRef }) => {
  const [revealRef, isInView] = useInView({ threshold: 0.3 });
  const stats = [
    { value: 15, suffix: 'K+', progress: 92, label: 'Flight Hours' },
    { value: 0, suffix: '', progress: 100, label: 'CO₂ Emissions' },
    { value: 200, suffix: '+', progress: 70, label: 'Aircraft Built' },
    { value: 50, suffix: '+', progress: 55, label: 'Countries' },
  ];

  return (
    <section className="section stats" ref={innerRef}>
      <div className="stats-bg">
        <img
          src={IMG_AERIAL}
          srcSet={`${IMG_AERIAL.replace('w=1400', 'w=700')} 700w, ${IMG_AERIAL} 1400w`}
          sizes="100vw"
          alt=""
          loading="lazy"
          width="1400"
          height="900"
        />
        <div className="stats-overlay" />
      </div>
      <div className="container">
        <span className="section-tag stats-tag">By the Numbers</span>
        <div className="stats-grid" ref={revealRef}>
          {stats.map((s, i) => (
            <StatCircle key={s.label} {...s} isInView={isInView} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ======================================================================
   SECTION 7 — CONTACT: form removed. This is now a single centered column
   (info + contact details + image) instead of the old two-column
   info/form grid — see .contact-grid / .contact-info-centered in Home.css.
   Phone number added as a contact-item next to the address.
   ====================================================================== */

const ContactSection = ({ innerRef }) => {
  const navigate = useNavigate();

  return (
    <section className="section contact" ref={innerRef}>
      <div className="container">
        <div className="contact-info contact-info-centered">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-title">Ready to <span className="highlight">Take Off</span>?</h2>
          <p className="section-text">
            Join the revolution in electric aviation. Whether you're an investor,
            pilot, or enthusiast, we'd love to hear from you.
          </p>
          <div className="contact-details contact-details-row">
            <div className="contact-item glass-card neumorphic">
              <span className="contact-emoji" aria-hidden="true">✉</span>
              <div>
                <strong>Email</strong>
                <p>hello@stackly.aviation</p>
              </div>
            </div>
            <div className="contact-item glass-card neumorphic">
              <span className="contact-emoji" aria-hidden="true">📍</span>
              <div>
                <strong>Location</strong>
                <p>Hyderabad, CA</p>
              </div>
            </div>
            <div className="contact-item glass-card neumorphic">
              <PhoneIcon />
              <div>
                <strong>Phone</strong>
                <p>+91 9876543451</p>
              </div>
            </div>
          </div>
          <button className="btn-primary" onClick={() => navigate('/404')}>
            Contact Us <ArrowIcon />
          </button>
          <div className="contact-image-card glass-card">
            <img
              src={IMG_NIGHTFLIGHT}
              srcSet={`${IMG_NIGHTFLIGHT.replace('w=1400', 'w=700')} 700w, ${IMG_NIGHTFLIGHT} 1400w`}
              sizes="(max-width: 768px) 100vw, 60vw"
              alt="Electric aircraft taking off at night"
              loading="lazy"
              width="1400"
              height="788"
            />
            <CornerFrame />
            <span className="about-image-tag">NIGHT OPS / 06</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ======================================================================
   MAIN
   ====================================================================== */

const Home = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  // FIXED: cursor position is no longer pushed through React state on every
  // animation frame. Instead we write directly to the reveal image's CSS
  // custom properties (--x / --y) via a ref. The browser's CSS engine then
  // handles the radial-gradient mask on the compositor, so mousemove no
  // longer triggers 60 re-renders/sec (and no canvas.toDataURL() call at
  // all) — this is what was blocking nav-link clicks on the homepage.
  const revealRef = useRef(null);
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.08;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.08;
      if (revealRef.current) {
        revealRef.current.style.setProperty('--x', `${smooth.current.x}px`);
        revealRef.current.style.setProperty('--y', `${smooth.current.y}px`);
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Scroll tracking — unchanged
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPos / windowHeight);
      setActiveSection(Math.min(index, 6));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* SECTION 1: Hero */}
      <section className="section hero" ref={el => sectionRefs.current[0] = el}>
        <SpotlightReveal
          baseImage={BG_IMAGE_1}
          revealImage={BG_IMAGE_2}
          revealRef={revealRef}
        />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Next-Gen Aviation
          </div>
          <h1 className="hero-title">
            <span className="hero-line1">Power flows</span>
            <span className="hero-line2">through silence</span>
          </h1>
          <p className="hero-text">
            Electric propulsion rewrites the rules of flight—whisper-quiet, emission-free,
            and impossibly efficient. The sky is no longer the limit.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary btn-lg" onClick={() => navigate('/404')}>
              Explore Aircraft <ArrowIcon />
            </button>
            <button className="btn-secondary btn-lg" onClick={() => navigate('/404')}>
              <PlayIcon /> Watch Demo
            </button>
          </div>
        </div>
      </section>

      <AboutSection innerRef={el => sectionRefs.current[1] = el} />
      <TechnologySection innerRef={el => sectionRefs.current[3] = el} />
      <TestimonialsSection innerRef={el => sectionRefs.current[4] = el} />
      <StatsSection innerRef={el => sectionRefs.current[5] = el} />
      <ContactSection innerRef={el => sectionRefs.current[6] = el} />
    </div>
  );
};

export default Home;