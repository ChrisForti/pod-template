# POD Template — Print on Demand Merch Store

A mock-first React storefront template for print-on-demand merchandise.
Ships fully functional with mock data and deploys to GitHub Pages out of the box.
Clone it to wire in a real backend, Printful, and Stripe.

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Tailwind CSS v4** — Styling
- **Vite** — Build tool & dev server
- **React Router v7** — Client-side routing

## What's Built

| Feature                                                       | Status |
| ------------------------------------------------------------- | ------ |
| Landing page (hero, featured products, features, footer)      | ✅     |
| Product detail with size/color variant selection              | ✅     |
| Customization — boat name, logo upload, design template       | ✅     |
| Live CSS overlay preview (text + logo on product image)       | ✅     |
| Cart (add/remove/qty, localStorage persistence)               | ✅     |
| Checkout form with inline validation                          | ✅     |
| Order submission + success page                               | ✅     |
| Mock catalog + order services (swap to real API via env flag) | ✅     |
| GitHub Actions CI/CD → GitHub Pages                           | ✅     |

## Project Structure

```
src/
├── components/       # Header, Footer, Hero, FeaturedProducts, Features
├── context/          # CartContext (useReducer + localStorage)
├── data/             # mockProducts.ts
├── pages/            # LandingPage, ProductDetail, CartPage, CheckoutPage, OrderSuccessPage
├── services/         # catalogService (interface), mockCatalogService, apiCatalogService, orderService
├── types/            # models.ts — Product, Variant, CartItem, OrderDraft, ShippingAddress
├── config/           # env.ts — typed VITE_* wrappers
└── index.css         # Tailwind @theme tokens
```

## Getting Started

```bash
npm install
npm run dev
```

No `.env` file needed — the template runs entirely on mock data.

## Environment Variables

Copy `.env.example` to `.env` when connecting to a real backend:

```bash
cp .env.example .env
```

| Variable                 | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `VITE_API_BASE_URL`      | Backend/proxy base URL                     |
| `VITE_APP_ENV`           | `development` / `staging` / `production`   |
| `VITE_PRINTFUL_STORE_ID` | Printful store ID (cloned store only)      |
| `VITE_STRIPE_PUBLIC_KEY` | Stripe publishable key (cloned store only) |

## Wiring Up the Real Store

Search for `// WIRE-UP:` comments across `src/` — each one marks an exact integration point with instructions:

```bash
grep -r "WIRE-UP" src/
```

Key swap points:

- `src/components/FeaturedProducts.tsx` and `src/pages/ProductDetail.tsx` — change import from `mockCatalogService` → `apiCatalogService`
- `src/services/orderService.ts` — set `VITE_USE_MOCK_ORDER=false` to hit real API
- `src/config/env.ts` — upgrade `apiBaseUrl` to a required check for production

## Deployment

Push to `main` — GitHub Actions typechecks, builds, and deploys to GitHub Pages automatically.

Enable Pages first: **Settings → Pages → Source → GitHub Actions**
