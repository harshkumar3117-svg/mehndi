import { useEffect, useRef } from 'react';

const TESTIMONIALS = [
  {
    text: 'My bridal mehndi was absolutely breathtaking! The figures were exactly like our love story — every detail was perfect. The color lasted so dark for weeks. Anjali is truly an artist!',
    name: 'Riya Sharma',
    role: 'Bride, Delhi',
    initials: 'RS',
  },
  {
    text: 'I had the full bridal treatment — hands and feet both — and it was a dream come true. The design was unique, personal, and so beautiful. My guests couldn\'t stop complimenting!',
    name: 'Priya Mehta',
    role: 'Bride, Noida',
    initials: 'PM',
  },
  {
    text: 'Anjali ma\'am\'s course was life-changing! I learned professional speed, finishing techniques, and client handling in just 30 days. Now I\'m earning from my passion. Highly recommend!',
    name: 'Pooja Yadav',
    role: 'Academy Student',
    initials: 'PY',
  },
  {
    text: 'The Arabic mehndi for my sister\'s wedding was gorgeous! Quick, elegant, and so well done. The entire family got mehndi done and everyone loved their designs.',
    name: 'Sneha Kapoor',
    role: 'Family Client',
    initials: 'SK',
  },
  {
    text: 'Joined the online batch from Mumbai — the live classes were excellent! The kit was premium quality and the certificate helped me start my own mehndi business. Thank you Anjali ma\'am!',
    name: 'Divya Nair',
    role: 'Online Student, Mumbai',
    initials: 'DN',
  },
  {
    text: 'I booked Anjali for my daughter\'s wedding and she exceeded all expectations. She and her team handled 50+ family members beautifully. Professional, punctual, and passionate!',
    name: 'Sunita Agarwal',
    role: 'Happy Mother of Bride',
    initials: 'SA',
  },
];

const Stars = () => (
  <div className="testimonial-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className="star">★</span>
    ))}
  </div>
);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          const cards = e.target.querySelectorAll('.fade-in-up');
          cards.forEach((el, i) => {
            if (e.isIntersecting) {
              setTimeout(() => el.classList.add('visible'), i * 80);
            } else {
              el.classList.remove('visible');
            }
          });
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials-section" id="testimonials" ref={sectionRef}>
      <div className="section-container">
        <div style={{ textAlign: 'center' }} className="fade-in-up">
          <span className="section-tag">What They Say</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
            Client & Student Reviews
          </h2>
          <div className="gold-divider centered" />
          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.95rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0.75rem auto 0', lineHeight: '1.75' }}>
            Real stories from brides who trusted us with their most special day, and students
            who turned their passion into a profession.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testimonial-card fade-in-up delay-${(i % 5) + 1}`}>
              <div className="testimonial-quote-mark">"</div>
              <Stars />
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.initials}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
