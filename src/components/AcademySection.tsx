import { useEffect, useRef } from 'react';

const PERKS = [
  { icon: '📜', text: 'Government Recognized Certificate' },
  { icon: '🖐', text: 'Live Practice on Models' },
  { icon: '📦', text: 'Professional Starter Kit Included' },
  { icon: '📱', text: 'Social Media Marketing Tips' },
  { icon: '💼', text: 'Business Setup Guidance' },
  { icon: '♾', text: 'Lifetime Mentorship Support' },
];

export default function AcademySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          e.target.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-up, .masterclass-card')
            .forEach(el => el.classList.toggle('visible', e.isIntersecting));
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/919723728013?text=Hi%20Rina%21%20I%27m%20interested%20in%20the%20Mehndi%20Course%20batch.%20Please%20share%20more%20details.', '_blank');
  };

  return (
    <section className="academy-section" id="academy" ref={sectionRef}>
      <div className="academy-bg-pattern" />
      <div className="section-container">
        <div className="academy-grid">
          {/* Left Column: Intro & Perks */}
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

          {/* Right Column: Masterclass Card */}
          <div className="fade-in-right">
            <div className="masterclass-card">
              <div className="masterclass-header">
                <div className="masterclass-badge">🏫 OFFLINE ONLY</div>
                <h3 className="masterclass-title">
                  Basic to Advanced<br /><span>Mehandi Master Class</span>
                </h3>
              </div>

              <div className="masterclass-info-grid">
                <div className="masterclass-info-item">
                  <span className="mc-icon">📅</span>
                  <div>
                    <p className="mc-label">Starts</p>
                    <p className="mc-value">20th Mar '26</p>
                  </div>
                </div>
                <div className="masterclass-info-item">
                  <span className="mc-icon">⏱️</span>
                  <div>
                    <p className="mc-label">Duration</p>
                    <p className="mc-value">30-35 Days</p>
                  </div>
                </div>
                <div className="masterclass-info-item">
                  <span className="mc-icon">📍</span>
                  <div>
                    <p className="mc-label">Location</p>
                    <p className="mc-value">Ahmedabad</p>
                  </div>
                </div>
                <div className="masterclass-info-item">
                  <span className="mc-icon">👥</span>
                  <div>
                    <p className="mc-label">Seats</p>
                    <p className="mc-value">Only 50</p>
                  </div>
                </div>
              </div>

              <div className="masterclass-batches">
                <div className="mc-batch">
                  <span className="mc-batch-icon">🌅</span>
                  <div>
                    <p className="mc-batch-name">Morning</p>
                    <p className="mc-batch-time">11 AM - 1 PM</p>
                  </div>
                </div>
                <div className="mc-batch">
                  <span className="mc-batch-icon">🌇</span>
                  <div>
                    <p className="mc-batch-name">Afternoon</p>
                    <p className="mc-batch-time">2 PM - 4 PM</p>
                  </div>
                </div>
              </div>

              <div className="masterclass-features-list">
                <div className="mc-feature">✅ Offline material</div>
                <div className="mc-feature">✅ 5+ Yrs Experience</div>
                <div className="mc-feature">✅ Course Certificate</div>
                <div className="mc-feature">✅ Free Material Kit</div>
              </div>

              <div className="masterclass-fees">
                <div className="mc-fee-row">
                  <span className="mc-fee-original">₹12,000</span>
                  <span className="mc-fee-discount-badge">50% OFF</span>
                </div>
                <p className="mc-fee-final">₹5,999/- Only</p>
              </div>

              <button className="btn-gold masterclass-cta" onClick={openWhatsApp}>
                📱 Book Now / Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
