# Bake Thérapie — Phased Project Plan

See [.github/copilot-instructions.md](../.github/copilot-instructions.md) for the standing
architecture/domain rules this plan builds on.

## Phase 0 — Foundations (no code yet)

- Create the Azure account (free tier) — needed before any backend work.
- Decide payment gateway (Square is the front-runner) — can be deferred, but confirm before Phase 3.
- Confirm final field list/data model for orders and products (captured in
  `.github/copilot-instructions.md`).

## Phase 1 — Frontend showcase

- Finish the public site: landing page, product/cookie showcase, MUI components.
- Add Tailwind config alongside MUI (scoped carefully to avoid clashing with MUI's baseline).
- Build the order form UI (guest checkout fields). Can initially mock-submit (no backend yet).

## Phase 2 — Backend core: products & order intake

- Scaffold ASP.NET Core Web API in `backend/`.
- Set up Azure SQL (free tier) + EF Core migrations for `Product`, `Order`, `OrderItem`
  (Status, PaymentStatus, timestamps as defined in the domain model).
- Build public `GET /api/products`; replace the hardcoded `cookies` array in
  `frontend/src/App.jsx` with data fetched from this endpoint.
- Build `POST /api/orders`; wire the frontend order form to it, referencing products by `ProductId`.
- No payment integration yet — orders can be created as `Unpaid`/pay-on-pickup to unblock the
  end-to-end flow early.

## Phase 3 — Payments

- Integrate the chosen gateway (Square, likely) behind an abstraction (e.g. `IPaymentProvider`)
  so the provider can be swapped without touching order logic.
- Update the order flow to mark `PaymentStatus = Paid` on success; handle webhooks/callbacks.

## Phase 4 — Staff/owner admin dashboard

- Add Google Sign-In (OIDC) auth to the backend, with `Owner`/`Staff` roles.
- Build protected admin endpoints: `/api/admin/products` (catalog CRUD) and `/api/admin/orders`
  (list, filter by status, mark `Ready`/`Fulfilled`).
- Build a simple admin UI (new frontend route or separate small app) for staff to manage the
  product catalog and fulfill orders.

## Phase 5 — Reporting/bookkeeping

- Basic reports: daily/weekly totals, tips, payment status breakdown.
- Export to CSV (and optionally Xero/QuickBooks) rather than building full accounting logic.

## Phase 6 — Polish/nice-to-haves

- Marketing opt-in email flow (if using the flag for anything beyond storage).
- Optional customer accounts via Google Sign-In (order history, faster repeat checkout) — deferred
  since guest checkout already covers v1.

## Suggested starting point

Phase 1 (frontend order form UI) can start immediately since it doesn't depend on Azure being ready.
Phase 0's Azure account creation should happen in parallel so Phase 2 isn't blocked later.
