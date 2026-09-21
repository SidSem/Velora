# VELORA — 5-Day Implementation Roadmap (Day 1 to Day 5)

This document provides a comprehensive, day-by-day architectural blueprint to build **VELORA** from scratch into a production-quality luxury fashion e-commerce frontend.

---

## Roadmap Overview

```
DAY 1 ──► Foundations, Design System & Product Data Architecture
DAY 2 ──► Context State Engine, Global Navigation & Shell
DAY 3 ──► Editorial Homepage & Reusable Product Cards
DAY 4 ──► Shop Filters, Search Overlay & Product Details Experience
DAY 5 ──► Cart Drawer, Simulated Checkout, Confirmation & Final Polish
```

---

## Day 1: Foundations, Design System & Data Architecture

### Objective
Establish the project foundation, configure luxury styling tokens, build custom hooks, and curate the complete product dataset.

### Morning Session (Setup & Design Tokens)
1. **Initialize Vite Project**:
   - Scaffold React application with Vite (`create-vite`).
   - Install core dependencies: `react-router-dom`, `framer-motion`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`, `clsx`, `tailwind-merge`.
2. **Typography & Styling Configuration**:
   - Connect Google Fonts in `index.html`: `Playfair Display` (Headings) and `Inter` (UI/body).
   - Configure Tailwind CSS v4 in `index.css` with `@theme` tokens:
     - Obsidian Black (`#111111`)
     - Warm Cream (`#F7F5F0`)
     - Studio White (`#FFFFFF`)
     - Muted Gold Accent (`#B89B5E`)
     - Sage Green (`#4F7A5A`)
     - Terracotta (`#A84D4D`)
   - Add utility classes for luxury letter-spacing (`tracking-luxury`), custom minimalist scrollbars, and frosted glass navigation (`glass-nav`).

### Afternoon Session (Data Architecture & Utilities)
1. **Mock Data Sets**:
   - `src/data/products.js`: 26 realistic luxury garments across 9 categories (T-Shirts, Shirts, Trousers, Jeans, Dresses, Jackets, Coats, Knitwear, Accessories) with dual high-res images, colors, sizes, materials, and ratings.
   - `src/data/categories.js`: Category descriptions, slugs, and editorial images.
   - `src/data/collections.js`: Seasonal campaigns (AW26, Monochrome Edit, Pure Cashmere).
   - `src/data/journal.js`: 4 in-depth editorial fashion essays.
2. **Utilities & Custom Hooks**:
   - `src/utils/formatPrice.js`: Standardized INR formatting (`₹4,490`).
   - `src/utils/animations.js`: Framer Motion animation presets (`fadeUp`, `staggerContainer`, `drawerSlide`).
   - `src/utils/filters.js`: Filtering & sorting helper logic.
   - `src/hooks/useLocalStorage.js`: Persistent browser storage sync.
   - `src/hooks/useDebounce.js`: Debounce input for real-time search.
   - `src/hooks/useScrollDirection.js`: Monitor scroll position and direction for the navbar.

### Deliverables for Day 1
- Clean project running without build errors.
- Fully structured design system and color palette in light & dark modes.
- Robust, realistic dataset ready for components.

---

## Day 2: Global State Engine, Navigation & Shell

### Objective
Implement the global state management layer using React Context and construct the application shell and navigation components.

### Morning Session (React Contexts)
1. **`AppContext.jsx`**:
   - Dark / Light theme toggle with `localStorage` persistence and `document.documentElement` `.dark` class sync.
   - Global search overlay visibility (`isSearchOpen`).
   - Quick View product modal state (`quickViewProduct`).
   - Atelier size guide modal toggle (`isSizeGuideOpen`).
   - Global toast notification queue with auto-dismissal.
   - Search history tags and newsletter subscription flag.
2. **`CartContext.jsx`**:
   - Cart items array with composite keys (`id-color-size`).
   - Quantity adjustments, line item removal, and bag clearing.
   - Free shipping calculation with ₹5,000 threshold meter.
   - Promo code validator (`VELORA10` for 10% off, `FIRST15` for 15% off).
3. **`WishlistContext.jsx`**:
   - Saved items registry with toggle and count badges.

### Afternoon Session (Navigation & Layout Shell)
1. **Announcement Bar (`AnnouncementBar.jsx`)**:
   - Auto-rotating ticker displaying promotions and seasonal announcements.
2. **Dynamic Sticky Navbar (`Navbar.jsx`)**:
   - Smooth height reduction on scroll.
   - Transparent overlay on hero switching to frosted glass backdrop.
   - Active route indicators with Framer Motion layout springs.
   - Live badges on Wishlist and Bag icons.
   - Theme switch button (Sun/Moon).
3. **Mobile Navigation Drawer (`MobileMenu.jsx`)**:
   - Full-screen animated slide-in menu for small screens.
4. **Editorial Footer (`Footer.jsx`)**:
   - Interactive newsletter form with inline validation.
   - Categorized links (Shop, About, Concierge, Social).
5. **Global Feedback Components**:
   - `Toast.jsx`: Floating notification stack for cart/wishlist feedback.
   - `LoadingScreen.jsx`: Minimalist initial branded loading experience.
   - `ScrollToTop.jsx`: Resets scroll position on route transitions.

### Deliverables for Day 2
- Working global state across entire app.
- Sticky responsive navbar with theme toggle and live count badges.
- Persistent Cart, Wishlist, and Theme state in `localStorage`.

---

## Day 3: Editorial Homepage & Product Presentation Engine

### Objective
Create the core product card engine with interactive micro-animations and assemble the editorial homepage.

### Morning Session (Reusable Product Components)
1. **Product Card (`ProductCard.jsx`)**:
   - Aspect ratio preservation (`3:4`).
   - Dual-image hover flip: Primary image smoothly transitions to alternate view on hover.
   - Subtle image zoom animation.
   - Animated wishlist heart toggle.
   - Quick Add / Quick View trigger bar on hover.
   - Live color swatch dots with active indicator.
   - New, Sale, and Bestseller badge flags.
2. **Product Grid (`ProductGrid.jsx`)**:
   - Responsive grid (4 columns desktop, 3 tablet, 2 mobile).
   - Empty state with reset filters CTA.

### Afternoon Session (Homepage Sections)
1. **Hero Section**:
   - Full-screen cinematic hero with subtle scale zoom.
   - Staggered Framer Motion text animation (*"THE ART OF SIMPLICITY"*).
   - Dual CTAs (*"Explore Collection"* & *"Shop New Arrivals"*).
   - Animated scroll down indicator.
2. **Manifesto Statement**:
   - Centered typography quote (*"Clothing should speak quietly, but stay remembered"*).
3. **Featured Collection Grid**:
   - 4 handpicked signature garments.
4. **Category Split Panels**:
   - Two full-bleed editorial panels (Women vs. Men) with scale hover effects.
5. **New Arrivals Horizontal Carousel**:
   - Smooth horizontal scroll container with directional arrow controls.
6. **Magazine Editorial Block**:
   - Asymmetric layout spotlighting *"The New Minimalism"* linking to The Journal.
7. **Bestsellers & Newsletter Section**:
   - Bestselling products grid and interactive collector register.

### Deliverables for Day 3
- Luxury editorial homepage complete with 8 distinct sections.
- Reusable product card with dual-image hover swaps and color swatches.

---

## Day 4: Catalog Filtering, Interactive Overlays & Product Details

### Objective
Build the comprehensive shop filtering system, the live search overlay, quick view modal, and the deep-dive product specification page.

### Morning Session (Shop Page & Filter Engine)
1. **Shop Page (`Shop.jsx`)**:
   - Reads URL query parameters (`?category=`, `?gender=`, `?filter=new`) for seamless navbar integration.
   - Active filter tags that can be individually dismissed.
2. **Sidebar & Mobile Filter Panel (`FilterPanel.jsx`)**:
   - Audience / Gender selection (All, Women, Men).
   - Category navigation list with counts.
   - Size chips (XS to XL, numerical waist sizes, One Size).
   - Color swatch filters with visual hex previews.
   - Max price range slider.
   - Checkboxes for "New Season" and "Archive Sale".
3. **Sorting Selector (`SortDropdown.jsx`)**:
   - Featured, Newest, Price (Low → High), Price (High → Low), Alphabetical, Rating.

### Afternoon Session (Product Details & Modals)
1. **Live Search Overlay (`SearchOverlay.jsx`)**:
   - Full-width modal triggered via navbar search icon or shortcut.
   - Debounced search across titles, descriptions, and fabric compositions.
   - Recent search history chips with quick-clear option.
   - Live product and category preview results.
   - Keyboard accessible (ESC to close).
2. **Product Quick View Modal (`ProductQuickView.jsx`)**:
   - Image gallery with thumbnail picker.
   - Size, color, and quantity selectors.
   - Direct Add to Bag trigger.
3. **Size Guide Modal (`SizeGuideModal.jsx`)**:
   - Tops, bottoms, and outerwear measurements table.
   - Unit toggle between Centimeters (CM) and Inches (IN).
4. **Product Details Page (`ProductDetails.jsx`)**:
   - Interactive hover zoom lens.
   - Expandable specification accordions (Details, Material & Care, Shipping).
   - Social share button.
   - "Complete The Look" related products section.

### Deliverables for Day 4
- Fully functional Shop page with multi-attribute filtering.
- Fast debounced Search overlay with history.
- High-conversion Product Details page with image zoom and sizing guides.

---

## Day 5: Cart Drawer, Checkout, Order Confirmation & Polish

### Objective
Complete the checkout simulation funnel, implement remaining content pages, and perform rigorous UX testing and optimization.

### Morning Session (Cart & Simulated Checkout)
1. **Slide-Over Cart Drawer (`CartDrawer.jsx`)**:
   - Right-hand slide-over drawer triggered automatically on product addition.
   - Free shipping animated meter (`You're ₹X away from free shipping`).
   - Line-item quantity adjustment and subtotal calculation.
2. **Full Cart Page (`Cart.jsx`)**:
   - Complete item breakdown with promo voucher engine (`VELORA10`, `FIRST15`).
3. **Simulated Checkout (`Checkout.jsx`)**:
   - Form sections: Contact, Shipping Address, Delivery Method, Simulated Payment.
   - Live-mirroring interactive credit card preview card.
   - Field validation with custom inline error messages.
   - Loading authorization spinner on submission.
4. **Order Confirmation Receipt (`OrderSuccess.jsx`)**:
   - Animated checkmark badge.
   - Unique order reference code (`VL-2026-XXXXX`).
   - Summary breakdown, shipping address, and estimated delivery timeline.

### Afternoon Session (Editorial Pages & Final QA)
1. **Content & Brand Pages**:
   - `Wishlist.jsx`: Saved pieces grid with one-click "Move To Bag" and empty state.
   - `Journal.jsx`: Magazine articles with interactive full-story reading modals.
   - `About.jsx`: Atelier story, values, craftsmanship, and sustainability manifesto.
   - `NotFound.jsx`: 404 page with navigation redirects.
2. **Final Verification & Polish**:
   - Run production build (`npm run build`) to ensure 0 compiler warnings or errors.
   - Cross-browser responsive testing from 320px mobile to 4K desktop.
   - Dark mode contrast and consistency check across all routes.
   - Ensure all buttons, links, modals, and drawers have working interactions.

### Deliverables for Day 5
- End-to-end purchasing funnel from browsing to order confirmation.
- Wishlist, Journal, and About pages completely functional.
- Zero broken links, zero console errors, and high-performance production build.

---

## Summary Timeline

| Day | Primary Focus | Key Output |
| :--- | :--- | :--- |
| **Day 1** | Foundations & Design System | Vite setup, Tailwind v4 tokens, 26-piece dataset, custom hooks. |
| **Day 2** | State & Navigation Shell | App/Cart/Wishlist Contexts, sticky Navbar, Mobile Menu, Footer. |
| **Day 3** | Editorial Homepage | Reusable ProductCard, Hero, Categories, New Arrivals carousel. |
| **Day 4** | Shop, Filters & Product Details | Multi-attribute filters, Search overlay, Quick View, Zoom gallery. |
| **Day 5** | Cart, Checkout & Confirmation | Cart drawer, simulated credit card checkout, order receipt, QA. |
