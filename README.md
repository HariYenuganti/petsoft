<div align="center">

# 🐾 Kennelry

### _A ledger for pet daycares._

One screen. One ledger. Every guest accounted for by the minute.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.8-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-5-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://authjs.dev/)
[![Stripe](https://img.shields.io/badge/Stripe-Checkout-635BFF?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

[Features](#-features) · [Tech Stack](#-tech-stack) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 📋 The roster

Searchable master list of today's pets with `On premises` / `Off premises` tabs. Soft-archive on checkout; returning guests check back in with one click.

</td>
<td width="50%" valign="top">

### 📖 The day book

Per-guest timeline — check-ins, yard time, meals, naps, grooming, custom notes. Every entry timestamped and handler-signed.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 💊 The medication log

Schedule doses, mark given with a handler signature. Every administered dose also writes to the day book as an audit trail.

</td>
<td width="50%" valign="top">

### 🖨️ Check-out tickets

Printable ticket on check-out: brand header, times, today's meds + events, owner signature line. Dedicated `@media print` stylesheet.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🗓️ Today's agenda

Cross-pet time-sorted feed — `Due now` / `Later today` / `Already logged`. Fills the detail pane when no guest is selected.

</td>
<td width="50%" valign="top">

### 📄 Daily run sheet

One-click print of a staff-ready roster + medication schedule, with app chrome hidden.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🔐 Authentication

NextAuth.js v5 credentials provider, bcrypt-hashed passwords, JWT sessions, middleware-protected routes.

</td>
<td width="50%" valign="top">

### 💳 Payments

Stripe Checkout for lifetime access. Webhook verification upgrades `hasPremiumAccess` on success.

</td>
</tr>
</table>

> **Optimistic UI throughout** — every mutation (add pet, log event, mark med, check out) is wired through React's `useOptimistic` + `startTransition` for instant feedback with server-error rollback.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 App Router (Turbopack) · React 19 · TypeScript 5 |
| **Data** | PostgreSQL · Prisma 5 ORM |
| **Auth** | NextAuth.js v5 · bcryptjs |
| **Payments** | Stripe Checkout + Webhooks |
| **UI** | Tailwind CSS 3 · Radix UI primitives · Sonner toasts · `class-variance-authority` |
| **Forms** | React Hook Form · Zod |
| **Fonts** | Instrument Serif · Inter Tight · JetBrains Mono · Caveat (via `next/font`) |

---

## 🚀 Getting Started

### Prerequisites

```text
Node.js 24+ (LTS)
PostgreSQL (Neon, Supabase, Prisma Data Platform, local — any provider)
Stripe account (test mode works)
```

### Quick setup

**1. Clone & install**

```bash
git clone https://github.com/HariYenuganti/petsoft.git
cd petsoft
npm install
```

**2. Configure environment**

```bash
cp .env.example .env
```

<details>
<summary><strong>Required environment variables</strong></summary>

```env
# Database
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Auth.js
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

</details>

**3. Initialize the database**

```bash
npx prisma db push    # sync schema
npx prisma db seed    # demo user + 3 pets with events and meds
```

Demo login:

```text
email:    example@gmail.com
password: example
```

**4. Run the dev server**

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**, sign in with the demo credentials, land on `/app/dashboard`.

---

## 📁 Project Structure

```text
kennelry/
├── prisma/
│   ├── schema.prisma          # Pet · TimelineEvent · Medication · User
│   └── seed.ts                # Demo data
│
├── public/                    # Static assets (plate-dog.jpg, pet-placeholder.jpg)
│
└── src/
    ├── actions/actions.ts     # Server actions — all mutations, ownership-checked
    │
    ├── app/
    │   ├── layout.tsx         # Root: fonts + SessionProvider
    │   ├── (marketing)/       # Landing (hero, work, demo, letters, pricing, FAQ)
    │   ├── (auth)/            # login · signup · payment
    │   └── (app)/app/
    │       ├── dashboard/     # Master-detail roster
    │       ├── account/       # Settings + sign out
    │       └── pets/[petId]/ticket/   # Printable check-out ticket
    │
    ├── components/
    │   ├── landing/           # Hero, ledger card, work section, demo, FAQ, etc.
    │   ├── ui/                # Button, Input, Label, Textarea, Dialog
    │   ├── agenda.tsx         # Today-at-the-daycare panel
    │   ├── timeline.tsx       # The day book
    │   ├── medications.tsx    # The medication log
    │   ├── print-run-sheet.tsx# Print-only run sheet
    │   └── …                  # pet-list, pet-details, pet-form, roster-tabs…
    │
    ├── contexts/
    │   ├── pet-context-provider.tsx   # Optimistic pet state + all handlers
    │   └── search-context-provider.tsx# Search + roster filter
    │
    ├── lib/
    │   ├── auth.ts            # NextAuth.js v5 config
    │   ├── db.ts              # Prisma singleton
    │   ├── server-utils.ts    # checkAuth + typed readers
    │   ├── validations.ts     # Zod schemas
    │   └── types.ts           # PetWithRelations, PetEssentials
    │
    └── styles/globals.css     # Design tokens · component styles · @media print
```

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Dev server (Turbopack) on `:3000` |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npx prisma studio` | Database GUI |
| `npx prisma db push` | Sync schema (no migration history) |
| `npx prisma migrate dev` | Interactive migration workflow |
| `npx prisma db seed` | Run `prisma/seed.ts` |

---

## 🗺️ Roadmap

- [ ] Promote the Agenda to its own `/app/agenda` route
- [ ] Left sidebar layout with nav sections + user chip
- [ ] `Pet.status` enum for a proper **Observation** filter tab
- [ ] Owner portal (read-only daily recap by email)
- [ ] PDF export for checkout tickets
- [ ] Dark mode (currently light-only)

---

## 📄 License

Open source under the [MIT License](LICENSE).

