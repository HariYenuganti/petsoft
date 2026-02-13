<div align="center">

# 🐾 PetSoft

### Modern Pet Daycare Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.8-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

_A sleek, modern web application for managing pet daycare operations with real-time updates and seamless payment integration._

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Documentation](#-project-structure)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### � Pet Management

- **CRUD Operations** - Add, edit, and checkout pets
- **Optimistic UI** - Instant feedback with React transitions
- **Smart Defaults** - Automatic placeholder images
- **Form Validation** - Zod-powered type-safe forms

</td>
<td width="50%">

### 🔐 Authentication

- **Secure Login** - NextAuth.js v5 integration
- **Protected Routes** - Middleware-based authorization
- **Session Management** - JWT-based sessions
- **User Accounts** - Personalized dashboards

</td>
</tr>
<tr>
<td width="50%">

### 💳 Payment System

- **Stripe Integration** - Secure checkout flow
- **Lifetime Access** - One-time payment upgrade
- **Webhook Handling** - Automated payment processing
- **API Route Architecture** - Stable payment handling

</td>
<td width="50%">

### 🎨 Modern UI/UX

- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Theme switching support
- **Radix UI Components** - Accessible primitives
- **Smooth Animations** - Polished interactions

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Category       | Technologies                                      |
| -------------- | ------------------------------------------------- |
| **Frontend**   | Next.js 16 • React 19 • TypeScript • Tailwind CSS |
| **Backend**    | Next.js API Routes • Server Actions • NextAuth.js |
| **Database**   | PostgreSQL • Prisma ORM                           |
| **Payments**   | Stripe Checkout • Webhooks                        |
| **Forms**      | React Hook Form • Zod Validation                  |
| **UI Library** | Radix UI • Lucide Icons • Sonner Toasts           |

</div>

---

## 🚀 Getting Started

### Prerequisites

```bash
Node.js 18+
PostgreSQL database
Stripe account
```

### Quick Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/HariYenuganti/petsoft.git
cd petsoft
```

2️⃣ **Install dependencies**

```bash
npm install
```

3️⃣ **Configure environment variables**

```bash
cp .env.example .env
```

<details>
<summary>📝 Required Environment Variables</summary>

```env
# Database
DATABASE_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PRICE_ID="price_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

</details>

4️⃣ **Initialize database**

```bash
npx prisma migrate dev
npx prisma db seed
```

5️⃣ **Launch development server**

```bash
npm run dev
```

🎉 Open [http://localhost:3000](http://localhost:3000) to see your app!

---

## 📁 Project Structure

```
petsoft/
├── 📂 src/
│   ├── 📂 actions/          # Server actions for data mutations
│   ├── 📂 app/              # Next.js App Router
│   │   ├── 📂 (app)/       # Protected application routes
│   │   ├── 📂 (auth)/      # Authentication pages
│   │   └── 📂 api/         # API endpoints
│   ├── 📂 components/       # Reusable React components
│   ├── 📂 contexts/         # React Context providers
│   ├── 📂 lib/             # Utilities, configs, and helpers
│   └── 📂 styles/          # Global CSS and Tailwind
├── 📂 prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
└── 📄 package.json
```

---

## 🎯 Key Features Deep Dive

### Authentication Flow

- **NextAuth.js v5** with credentials provider
- **Middleware protection** for app routes
- **JWT sessions** for stateless authentication
- **Secure password hashing** with bcrypt

### Pet Management System

- **Optimistic updates** using React's `useOptimistic` hook
- **Form validation** with Zod schemas
- **Image fallbacks** for missing pet photos
- **Real-time UI updates** with transitions

### Payment Integration

- **Stripe Checkout** via dedicated API route
- **Webhook verification** for payment confirmation
- **Automatic access upgrade** on successful payment
- **Error handling** with user-friendly messages

---

## 📜 Available Scripts

| Command                  | Description              |
| ------------------------ | ------------------------ |
| `npm run dev`            | Start development server |
| `npm run build`          | Build for production     |
| `npm start`              | Start production server  |
| `npm run lint`           | Run ESLint               |
| `npx prisma studio`      | Open Prisma database GUI |
| `npx prisma migrate dev` | Run database migrations  |

---

## 🔄 Recent Updates

<table>
<tr>
<td>

✅ **Next.js 16 & React 19 Upgrade**  
Migrated to latest stable versions

</td>
<td>

✅ **API Route Migration**  
Moved checkout to API route for stability

</td>
</tr>
<tr>
<td>

✅ **Optimistic Updates**  
Fixed transitions with `startTransition`

</td>
<td>

✅ **Image Fallbacks**  
Added default images for pets

</td>
</tr>
<tr>
<td>

✅ **Circular Dependency Fix**  
Resolved auth module dependencies

</td>
<td>

✅ **Client-Side Sign Out**  
Improved sign-out reliability

</td>
</tr>
</table>

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new features
- 🔧 Submit pull requests
- 📖 Improve documentation

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using Next.js and React**

[⬆ Back to Top](#-petsoft)

</div>
