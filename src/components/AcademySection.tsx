import { useEffect, useRef } from 'react';

const PERKS = [
  { icon: '📜', text: 'Government Recognized Certificate' },
  { icon: '🖐', text: 'Live Practice on Models' },
  { icon: '📦', text: 'Professional Starter Kit Included' },
  { icon: '📱', text: 'Social Media Marketing Tips' },
  { icon: '💼', text: 'Business Setup Guidance' },
  { icon: '♾', text: 'Lifetime Mentorship Support' },
];

const FEATURES = [
  'Rajasthani Bridal Designs',
  'Arabic & Indo-Arabic Patterns',
  'Figure Work Mastery',
  'Speed & Finishing Techniques',
  'Client Handling Skills',
  'Portfolio Building',
];

export default function AcademySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          e.target.querySelectorAll('.fade-in-left, .fade-in-right')
            .forEach(el => el.classList.toggle('visible', e.isIntersecting));
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/919723728013?text=Hi%20Riya%21%20I%27m%20interested%20in%20the%20Mehndi%20Course%20batch.%20Please%20share%20more%20details.', '_blank');
  };

  return (
    <section className="academy-section" id="academy" ref={sectionRef}>
      <div className="academy-bg-pattern" />
      <div className="section-container">
        <div className="academy-grid">
          <div className="fade-in-left">
            <span className="section-tag" style={{ color: 'var(--gold-light)' }}>Our Academy</span>
            <h2 className="academy-heading">
              Learn the <span>Art</span> of<br />Henna Professionally
            </h2>
            <p className="academy-desc">
              Join our academy and transform your passion for mehndi into a professional career.
              From complete beginners to experienced artists — our structured curriculum ensures
              you master every technique with confidence.
            </p>
            <div className="academy-perks">
              {PERKS.map(p => (
                <div key={p.text} className="academy-perk">
                  <div className="perk-icon">
                    <span style={{ fontSize: '1rem' }}>{p.icon}</span>
                  </div>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in-right">
            <div className="academy-glass">
              <div className="batch-label">
                <span>🔥</span>
                <span>New Batch Enrolling Now</span>
              </div>
              <h3 className="batch-title">
                Masterclass in Bridal Mehndi<br />
                <span style={{ color: 'var(--gold-light)', fontSize: '0.85em' }}>(Offline + Online Available)</span>
              </h3>

              <div className="batch-features">
                {FEATURES.map(f => (
                  <div key={f} className="batch-feature">
                    <span className="batch-dot" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div className="batch-date">
                <span>📅</span>
                <span>Next Batch Starts: <strong>15th July 2026</strong></span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn-gold" onClick={openWhatsApp}>
                  📱 Enquire on WhatsApp
                </button>
                <button
                  className="btn-outline"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
