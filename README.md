# VELORA — Defined by Simplicity

VELORA is a production-quality, frontend-only luxury fashion e-commerce web application focused on minimalist luxury clothing, built with **React 19**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, and **Lucide React**.

---

## Quick Start: How to Run

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### 2. Install Dependencies
Open your terminal in the project root directory (`d:\comeBack\Velora`) and run:

```bash
npm install
```

### 3. Start the Development Server
Run:

```bash
npm run dev
```

Once started, open your browser and navigate to:

```text
http://localhost:5173
```

### 4. Build for Production (Optional)
To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Project Highlights & Features

- **Pure Frontend Architecture**: No backend or database required. State (Cart, Wishlist, Theme, Recent Searches, Newsletter) is managed via React Context and persisted in `localStorage`.
- **Editorial Brand Identity**:
  - Palette: Obsidian Black (`#111111`), Warm Cream (`#F7F5F0`), Studio White (`#FFFFFF`), and Muted Gold Accent (`#B89B5E`).
  - Typography: **Playfair Display** (editorial headings) & **Inter** (technical body/UI).
- **Dark / Light Mode**: Seamless theme toggle in the navigation bar, persisted across sessions.
- **Dynamic Sticky Navbar**: Shrinks smoothly on scroll with frosted glass backdrop and live indicator for active routes.
- **Interactive Product Catalog (26 pieces)**:
  - Dual-image hover swap & subtle zoom.
  - Multi-attribute filter panel (Category, Audience/Gender, Size, Color, Price range, New/Sale flags).
  - Multi-mode sorting (Featured, Newest, Price, Rating, A–Z).
- **Product Details & Quick View**:
  - Hover zoom lens and thumbnail switcher.
  - Color swatches, size selector, and interactive Sizing Guide modal.
  - Collapsible specifications and "Complete The Look" recommendations.
- **Cart & Slide-Over Drawer**:
  - Right-side slide-over drawer with item quantity adjusters.
  - Dynamic free shipping progress bar (threshold ₹5,000).
  - Promo voucher simulator (e.g. `VELORA10` for 10% off, `FIRST15` for 15% off).
- **Wishlist**: Dedicated saved pieces registry with one-click "Move To Bag".
- **Live Search Overlay**: Case-insensitive debounced live search with search history tags.
- **Simulated Checkout & Order Confirmation**:
  - Realistic credit card preview card with live input mirroring.
  - Simulated payment authorization and order confirmation receipt (`VL-2026-XXXXX`).
- **The Journal & About Us**: Editorial storytelling essays, craftsmanship provenance, and sustainability manifestos.

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4
- **Motion**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM v7
- **Persistence**: `localStorage` (via custom `useLocalStorage` hook)
