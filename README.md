# UES Abroad — Global Education Platform

Modern, full-stack international education advisory platform built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM**.

---

## 🚀 Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   *Edit `.env.local` with your NeonDB / PostgreSQL connection string and NextAuth secret.*

3. **Start local dev server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

---

## 🗄️ Database Setup (NeonDB / PostgreSQL)

This application uses Prisma ORM with PostgreSQL (fully tested and optimized for [NeonDB](https://neon.tech)).

### 1. Connecting NeonDB:
Set your connection string in your `.env.local` or hosting provider environment variables:
```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require"
```

### 2. Push Schema & Seed Initial Data:
Once `DATABASE_URL` is set, run:
```bash
# Push schema tables to NeonDB
npx prisma db push

# Seed initial universities, countries, courses, and admin users
npx prisma db seed
```

---

## 🛡️ Admin Portal

- **URL:** `/admin/login`
- **Default Super Admin:**
  - **Email:** `admin@uesabroad.com`
  - **Password:** `admin123` *(change upon first deployment)*

> **Testing Mode Note:** If deployed without a `DATABASE_URL` configured, the platform automatically runs in graceful demo mode with mock data and zero-error API fallbacks. Connecting NeonDB activates persistent production storage.

---

## ☁️ Production Deployment (Vercel / Cloud)

1. Import the repository into Vercel or your hosting platform.
2. In **Project Settings → Environment Variables**, add:
   - `DATABASE_URL` (your NeonDB connection URL)
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (e.g. `https://yourdomain.com`)
3. The `postinstall` script (`prisma generate`) runs automatically on every build.
4. Deploy!

