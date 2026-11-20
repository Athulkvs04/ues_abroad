# UES Abroad Platform — Deployment & Operations Guide

This guide contains everything the deployment and DevOps team needs to provision, configure, and deploy the **UES Abroad Education Platform** into production or staging environments.

---

## 1. System Architecture & Tech Stack

| Component | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack, React 19) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | TailwindCSS v4 |
| **ORM / Data Access** | Prisma ORM 5 |
| **Database Engine** | PostgreSQL 14+ (Recommended: [Neon.tech](https://neon.tech), Supabase, or AWS RDS) |
| **Authentication** | NextAuth.js (Auth.js v5) with bcrypt password hashing |
| **Automated Testing** | Playwright (End-to-End test suite across public & admin routes) |

---

## 2. Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` (v10+)
- **PostgreSQL Database**: A running PostgreSQL instance with connection pooling enabled if deployed on serverless platforms (e.g. Neon or Supabase).

---

## 3. Environment Variables Configuration

Copy the template to your deployment environment:
```bash
cp .env.example .env
```

### Required Variables

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | Standard PostgreSQL connection string | `postgresql://user:password@ep-xyz.us-east-2.aws.neon.tech/ues_abroad?sslmode=require` |
| `NEXTAUTH_SECRET` | Cryptographic secret for session cookies | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Canonical public URL of the application | `https://uesabroad.com` |
| `NEXT_PUBLIC_APP_URL` | Public URL for client-side assets & OG cards | `https://uesabroad.com` |

### Bootstrap Admin Credentials (Recommended)

| Variable | Description | Default |
|---|---|---|
| `ADMIN_EMAIL` | Super admin initial login email | `admin@uesabroad.com` |
| `ADMIN_PASSWORD` | Strong initial admin password | Set a strong password (min 8 chars) |

### Optional External Services

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for consultation confirmation emails. If omitted, leads are saved in PostgreSQL without triggering outbound emails. |

---

## 4. Database Setup & Seeding

Once `DATABASE_URL` is configured:

### 1. Apply Database Schema Migrations
```bash
npx prisma migrate deploy
```
*Applies all version-controlled migrations from `prisma/migrations/` to create tables and indexes.*

### 2. Seed Initial Platform Data
```bash
npx prisma db seed
```
*Seeds the database with authentic initial content:*
- **9 Study Destinations** (USA, UK, Germany, Canada, Australia, Ireland, etc.)
- **12 Global Universities** with validated campus assets
- **26 Academic Programs & Degree Courses**
- **10 Standardized Prep Exams** (IELTS, TOEFL, GRE, GMAT, etc.)
- **3 Editorial Study Guides & Insights**
- **Default Site Settings** (Support WhatsApp, Consultation URLs, Address)

---

## 5. Build & Production Deployment

### Option A: Vercel / Serverless Deployment (Recommended)
1. Import repository into Vercel.
2. In **Project Settings → Environment Variables**, add the variables from `.env.example`.
3. Set the build command:
   ```bash
   prisma generate && next build
   ```
4. Deploy.

### Option B: Node.js / VPS / Docker Deployment
```bash
# 1. Install production dependencies
npm ci

# 2. Generate Prisma Client
npx prisma generate

# 3. Create optimized production build
npm run build

# 4. Start production server (runs on port 3000 by default)
PORT=3000 npm start
```

For process supervision on a Linux VPS, use `pm2`:
```bash
pm2 start npm --name "ues-abroad" -- start
pm2 save
```

---

## 6. Accessing the Admin Console

- **Login URL**: `/admin/login`
- **Initial Credentials**: Provided via `ADMIN_EMAIL` & `ADMIN_PASSWORD` or created via the seed script.
- **Admin Security**:
  - All `/admin/*` routes are protected by NextAuth middleware (`src/proxy.ts`).
  - All `/api/admin/*` endpoints strictly return `401 Unauthorized` for unauthenticated requests.
  - Security headers (`Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Permissions-Policy`) are enforced globally.
  - Password hashes are never returned by any API route.

---

## 7. Verification & Health Check

After deployment, verify the platform:
```bash
# Run linting check
npm run lint

# Run end-to-end regression tests (optional, requires test environment)
npx playwright test
```

### Key Endpoints to Verify
- `GET /` — Public Homepage (Status: `200`)
- `GET /universities` — AI Course Finder & Global University Matcher (Status: `200`)
- `GET /blogs` — Editorial Guides (Status: `200`)
- `GET /admin/login` — Admin Console Login (Status: `200`)
- `GET /api/admin/stats` — Unauthenticated probe (Must return: `401 Unauthorized`)
