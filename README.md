# 🌿 Rina's Mehndi Studio & Academy

A modern, fully-responsive single-page website for *Rina's Mehndi Studio & Academy* — a professional bridal mehndi service and training academy based in Ahmedabad, India.

Built with *React 19 + TypeScript + Vite*, styled with *Tailwind CSS v4*, and deployed as a static web app.

---

## 🛠️ Tech Stack

| Tech | Purpose |
|------|
| React |  UI Framework |
| TypeScript |  Type Safety |
| Vite |Build Tool / Dev Server |
| Tailwind CSS | Utility-first Styling |
| Porsche Design System | UI Component Library |

---

## 📦 Project Structure

```
mehndi/
├── public/
│   ├── hero-bridal-mehndi.webp   # Hero background image
│   └── pdf-images/               # Mehndi design images for pricing cards
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PricingSection.tsx    # Tabbed pricing + BookingModal integration
│   │   ├── BookingModal.tsx      # Booking form modal with Razorpay support
│   │   ├── AcademySection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppFloat.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                 # All custom CSS (animations, variables, components)
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd mehndi

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and fill in your values
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_here
```

### Development

```bash
npm run dev
```
Opens at `http://localhost:5173`
---

## 💰 Pricing Overview

### Bridal Mehndi Packages

| Package | Price | Coverage |
|---|---|---|
| Basic Bridal | ₹4,000 | Elbow + Ankle (both sides) |
| Classic Bridal | ₹8,000 | Elbow + Ankle + Portraits |
| Premium Bridal | ₹10,000 | Ganesha, Shlok, Couple Figures |
| Royal Bridal | ₹15,000 | Fully Custom + Maximum Coverage |

### Other Services

- **Normal & Family Mehndi** — ₹300 to ₹2,000 (both hands)
- **Engagement Mehndi** — ₹1,500 to ₹2,500 (both hands)
- **Baby Shower Mehndi** — ₹1,500 to ₹3,000 (both hands)

> 📅 Advance booking & payment compulsory. Advance payment is non-refundable.

---

## 🏫 Academy — Mehndi Masterclass

| Detail | Info |
|---|---|
| Mode | Offline Only |
| Location | Ahmedabad |
| Duration | 30–35 Days |
| Batches | Morning (11AM–1PM) / Afternoon (2PM–4PM) |
| Seats | Only 50 |
| Fee | ~~₹12,000~~ **₹5,999** (50% OFF) |

**Includes:** Government Certificate · Starter Kit · Social Media Tips · Lifetime Mentorship

---

## 📞 Contact

- **WhatsApp / Call:** +91 9723728013
- **Location:** Ahmedabad, India (Home & Venue Service Available)
- **Hours:** Mon – Sun: 9:00 AM – 8:00 PM

 
