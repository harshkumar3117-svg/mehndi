import { useEffect, useRef, useState } from 'react';
import BookingModal, { type BookingInfo } from './BookingModal';

/* ── Price parser ─────────────────────────────────────── */
/**
 * Converts a price string like "₹4,000" or "₹1,800 – ₹2,000" to a number.
 * For ranges, takes the lower bound.
 */
function parsePrice(priceStr: string): number {
  const nums = priceStr.replace(/[₹,]/g, '').split(/[–—-]/).map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
  return nums.length > 0 ? nums[0] : 0;
}

/* ── Data from PDF ────────────────────────────────────────── */

const BRIDAL_PACKAGES = [
  {
    id: 'bridal-1',
    name: 'Package 1',
    price: '₹4,000',
    badge: 'Basic Bridal',
    badgeColor: 'badge-silver',
    features: [
      'Elbow length – both hands (Front & Back)',
      'Ankle length – both legs',
      'Intricate traditional patterns',
      'No figures / portraits',
    ],
    image: '/pdf-images/page_12.jpg',
    popular: false,
  },
  {
    id: 'bridal-2',
    name: 'Package 2',
    price: '₹8,000',
    badge: 'Classic Bridal',
    badgeColor: 'badge-gold',
    features: [
      'Elbow length – both hands (Front & Back)',
      'Ankle length – both legs',
      'Side face Bride & Groom portraits',
      'Elegant floral & paisley patterns',
    ],
    image: '/pdf-images/page_13.jpg',
    popular: true,
  },
  {
    id: 'bridal-3',
    name: 'Package 3',
    price: '₹10,000',
    badge: 'Premium Bridal',
    badgeColor: 'badge-green',
    features: [
      'Elbow length – both hands (Front & Back)',
      'Ankle length – both legs',
      'Ganesha, Hast Melap & Shlok',
      'Studio Logo',
      'Single Figure – Bride & Groom',
    ],
    image: '/pdf-images/page_14.jpg',
    popular: false,
  },
  {
    id: 'bridal-4',
    name: 'Package 4',
    price: '₹15,000',
    badge: 'Royal Bridal',
    badgeColor: 'badge-royal',
    features: [
      'Fully customised designer mehndi',
      'Portraits & Couple Figures',
      'Maximum coverage – hands & legs',
      'Detailed storytelling patterns',
    ],
    image: '/pdf-images/page_15.jpg',
    popular: false,
    extras: [
      { label: 'Single Figure', price: '₹300' },
      { label: 'Couple Figure', price: '₹500' },
      { label: 'Leg (starting from)', price: '₹300' },
    ],
  },
];

const NORMAL_TIERS = [
  {
    id: 'normal-1',
    range: '₹300',
    category: 'Both Hands (Front & Back)',
    desc: 'Simple, neat traditional patterns – ideal for daily wear or small functions.',
    image: '/pdf-images/page_2.jpg',
  },
  {
    id: 'normal-2',
    range: '₹450',
    category: 'Both Hands (Front & Back)',
    desc: 'Medium coverage with floral motifs – perfect for casual occasions.',
    image: '/pdf-images/page_3.jpg',
  },
  {
    id: 'normal-3',
    range: '₹650',
    category: 'Both Hands (Front & Back)',
    desc: 'Extended coverage with fine detailing for festive gatherings.',
    image: '/pdf-images/page_4.jpg',
  },
  {
    id: 'normal-4',
    range: '₹750',
    category: 'Both Hands (Front & Back)',
    desc: 'Rich patterns going above the wrist, ideal for pooja & family events.',
    image: '/pdf-images/page_5.jpg',
  },
  {
    id: 'normal-5',
    range: '₹1,000',
    category: 'Both Hands (Front & Back)',
    desc: 'Dense coverage up to elbow with signature design elements.',
    image: '/pdf-images/page_6.jpg',
  },
  {
    id: 'normal-6',
    range: '₹1,500',
    category: 'Both Hands (Front & Back)',
    desc: 'Full elbow coverage with elegant bridesmaid-style designs.',
    image: '/pdf-images/page_7.jpg',
  },
  {
    id: 'normal-7',
    range: '₹1,800 – ₹2,000',
    category: 'Both Hands (Front & Back)',
    desc: 'Premium full coverage – best for family members of the bride.',
    image: '/pdf-images/page_8.jpg',
  },
];

const ENGAGEMENT_TIERS = [
  {
    id: 'eng-1',
    range: '₹1,500',
    category: 'Engagement Mehndi – Both Hands (Front & Back)',
    desc: 'Graceful engagement patterns with fine motifs for a memorable ring ceremony.',
    image: '/pdf-images/page_9.jpg',
  },
  {
    id: 'eng-2',
    range: '₹2,000',
    category: 'Engagement Mehndi – Both Hands (Front & Back)',
    desc: 'Rich engagement designs with extended coverage and portrait-style accents.',
    image: '/pdf-images/page_10.jpg',
  },
  {
    id: 'eng-3',
    range: '₹2,500',
    category: 'Engagement Mehndi – Both Hands (Front & Back)',
    desc: 'Premium engagement mehndi with full elbow coverage and intricate detailing.',
    image: '/pdf-images/page_11.jpg',
  },
];

const BABY_SHOWER_TIERS = [
  {
    id: 'baby-1',
    range: '₹1,500',
    category: 'Baby Shower – Both Hands (Front & Back)',
    desc: 'Delicate baby shower patterns with auspicious motifs for the mother-to-be.',
    image: '/pdf-images/page_16.jpg',
  },
  {
    id: 'baby-2',
    range: '₹2,000',
    category: 'Baby Shower – Both Hands (Front & Back)',
    desc: 'Extended coverage with charming patterns celebrating new beginnings.',
    image: '/pdf-images/page_17.jpg',
  },
  {
    id: 'baby-3',
    range: '₹3,000',
    category: 'Baby Shower – Both Hands (Front & Back)',
    desc: 'Premium baby shower mehndi with full artistic coverage and custom elements.',
    image: '/pdf-images/page_18.jpg',
  },
];

type Tab = 'bridal' | 'normal' | 'engagement' | 'babyshower';

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>('bridal');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  // key changes on tab switch to force remount → triggers CSS entry animation
  const [tabKey, setTabKey] = useState(0);
  const [booking, setBooking] = useState<BookingInfo | null>(null);

  /** Opens the Razorpay advance booking modal for a given package */
  const openBooking = (packageName: string, priceStr: string) => {
    setBooking({ packageName, priceStr, fullPrice: parsePrice(priceStr) });
  };

  // Only animate the header on scroll-in; cards are always visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          e.target.querySelectorAll('.pricing-header-fade')
            .forEach(el => el.classList.toggle('visible', e.isIntersecting));
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedCard(null);
    setTabKey(k => k + 1); // force remount → re-triggers the CSS entry animation
  };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: 'bridal', label: 'Bridal Mehndi', icon: '👰' },
    { key: 'normal', label: 'Normal & Family', icon: '🌿' },
    { key: 'engagement', label: 'Engagement', icon: '💍' },
    { key: 'babyshower', label: 'Baby Shower', icon: '🍼' },
  ];

  return (
    <section className="pricing-section" id="pricing" ref={sectionRef}>
      {booking && <BookingModal booking={booking} onClose={() => setBooking(null)} />}
      <div className="pricing-bg-pattern" />

      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center' }} className="fade-in-up pricing-header-fade">
          <span className="section-tag">Packages & Pricing</span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
            Our Mehndi Packages
          </h2>
          <div className="gold-divider centered" />
          <p style={{
            fontFamily: 'Poppins, sans-serif', fontSize: '1rem',
            color: 'var(--text-muted)', maxWidth: '540px',
            margin: '0.75rem auto 0', lineHeight: '1.75',
          }}>
            Transparent pricing for every occasion — from simple to royal. All packages
            include professional-grade henna &amp; expert artistry.
          </p>
          <p className="pricing-travel-note">
            &nbsp; 📅 Advance booking &amp; payment compulsory &nbsp;|&nbsp; 💳 Advance payment is non-refundable
          </p>
        </div>

        {/* Tab navigation */}
        <div className="pricing-tabs">
          {tabs.map(t => (
            <button
              key={t.key}
              id={`pricing-tab-${t.key}`}
              className={`pricing-tab${activeTab === t.key ? ' active' : ''}`}
              onClick={() => handleTabChange(t.key)}
            >
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* ── BRIDAL PACKAGES ── */}
        {activeTab === 'bridal' && (
          <div key={tabKey} className="tab-content-enter">
            <div className="bridal-packages-grid">
              {BRIDAL_PACKAGES.map((pkg, i) => (
                <div
                  key={pkg.id}
                  id={pkg.id}
                  className={`bridal-card card-stagger-${i + 1}${pkg.popular ? ' bridal-card--popular' : ''}${selectedCard === pkg.id ? ' bridal-card--expanded' : ''}`}
                  onClick={() => setSelectedCard(selectedCard === pkg.id ? null : pkg.id)}
                >
                  {pkg.popular && <div className="popular-ribbon">Most Popular</div>}
                  <div className="bridal-card-img-wrap">
                    <img src={pkg.image} alt={`${pkg.name} mehndi design`} />
                    <div className="bridal-card-img-overlay" />
                    <span className={`bridal-badge ${pkg.badgeColor}`}>{pkg.badge}</span>
                  </div>
                  <div className="bridal-card-body">
                    <div className="bridal-card-top">
                      <h3 className="bridal-pkg-name">{pkg.name}</h3>
                      <span className="bridal-price">{pkg.price}</span>
                    </div>
                    <ul className="bridal-features">
                      {pkg.features.map((f, fi) => (
                        <li key={fi} className="bridal-feature-item">
                          <span className="feature-check">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    {pkg.extras && (
                      <div className="bridal-extras">
                        <p className="extras-title">Add-on Extras:</p>
                        <div className="extras-grid">
                          {pkg.extras.map((ex, ei) => (
                            <div key={ei} className="extra-item">
                              <span className="extra-label">{ex.label}</span>
                              <span className="extra-price">{ex.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <button
                      className="btn-gold"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                      onClick={e => { e.stopPropagation(); openBooking(`${pkg.name} – ${pkg.badge}`, pkg.price); }}
                    >
                      Book This Package →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── NORMAL / FAMILY PACKAGES ── */}
        {activeTab === 'normal' && (
          <div key={tabKey} className="tab-content-enter">

            <div className="normal-tiers-grid">
              {NORMAL_TIERS.map((tier, i) => (
                <div key={tier.id} id={tier.id} className={`normal-tier-card card-stagger-${(i % 4) + 1}`}>
                  <div className="normal-tier-img">
                    <img src={tier.image} alt={`Mehndi design at ${tier.range}`} />
                    <div className="normal-tier-price-tag">{tier.range}</div>
                  </div>
                  <div className="normal-tier-body">
                    <p className="normal-tier-category">{tier.category}</p>
                    <p className="normal-tier-desc">{tier.desc}</p>
                    <button
                      className="btn-green"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', fontSize: '0.8rem' }}
                      onClick={() => openBooking(tier.category, tier.range)}
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ENGAGEMENT PACKAGES ── */}
        {activeTab === 'engagement' && (
          <div key={tabKey} className="tab-content-enter">

            <div className="normal-tiers-grid normal-tiers-grid--3col">
              {ENGAGEMENT_TIERS.map((tier, i) => (
                <div key={tier.id} id={tier.id} className={`normal-tier-card card-stagger-${i + 1}`}>
                  <div className="normal-tier-img">
                    <img src={tier.image} alt={`Engagement mehndi at ${tier.range}`} />
                    <div className="normal-tier-price-tag">{tier.range}</div>
                  </div>
                  <div className="normal-tier-body">
                    <p className="normal-tier-category">{tier.category}</p>
                    <p className="normal-tier-desc">{tier.desc}</p>
                    <button
                      className="btn-green"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', fontSize: '0.8rem' }}
                      onClick={() => openBooking(tier.category, tier.range)}
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BABY SHOWER PACKAGES ── */}
        {activeTab === 'babyshower' && (
          <div key={tabKey} className="tab-content-enter">

            <div className="normal-tiers-grid normal-tiers-grid--3col">
              {BABY_SHOWER_TIERS.map((tier, i) => (
                <div key={tier.id} id={tier.id} className={`normal-tier-card card-stagger-${i + 1}`}>
                  <div className="normal-tier-img">
                    <img src={tier.image} alt={`Baby shower mehndi at ${tier.range}`} />
                    <div className="normal-tier-price-tag">{tier.range}</div>
                  </div>
                  <div className="normal-tier-body">
                    <p className="normal-tier-category">{tier.category}</p>
                    <p className="normal-tier-desc">{tier.desc}</p>
                    <button
                      className="btn-green"
                      style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', fontSize: '0.8rem' }}
                      onClick={() => openBooking(tier.category, tier.range)}
                    >
                      Book Now →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA bottom */}
        <div className="pricing-cta-bar">
          <div>
            <p className="pricing-cta-text">Not sure which package is right for you?</p>
            <p className="pricing-cta-sub">WhatsApp us and we'll help you choose the perfect design!</p>
          </div>
          <a
            href="https://wa.me/919723728013?text=Hello%20Rina%20Mehndi%20Studio%2C%20I%20want%20to%20know%20more%20about%20your%20packages"
            target="_blank" rel="noopener noreferrer"
            className="btn-gold"
          >
            💬 Chat on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}
