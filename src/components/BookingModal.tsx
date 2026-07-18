import { useEffect, useRef, useState } from 'react';

/* ── Types ────────────────────────────────────────────── */
export interface BookingInfo {
  packageName: string;
  /** Full price string, e.g. "₹4,000" or "₹1,800 – ₹2,000" */
  priceStr: string;
  /** Numeric full price in rupees */
  fullPrice: number;
}

interface Props {
  booking: BookingInfo;
  onClose: () => void;
}

/* ── Razorpay window type ─────────────────────────────── */
// TEMPORARILY COMMENTED OUT — Razorpay in test mode, pending live activation
// declare global {
//   interface Window {
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     Razorpay: any;
//   }
// }

/* ── Helpers ──────────────────────────────────────────── */
// TEMPORARILY COMMENTED OUT — Razorpay script loader
// function loadRazorpayScript(): Promise<boolean> {
//   return new Promise(resolve => {
//     if (document.getElementById('razorpay-script')) {
//       resolve(true);
//       return;
//     }
//     const script = document.createElement('script');
//     script.id = 'razorpay-script';
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

/* ── Component ────────────────────────────────────────── */
export default function BookingModal({ booking, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  // const [paying, setPaying] = useState(false); // TEMPORARILY DISABLED — Razorpay
  const [error, setError] = useState('');
  // const [success, setSuccess] = useState(false); // TEMPORARILY DISABLED — Razorpay

  // Payment logic: >₹1000 → 10% advance | ≤₹1000 → full amount
  const isFullPayment = booking.fullPrice <= 1000;
  const payableAmount = isFullPayment
    ? booking.fullPrice
    : Math.ceil(booking.fullPrice * 0.1); // 10% advance

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ── TEMPORARILY DISABLED: Razorpay payment (test mode — pending live activation) ──
  // const handlePay = async () => {
  //   if (!name.trim()) { setError('Please enter your name.'); return; }
  //   if (!/^\d{10}$/.test(phone.trim())) { setError('Please enter a valid 10-digit mobile number.'); return; }
  //   if (!date) { setError('Please select your preferred event date.'); return; }
  //   setError('');
  //   setPaying(true);
  //   const loaded = await loadRazorpayScript();
  //   if (!loaded) {
  //     setError('Failed to load Razorpay. Please check your internet connection.');
  //     setPaying(false);
  //     return;
  //   }
  //   const options = {
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
  //     amount: advanceAmount * 100,
  //     currency: 'INR',
  //     name: 'Rina Mehndi Studio',
  //     description: `Advance Booking – ${booking.packageName}`,
  //     image: '/favicon.ico',
  //     prefill: { name: name.trim(), contact: phone.trim() },
  //     notes: {
  //       package: booking.packageName,
  //       event_date: date,
  //       full_price: `₹${booking.fullPrice.toLocaleString('en-IN')}`,
  //       advance_paid: `₹${advanceAmount.toLocaleString('en-IN')}`,
  //     },
  //     theme: { color: '#c8912a' },
  //     handler: () => { setSuccess(true); setPaying(false); },
  //     modal: { ondismiss: () => setPaying(false) },
  //   };
  //   try {
  //     const rzp = new window.Razorpay(options);
  //     rzp.on('payment.failed', function (response: any) {
  //       setError(response.error.description || 'Payment failed. Please try again.');
  //       setPaying(false);
  //     });
  //     rzp.open();
  //   } catch {
  //     setError('Unable to open payment window. Please try again.');
  //     setPaying(false);
  //   }
  // };

  // ── ACTIVE: Direct WhatsApp booking (until Razorpay goes live) ──
  const handleWhatsAppBooking = () => {
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!/^\d{10}$/.test(phone.trim())) { setError('Please enter a valid 10-digit mobile number.'); return; }
    if (!date) { setError('Please select your preferred event date.'); return; }
    setError('');

    const paymentLabel = isFullPayment
      ? `*Full Payment:* ₹${payableAmount.toLocaleString('en-IN')} (50% refundable)`
      : `*Advance (10%):* ₹${payableAmount.toLocaleString('en-IN')} · *Remaining:* ₹${(booking.fullPrice - payableAmount).toLocaleString('en-IN')} (50% refundable)`;

    const text =
      `Hi Rina! I want to book the *${booking.packageName}*.%0A%0A` +
      `*Name:* ${name.trim()}%0A` +
      `*Phone:* ${phone.trim()}%0A` +
      `*Event Date:* ${date}%0A` +
      `*Total Package Price:* ${booking.priceStr}%0A` +
      `${paymentLabel}%0A%0A` +
      `Please confirm my booking!`;

    window.open(`https://wa.me/919723728013?text=${text}`, '_blank');
    onClose();
  };

  // Minimum date = today
  const todayStr = new Date().toISOString().split('T')[0];

  // TEMPORARILY DISABLED — WhatsApp confirmation after Razorpay payment
  // const sendWhatsAppConfirmation = () => {
  //   const text = `Hi Rina! I just paid an advance of ₹${advanceAmount.toLocaleString('en-IN')} via Razorpay for the *${booking.packageName}*.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Event Date:* ${date}`;
  //   window.open(`https://wa.me/919723728013?text=${text}`, '_blank');
  //   onClose();
  // };

  return (
    <div className="booking-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="booking-modal" role="dialog" aria-modal="true" aria-label="Advance Booking">

        {/* Close */}
        <button className="booking-close" onClick={onClose} aria-label="Close">✕</button>

        {/* TEMPORARILY DISABLED — Razorpay success screen */}
        {/* {success ? (
          <div className="booking-success">
            <div className="booking-success-icon">🎉</div>
            <h3>Payment Successful!</h3>
            <p>Your advance of <strong>₹{advanceAmount.toLocaleString('en-IN')}</strong> for <strong>{booking.packageName}</strong> has been received by Razorpay.</p>
            <p className="booking-success-note" style={{ margin: '1rem 0' }}>📅 Event Date: <strong>{date}</strong></p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Please click below to send us your confirmation details on WhatsApp so we can lock your dates immediately!</p>
            <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#fff', boxShadow: 'none' }} onClick={sendWhatsAppConfirmation}>📱 Send Details on WhatsApp</button>
            <button className="btn-outline" style={{ marginTop: '0.75rem', width: '100%', justifyContent: 'center', color: 'var(--text-muted)', borderColor: 'var(--cream-dark)' }} onClick={onClose}>Maybe Later (Close)</button>
          </div>
        ) : ( */}
        {(
          /* ── Form state ── */
          <>
            <div className="booking-modal-header">
              <span className="booking-modal-tag">{isFullPayment ? 'Full Payment' : 'Advance Booking'}</span>
              <h3 className="booking-modal-title">{booking.packageName}</h3>
              <p className="booking-modal-subtitle">Total Package Price: <strong>{booking.priceStr}</strong></p>
            </div>

            <div className="booking-advance-info">
              <div className="advance-amount-box">
                <p className="advance-label">
                  {isFullPayment ? 'Full Amount to Pay' : 'Advance to Pay (10%)'}
                </p>
                <p className="advance-value">₹{payableAmount.toLocaleString('en-IN')}</p>
              </div>
              {!isFullPayment && (
                <p className="advance-note" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Remaining: ₹{(booking.fullPrice - payableAmount).toLocaleString('en-IN')} (to be paid on event day)
                </p>
              )}
              <p className="advance-note">♻️ 50% Refundable on cancellation</p>
            </div>

            <div className="booking-form">
              <div className="booking-field">
                <label htmlFor="bk-name">Your Name *</label>
                <input
                  id="bk-name"
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={60}
                />
              </div>

              <div className="booking-field">
                <label htmlFor="bk-phone">Mobile Number *</label>
                <input
                  id="bk-phone"
                  type="tel"
                  placeholder="10-digit number"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
              </div>

              <div className="booking-field">
                <label htmlFor="bk-date">Event Date *</label>
                <input
                  id="bk-date"
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>

              {error && <p className="booking-error">{error}</p>}

              {/* TEMPORARILY DISABLED — Razorpay pay button */}
              {/* <button className="btn-gold booking-pay-btn" onClick={handlePay} disabled={paying}>
                {paying ? '⏳ Opening Payment…' : `Pay ₹${advanceAmount.toLocaleString('en-IN')} Now →`}
              </button>
              <p className="booking-secure-note">🔒 Secured by Razorpay · UPI / Card / Net Banking accepted</p> */}

              {/* ACTIVE — WhatsApp booking button */}
              <button
                className="btn-gold booking-pay-btn"
                onClick={handleWhatsAppBooking}
                style={{ background: '#25D366', boxShadow: 'none' }}
              >
                📱 Book via WhatsApp
              </button>

              <p className="booking-secure-note">📩 We will confirm your booking via WhatsApp</p>
            </div>
          </>
        )}
        {/* End of temporarily disabled Razorpay success block */}
      </div>
    </div>
  );
}
