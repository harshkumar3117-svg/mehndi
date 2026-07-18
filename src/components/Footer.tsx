const QUICK_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'About Me', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Pricing', id: 'pricing' },
  { label: 'Academy', id: 'academy' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact Us', id: 'contact' },
];

const SERVICES = [
  'Bridal Mehndi',
  'Normal & Family Mehndi',
  'Engagement Mehndi',
  'Baby Shower Mehndi',
  'Arabic Designs',
  'Figure Work',
  'Mehndi Courses',
];

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-grid">
          <div>
            <span className="footer-brand-name">Rina's Mehndi</span>
            <p className="footer-brand-desc">
              Premium Bridal Mehndi Services & Certified Mehndi Academy. Creating timeless art
              through the ancient tradition of henna since 2018. Based in Ahmedabad, serving across India.
            </p>
            <div className="footer-social">
              {[
                { icon: '📸', label: 'Instagram', href: 'https://www.instagram.com/jkmehndistudio?igsh=emlyNzFhNWs4cTU2&utm_source=qr' },
                { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/919723728013' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              {QUICK_LINKS.map(l => (
                <li key={l.id}>
                  <button className="footer-link" onClick={() => scrollTo(l.id)}>{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              {SERVICES.map(s => (
                <li key={s}>
                  <button className="footer-link" onClick={() => scrollTo('services')}>{s}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            {[
              { icon: '📞', text: '+91 97237 28013' },
              { icon: '📍', text: 'Ahmedabad, India' },
              { icon: '⏰', text: 'Mon–Sun: 9AM – 8PM' },
            ].map(c => (
              <div key={c.text} className="footer-contact-row">
                <span className="footer-contact-icon">{c.icon}</span>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Rina's Mehndi Studio & Academy. All Rights Reserved.</p>
          <p className="footer-copy">Crafted with ♥ for the love of henna art</p>
        </div>
      </div>
    </footer>
  );
}
