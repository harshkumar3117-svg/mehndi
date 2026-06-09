import { useEffect, useRef } from 'react';

const SERVICES = [
  {
    icon: '👰',
    num: '01',
    title: 'Bridal Mehndi Services',
    desc: 'Customized premium intricate designs for your special day. Full hand & arm coverage with figure work, portraits, and your unique love story woven into every pattern.',
    btn: 'View Bridal Packages',
    id: 'contact',
  },
  {
    icon: '💐',
    num: '02',
    title: 'Sider & Family Mehndi',
    desc: 'Beautiful, quick, and elegant designs for bridesmaids, family members, and guests. Stunning patterns that complement the bridal theme perfectly.',
    btn: 'Check Rates',
    id: 'contact',
  },
  {
    icon: '🎓',
    num: '03',
    title: 'Professional Courses',
    desc: 'Learn the art of henna from basic to advanced bridal level. Offline and online batches available with live practice sessions, certificate, and starter kit.',
    btn: 'View Course Details',
    id: 'academy',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          e.target.querySelectorAll('.fade-in-up')
            .forEach(el => el.classList.toggle('visible', e.isIntersecting));
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="section-container">
        <div style={{ textAlign: 'center' }} className="fade-in-up">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
            Our Services
          </h2>
          <div className="gold-divider centered" />
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0.75rem auto 0', lineHeight: '1.75' }}>
            From royal bridal ceremonies to intimate family functions — we cover every occasion
            with artistry and elegance.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={s.num} className={`service-card fade-in-up delay-${i + 1}`}>
              <span className="service-number">{s.num}</span>
              <div className="service-icon-wrap">
                <span style={{ fontSize: '1.75rem' }}>{s.icon}</span>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <button
                className="btn-green"
                style={{ alignSelf: 'flex-start', marginTop: 'auto' }}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
              >
                {s.btn} →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
