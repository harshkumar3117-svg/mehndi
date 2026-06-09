import { useEffect, useRef } from 'react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          e.target.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right')
            .forEach(el => el.classList.toggle('visible', e.isIntersecting));
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-bg-text">MEHNDI</div>
      <div className="section-container">
        <div className="about-grid">
          <div className="about-image-wrap fade-in-left">
            <div className="about-image-frame">
              <img src="/artist-mehndi.webp" alt="Riya – Mehndi Artist" loading="lazy" />
            </div>
            <div className="about-badge">
              <span className="about-badge-num">8+</span>
              <span className="about-badge-text">Years of Excellence</span>
            </div>
          </div>

          <div className="fade-in-right">
            <span className="section-tag">About the Artist</span>
            <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '0.5rem' }}>
              Crafting Stories in<br />
              <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Henna & Tradition</em>
            </h2>
            <div className="gold-divider" />
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.85', marginTop: '1rem', marginBottom: '1.5rem' }}>
              Hi, I'm <strong style={{ color: 'var(--green-dark)' }}>Riya!</strong> With over 8 years of experience,
              I specialize in creating intricate, custom bridal stories through mehndi. From traditional
              Rajasthani designs to modern minimalist patterns, I bring your dream henna to life with love
              and artistry. I'm also dedicated to helping passionate artists become professionals through
              my Knowledge.
            </p>

            <div className="about-features">
              {[
                { icon: '✦', title: 'Bridal Specialist', desc: 'Customized bridal mehndi with detailed figure work and personal story elements.' },
                { icon: '🎓', title: 'Certified Educator', desc: 'Teaching mehndi professionally — from basic patterns to advanced bridal techniques.' },
                { icon: '🌿', title: 'Organic Henna Only', desc: 'Premium quality natural henna for deep, long-lasting color that\'s safe for all skin types.' },
                { icon: '✈️', title: 'Home & Venue Service', desc: 'Bridal appointments at your home, hotel, or wedding venue across the city.' },
              ].map(f => (
                <div key={f.title} className="about-feature">
                  <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>{f.icon}</span>
                  <p className="about-feature-text">
                    <strong>{f.title}:</strong> {f.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="btn-gold"
              style={{ marginTop: '2rem' }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              ✦ Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
