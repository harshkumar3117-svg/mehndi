import { useState, useEffect } from 'react';

const LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Academy', id: 'academy' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-inner">
        <button className="navbar-brand" onClick={() => scrollTo('home')}>
          <span className="brand-name">Riya's</span>
          <span className="brand-sub">Mehndi Studio</span>
        </button>

        <nav className="navbar-links">
          {LINKS.map(l => (
            <button key={l.id} className="nav-link" onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>

        <button className="btn-gold" style={{ padding: '0.55rem 1.4rem', fontSize: '0.82rem' }} onClick={() => scrollTo('contact')}>
          Book Now
        </button>

        <button className="hamburger" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          <span style={{ fontSize: '1.5rem', color: 'var(--cream)' }}>{open ? '✕' : '☰'}</span>
        </button>
      </div>

      <nav className={`mobile-drawer${open ? ' open' : ''}`}>
        {LINKS.map(l => (
          <button key={l.id} className="mobile-link" onClick={() => scrollTo(l.id)}>
            {l.label}
          </button>
        ))}
        <button className="btn-gold" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }} onClick={() => scrollTo('contact')}>
          Book Now
        </button>
      </nav>
    </header>
  );
}
