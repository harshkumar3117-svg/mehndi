import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.45}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Trigger hero animations on mount
    const timer = setTimeout(() => {
      contentRef.current?.querySelectorAll('.fade-in-up').forEach(el => {
        el.classList.add('visible');
      });
    }, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero-section" id="home">
      <div
        ref={bgRef}
        className="hero-bg"
        style={{ backgroundImage: 'url(/hero-bridal-mehndi.webp)' }}
      />
      <div className="hero-overlay" />

      <div className="hero-content" ref={contentRef}>
        <div className="hero-eyebrow fade-in-up">
          <span className="hero-eyebrow-line" />
          <span className="hero-eyebrow-text">Premium Bridal Mehndi Art</span>
        </div>

        <h1 className="hero-title fade-in-up delay-1">
          Transforming Traditions<br />
          into <em>Timeless Art</em>
        </h1>

        <p className="hero-subtitle fade-in-up delay-2">
          Professional Bridal Mehndi Services & Certified Mehndi Courses. Creating intricate,
          custom bridal stories through the ancient art of henna.
        </p>

        <div className="hero-buttons fade-in-up delay-3">
          <button className="btn-gold" onClick={() => scrollTo('contact')}>
            ✦ Book Bridal Appointment
          </button>
          <button className="btn-outline" onClick={() => scrollTo('academy')}>
            Explore Our Courses →
          </button>
        </div>

        <div className="hero-stats fade-in-up delay-4">
          {[
            { num: '500+', label: 'Happy Brides' },
            { num: '8+', label: 'Years of Excellence' },
            { num: '100+', label: 'Students Trained' },
            { num: '100%', label: 'Satisfaction Rate' },
          ].map(s => (
            <div key={s.label} className="hero-stat glass">
              <span className="hero-stat-number">{s.num}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <span style={{ fontSize: '1.2rem' }}>↓</span>
      </div>
    </section>
  );
}
