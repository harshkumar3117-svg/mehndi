import { useState, useEffect, useRef } from 'react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Rina! I'd like to book your services.%0AName: ${form.name}%0APhone: ${form.phone}%0AService: ${form.service}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/919723728013?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="fade-in-left">
          <span className="section-tag">Get in Touch</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
            Book Your Appointment
          </h2>
          <div className="gold-divider centered" />
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0.75rem auto 0', lineHeight: '1.75' }}>
            Ready to get your dream mehndi? Reach out and we'll create something magical together.
          </p>
        </div>

        <div className="contact-grid">
          <div className="fade-in-left">
            {[
              { icon: '📞', label: 'Call / WhatsApp', value: '+91 9723728013' },
              { icon: '📍', label: 'Location', value: 'Ahmedabad, India (Home & Venue Service Available)' },
              { icon: '⏰', label: 'Working Hours', value: 'Mon – Sun: 9:00 AM – 8:00 PM' },
            ].map(item => (
              <div key={item.label} className="contact-info-card">
                <div className="contact-icon-wrap">
                  <span>{item.icon}</span>
                </div>
                <div>
                  <div className="contact-info-label">{item.label}</div>
                  <div className="contact-info-value">{item.value}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--neumorph-bg)', borderRadius: '14px', boxShadow: '6px 6px 16px var(--neumorph-shadow-dark), -6px -6px 16px var(--neumorph-shadow-light)' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.85rem', color: 'var(--text-mid)', lineHeight: '1.7' }}>
                💡 <strong>Pro Tip:</strong> Book at least 4–6 weeks before your wedding date to secure your preferred slot. For group bookings (10+ people), special rates are available!
              </p>
            </div>
          </div>

          <div className="contact-form fade-in-right">
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--green-dark)', marginBottom: '1.5rem' }}>
              Send Us a Message
            </h3>

            {submitted && (
              <div style={{ padding: '0.75rem 1rem', background: 'rgba(45,90,27,0.1)', border: '1px solid var(--green-mid)', borderRadius: '10px', marginBottom: '1rem', fontFamily: 'Poppins, sans-serif', fontSize: '0.875rem', color: 'var(--green-dark)' }}>
                ✅ Message sent! We'll get back to you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    className="form-input"
                    placeholder="Priya"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone / WhatsApp *</label>
                  <input
                    className="form-input"
                    placeholder="+91 97267 28014"
                    required
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>


              <div className="form-group">
                <label className="form-label">Service Required *</label>
                <select
                  className="form-select"
                  required
                  value={form.service}
                  onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                >
                  <option value="">Select a service...</option>
                  <option>Bridal Mehndi (Full Package)</option>
                  <option>Bridal Mehndi (Hands Only)</option>
                  <option>Sider / Bridesmaid Mehndi</option>
                  <option>Family / Group Mehndi</option>
                  <option>Mehndi Course Enquiry</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message / Date & Venue</label>
                <textarea
                  className="form-textarea"
                  placeholder="Tell us about your event, preferred date, venue, and any specific design requests..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                📱 Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
