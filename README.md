# Stitch Dropcart — WORKSPACE E-Commerce Store

A full-stack e-commerce application built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. Designed around a **Corporate Modern** aesthetic — a curated workspace experience that treats products as valuable assets rather than a traditional shopping mall.

---

## Live Demo

> Coming soon

---

## Screenshots

| Catalog | Product Detail | Checkout |
|--------|---------------|----------|
| ![Catalog](public/screenshots/catalog.png) | ![Detail](public/screenshots/detail.png) | ![Checkout](public/screenshots/checkout.png) |

---

## Features

### Storefront
- **Product Catalog** — searchable, filterable, sortable product grid with category chips
- **Product Detail** — image gallery, variant picker (color/size), stock indicator, add to cart
- **Cart Sidebar** — persistent slide-in cart with quantity controls, subtotal, and checkout CTA
- **Checkout Flow** — 3-step wizard (Shipping → Payment → Review) with Zod form validation
- **Order Confirmation** — success screen with personalized message after order placement

### Admin Dashboard
- **Overview** — metric cards (revenue, orders, AOV, inventory) and weekly sales area chart
- **Inventory Table** — sortable, paginated product table with bulk selection and delete
- **Product Editor** — full CRUD form with tag management, featured toggle, and danger zone
- **Settings** — store info, notification preferences, account details, and security (2FA)

### Technical
- Persistent cart across sessions via Zustand + localStorage
- Hydration mismatch fix for SSR + Zustand persist
- CSS custom properties design system — every color, font, spacing as a variable
- Fully responsive — mobile, tablet, and desktop layouts
- Inter font via Next.js Google Fonts optimization

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS Variables |
| State Management | Zustand v5 |
| Form Handling | React Hook Form + Zod |
| Charts | Recharts |
| Icons | Lucide React |
| Drag & Drop | @dnd-kit |

---

## Project Structure

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/stitch-dropcart.git
cd stitch-dropcart
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser at:

### Admin Dashboard

Visit `/admin` to access the admin panel directly — no authentication required in this demo version.

---

## Design System

The UI is built on a custom CSS variables design system extracted from the original Figma/HTML designs.

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#004ac6` | Links, focus states |
| `--color-primary-container` | `#2563eb` | Buttons, active states |
| `--color-on-surface` | `#191c1e` | Primary text |
| `--color-surface-container-lowest` | `#ffffff` | Card backgrounds |
| `--color-background` | `#f7f9fb` | Page background |
| `--spacing-sidebar-width` | `320px` | Cart + admin sidebar |

Full token reference in `app/globals.css`.

---

## Roadmap

- [ ] Authentication (NextAuth.js)
- [ ] Real database (Prisma + PostgreSQL)
- [ ] Payment integration (Stripe)
- [ ] Collections and Orders pages
- [ ] Product image upload (Cloudinary)
- [ ] Dark mode support
- [ ] Email notifications (Resend)

---

## Author

Built by **Oluwatosin** — designed and developed from a custom UI/UX spec.

---

## License

MIT License — free to use and modify.
