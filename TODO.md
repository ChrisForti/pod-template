# TODO

## Current Status (Already Built)

- [x] Landing page sections (header, hero, featured products, features, footer)
- [x] Product detail layout skeleton (preview, info, customizer, details)
- [x] Basic style system with card-based UI and responsive layout

## Phase 1 - App Foundation

- [x] Install and configure routing (React Router)
  - DoD: Routes exist for /, /products/:id, /cart, /checkout, /order/success
- [x] Replace dev page toggle with route navigation
  - DoD: Header and product cards navigate through real routes
- [x] Define core TypeScript models
  - DoD: Shared types for Product, Variant, Customization, CartItem, OrderDraft
- [x] Add environment configuration and API client setup
  - DoD: .env usage documented and typed access wrappers created

## Phase 2 - Product Data + Catalog ✅

- [x] Build catalog data layer (start with mock service, swap to Printful service)
  - DoD: A single service interface can switch between mock and live data
- [x] Wire featured products to real data service
  - DoD: Product cards render from service and handle loading/error states; Retry re-fetches in-component without page reload
- [x] Build product detail data fetch by id
  - DoD: URL id loads product + variants + pricing reliably; useEffect resets all state on id change (no stale notFound/product bleed-through)
- [x] Add product options behavior (size/color selection tied to variant)
  - DoD: Price, availability, and selected variant update correctly
- [x] Register all used Tailwind v4 primary color shades in @theme
  - DoD: primary-200/300/400 defined; ring, disabled-button, and hover-border utilities all render

## Phase 3 - Customization Workflow (front-end only) ✅ (partial)

- [ ] Wire `templateId` state to Design Template select
  - DoD: All three customization fields (boatName, templateId, logoFile) are live in component state
- [x] Client-side logo upload with file validation and local preview
  - DoD: File type/size validated, preview renders in upload zone, Remove clears it
- [x] Logo blob URL cleanup on unmount / file change (no memory leaks)
  - DoD: useEffect teardown revokes objectURL; file input value cleared after handling
- [x] Front/Back/Detail thumbnail view switching with active state
  - DoD: Thumbnails show real product images, clicking switches main image with active border ring
- [ ] Boat name + logo CSS overlay on product preview image
  - DoD: Preview panel reflects boat name text and logo as the user types/uploads
- [ ] ~~Printful mockup generation~~ — deferred to Phase 5 (requires backend)
  - See [CUSTOMIZER.md](./CUSTOMIZER.md) for full implementation plan

## Phase 4 - Cart + Checkout ✅ (partial)

- [x] Build cart store (Context or lightweight state lib)
  - DoD: Add/remove/update quantity and total calculations work across routes
- [x] Collision-safe cart item key (JSON-serialized tuple, normalized boatName)
  - DoD: Hyphens in values can't collide; trim/lowercase ensures "My Boat" and "my boat" merge
- [x] Connect Add to Cart button on product detail
  - DoD: Selected variant + customization are stored in cart line item
- [x] Disable Add to Cart for missing/invalid variant combination
  - DoD: When variants exist, unmatched size+color treats inStock as false
- [x] Create cart page UI
  - DoD: Editable line items, totals, free shipping threshold, CTA to checkout
- [ ] Create checkout form (shipping + contact)
  - DoD: Form validation and submission-ready payload generation
- [ ] Implement order submission flow
  - DoD: Successful checkout creates order request and returns success page state

## Phase 5 - Backend + Integrations

> Full plan documented in [CUSTOMIZER.md](./CUSTOMIZER.md)

- [ ] Build backend proxy for all Printful API calls
  - DoD: API key is server-only; frontend never sees it
- [ ] Artwork hosting (S3 / Cloudflare R2) for customer logo uploads
  - DoD: Uploaded files get a public URL that Printful's mockup API can fetch
- [ ] Printful mockup generation + async polling
  - DoD: "Generate Mockup" button shows spinner, swaps in rendered image on completion
- [ ] Webhook receiver for Printful fulfillment status updates
  - DoD: Documented webhook events mapped to internal order states
- [ ] Add error logging and user-safe fallback UX
  - DoD: API failures show actionable messages, errors are logged for debugging
- [ ] Add basic analytics events (product view, add to cart, checkout started, order placed)
  - DoD: Event helpers implemented and called at key user actions

## Phase 6 - Quality + Launch Readiness

- [ ] Add unit tests for core helpers and state logic
  - DoD: Cart math, variant selection, and payload builders covered
- [ ] Add integration tests for primary user flow
  - DoD: Browse product -> customize -> add to cart -> checkout happy path passes
- [ ] Add accessibility pass
  - DoD: Keyboard navigation and form labels are complete on key flows
- [ ] Final launch checklist
  - DoD: Env vars, legal pages, pricing checks, and monitoring all verified

## Immediate Next Sprint (Recommended)

- [x] Routing setup + remove App toggle
- [x] Product data service abstraction (mock + Printful-ready)
- [x] Cart store + Add to Cart wiring
- [x] Checkout skeleton route and form shell
