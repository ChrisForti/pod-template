# POD Template - Print on Demand Merch Store

A modern, scalable e-commerce storefront built with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool & dev server
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── App.tsx        # Main app component
├── main.tsx       # Entry point
└── index.css      # Global styles
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

Set at least:

- `VITE_API_BASE_URL` (backend/proxy base URL)
- `VITE_APP_ENV` (`development`, `staging`, or `production`)

3. Run development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Next Steps

- Build catalog data service (mock + Printful-ready)
- Wire product detail page to fetched product IDs
- Implement cart state and checkout flow
- Add backend proxy endpoints for Printful operations
- Add order submission and webhook handling
