import { useState, useEffect, useRef } from 'react';

const CATEGORIES = ['All', 'Bridal', 'Arabic', 'Figure Work', 'Sider', 'Student Work'];

const IMAGES = [
  { src: '/gallery-bridal-1.webp', cat: 'Bridal', label: 'Bridal Mehndi', wide: false },
  { src: '/gallery-bridal-2.webp', cat: 'Bridal', label: 'Full Arm Bridal', wide: false },
  { src: '/gallery-arabic.webp', cat: 'Arabic', label: 'Arabic Design', wide: false },
  { src: '/gallery-figure-work.webp', cat: 'Figure Work', label: 'Figure Work', wide: true },
  { src: '/gallery-sider.webp', cat: 'Sider', label: 'Sider Mehndi', wide: false },
  { src: '/gallery-student-work.webp', cat: 'Student Work', label: 'Student Work', wide: false },
];

export default function GallerySection() {
  const [active, setActive] = useState('All');
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

  const filtered = active === 'All' ? IMAGES : IMAGES.filter(i => i.cat === active);

  return (
    <section className="gallery-section" id="gallery" ref={sectionRef}>
      <div className="section-container">
        <div className="fade-in-up">
          <span className="section-tag">Our Portfolio</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
            Gallery & Portfolio
          </h2>
          <div className="gold-divider" />
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '500px', marginTop: '0.75rem', lineHeight: '1.75' }}>
            Every design tells a story. Browse through our collection of bridal, arabic,
            and artistic mehndi works.
          </p>
        </div>

        <div className="gallery-filters fade-in-up delay-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn${active === cat ? ' active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="gallery-grid fade-in-up delay-2">
          {filtered.map((img, i) => (
            <div
              key={img.src + i}
              className={`gallery-item ${img.wide ? 'gallery-item-wide' : 'gallery-item-tall'}`}
            >
              <img src={img.src} alt={img.label} loading="lazy" />
              <div className="gallery-overlay">
                <span className="gallery-overlay-tag">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
