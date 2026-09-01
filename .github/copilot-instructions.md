# Bake Therapie — Project Guidelines

## Architecture

- **Frontend** (`frontend/`): React + Vite site, deployed via Netlify (see `netlify.toml`).
- **Backend** (`backend/`): currently empty — will be a .NET (C#) API responsible for the contact/order
  form endpoint(s), database access, and payment gateway integration. Do not put UI code here.
- Keep the two concerns strictly separated: no frontend code in `backend/`, no API/DB/payment logic in
  `frontend/`. Frontend talks to backend only through HTTP calls to its API.

## Frontend Stack

- React (JS/JSX) + Vite.
- UI components: MUI (`@mui/material`, `@mui/icons-material`) — already installed.
- Styling: Tailwind CSS is the intended utility-styling layer alongside MUI, but it is **not yet
  installed/configured** (no `tailwind.config.js` or PostCSS setup present). When adding Tailwind,
  configure it to coexist with MUI (scope resets carefully to avoid clashing with MUI's CSS baseline).

## Backend Stack (planned)

- ASP.NET Core Web API (C#) — not yet scaffolded.
- Responsibilities: order/form submission API, database access, payment gateway integration, staff
  admin API (order fulfillment + basic bookkeeping reports).
- Payment gateway: **not yet decided** (Square is the current front-runner). Do not hardcode a specific
  provider's SDK/API into business logic — keep payment integration behind an abstraction so the
  provider can be swapped in later without touching unrelated code.
- Database: Azure SQL Database, **Free tier**, hosted on an Azure account that will be created later.
  Do not hardcode production connection strings; use configuration/secrets (`appsettings`, environment
  variables, or Azure Key Vault) once the account exists.
- Vendor choices are independent and intentionally mixed: business email/Workspace stays on **Gmail /
  Google Workspace**, hosting/database stays on **Azure**, staff/customer sign-in uses **Google**. Do
  not treat these as needing to be consolidated onto one provider.

## Domain Model: Orders

- Customer orders are **guest checkout only** for v1 — no customer account/password system. Capture
  contact info per order (name, phone, email, marketing opt-in).
- Use a `Status` enum (`New → Confirmed → Ready → Fulfilled → Cancelled`) instead of separate boolean
  flags, and a separate `PaymentStatus` enum (`Unpaid / Paid / Refunded / PartiallyRefunded`) — don't
  model these as ad-hoc booleans.
- Prefer normalized order items (cookie flavor + quantity + unit price as rows) over flat per-order
  columns, so an order can contain multiple line items.
- Track `CreatedAt`/`UpdatedAt`/`FulfilledAt` as timestamps (nullable `FulfilledAt` implies the
  "fulfilled" boolean) rather than separate date + flag pairs.

## Auth

- **Customers**: no account system for v1 (guest checkout). If added later, prefer "Sign in with
  Google" over building custom email/password auth.
- **Staff/owner admin dashboard**: authenticate via **Google Sign-In (OIDC)**, since the owner and all
  staff use Gmail/Google Workspace for email — do not default to Microsoft Entra ID for staff login.
  Use role/claims-based authorization (`Owner` vs `Staff`) on admin-only endpoints
  (e.g. `/api/admin/orders`).

## Conventions

- Keep frontend and backend as separate deployable units with their own dependency files
  (`frontend/package.json`, and a future `backend/*.csproj`).
- New API endpoints belong under `backend/`; new pages/components belong under `frontend/src/`.
