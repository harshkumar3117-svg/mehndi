import { useEffect, useRef, useState } from 'react';

export interface BookingInfo {
  packageName: string;
  priceStr: string;
  fullPrice: number;
}

interface Props {
  booking: BookingInfo;
  onClose: () => void;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}
function loadRazorpayScript(): Promise<boolean> {
  return new Promise(resolve => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
export default function BookingModal({ booking, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isFullPayment = booking.fullPrice <= 1000;
  const payableAmount = isFullPayment
    ? booking.fullPrice
    : Math.ceil(booking.fullPrice * 0.1); 

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handlePay = async () => {
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!/^\d{10}$/.test(phone.trim())) { setError('Please enter a valid 10-digit mobile number.'); return; }
    if (!date) { setError('Please select your preferred event date.'); return; }
    setError('');
    setPaying(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setError('Failed to load Razorpay. Please check your internet connection.');
      setPaying(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID as string,
      amount: payableAmount * 100,
      currency: 'INR',
      name: 'Rina Mehndi Studio',
      description: `Advance Booking – ${booking.packageName}`,
      image: '/favicon.ico',
      prefill: { name: name.trim(), contact: phone.trim() },
      notes: {
        package: booking.packageName,
        event_date: date,
        full_price: `₹${booking.fullPrice.toLocaleString('en-IN')}`,
        advance_paid: `₹${payableAmount.toLocaleString('en-IN')}`,
      },
      theme: { color: '#c8912a' },
      handler: () => { setSuccess(true); setPaying(false); },
      modal: { ondismiss: () => setPaying(false) },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setError(response.error.description || 'Payment failed. Please try again.');
        setPaying(false);
      });
      rzp.open();
    } catch {
      setError('Unable to open payment window. Please try again.');
      setPaying(false);
    }
  };

  // Minimum date = today
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="booking-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="booking-modal" role="dialog" aria-modal="true" aria-label="Advance Booking">

        {/* Close */}
        <button className="booking-close" onClick={onClose} aria-label="Close">✕</button>

        {success ? (
          <div className="booking-success">
            <div className="booking-success-icon">🎉</div>
            <h3>Payment Successful!</h3>
            <p>Your advance of <strong>₹{payableAmount.toLocaleString('en-IN')}</strong> for <strong>{booking.packageName}</strong> has been received.</p>
            <p className="booking-success-note" style={{ margin: '1rem 0' }}>📅 Event Date: <strong>{date}</strong></p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              We will reach out to you at <strong>{phone}</strong> to confirm your booking details!
            </p>
            <button
              className="btn-outline"
              style={{ marginTop: '0.75rem', width: '100%', justifyContent: 'center', color: 'var(--text-muted)', borderColor: 'var(--cream-dark)' }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
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

              <button className="btn-gold booking-pay-btn" onClick={handlePay} disabled={paying}>
                {paying ? '⏳ Opening Payment…' : `Pay ₹${payableAmount.toLocaleString('en-IN')} Now →`}
              </button>
              <p className="booking-secure-note">🔒 Secured by Razorpay · UPI / Card / Net Banking accepted</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
