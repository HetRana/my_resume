# Het D. Rana — Developer Portfolio

A modern, responsive, high-performance personal portfolio built for **Het D. Rana** (BCA Student & Aspiring Web Developer). Engineered with pure semantic HTML5, modern vanilla CSS with custom properties (CSS variables), and vanilla JavaScript.

---

## ✨ Features

### 1. 🌌 Unified Signature Color Theme
- **Electric Indigo & Violet on Obsidian Glassmorphism**:
  - Linear / Vercel style dark-mode aesthetics.
  - Deep midnight obsidian background (`#08090f`).
  - Specular Apple-grade edge highlights (`inset 0 1px 0 0 rgba(255, 255, 255, 0.08)`).
  - Ambient glowing orbs and trailing cursor aura.

### 2. ⚡ Tactile Interactivity & Micro-Interactions
- **Typewriter Header Effect**: Alternates through roles (*BCA Student @ VNSGU*, *Aspiring Web Developer*, *Frontend & UI Explorer*, *Passionate Tech Learner*).
- **Interactive 3D Profile Card Tilt**: Responds in real-time to cursor coordinates with perspective depth.
- **Ambient Cursor Aura**: Smooth lag-damped glow trailing the pointer.
- **Live Surat IST Clock**: Real-time ticking clock for Surat, Gujarat with live availability status (*Available Now* or *Next Available at 2 PM*).
- **Interactive Cinema Seat Map Simulator**: Tap any seat on the Movie project card to select/deselect seats with real-time ticket counting and price calculation.
- **Interactive 3D Spatial Interior Studio**: Switch between Living Suite, Master Bed, and Kitchen layouts with real-time Three.js spatial coordinates HUD, pricing estimates, and PDF docket preview.
- **Featured Projects Showcase**:
  - **Creative Touch Interiors**: Enterprise 3D spatial & architecture platform (PHP 8.x, MySQL, Three.js, GSAP, RBAC Auth) co-developed by Het D. Rana & Harsh Chotaliya.
  - **Online Movie Ticket Booking System**: Full-stack cinema ticketing concept with interactive seat map.
  - **TaskPulse**: Vanilla JS Kanban workflow board with LocalStorage persistence.
  - **WeatherScope**: Real-time atmospheric API dashboard.
- **Live Skills Search & Category Filter**: Instant search input plus category tabs (*All*, *Frontend*, *Backend & DB*, *Tools*, *Soft*).
- **Contact Form Preset Inquiry Chips**: One-tap template chips (`💼 Internship`, `🚀 Project Collaboration`, `💬 Say Hello`) with a live `0 / 600` character counter.
- **One-Click Clipboard Copying**: Instant copy for Email (`hetrana00099@gmail.com`) and Phone (`+91 81558 71040`) with toast alerts.
- **WhatsApp Direct Connect**: Instant pre-filled chat link to connect with Het directly on WhatsApp.
- **Interactive Project Modal (`<dialog>`)**: Deep-dive into architecture, features, and source code.
- **Floating Back to Top**: Smooth scroll button appearing upon navigation.

### 3. 📱 Responsive & Accessible Design
- Fully fluid layout using CSS `clamp()`, Flexbox, and CSS Grid.
- Mobile navigation drawer with smooth animations and touch targets.
- Keyboard navigation compliant (`:focus-visible` outlines, skip-to-content link, `aria-*` tags).
- High-contrast text and dark-mode glassmorphic cards.

### 4. 🔍 SEO & Meta Optimization
- Open Graph and Twitter Card tags.
- JSON-LD structured data (`schema.org/Person`).
- Custom SVG favicon with Het monogram.

---

## 📂 Project Structure

```text
het-rana-portfolio/
├── assets/
│   ├── favicon.svg          # Electric Indigo monogram favicon
│   └── profile.jpg          # High-resolution profile portrait
├── index.html               # Semantic HTML5 structure & SEO tags
├── style.css                # Modular CSS design system & tokens
├── script.js                # Interactive logic & animations
├── resume.pdf               # Downloadable resume PDF
└── README.md                # Documentation & customization guide
```

---

## 🚀 How to Run Locally

### Option 1: Direct File
Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.
