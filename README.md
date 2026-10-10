# UES Abroad — Premier Global Education & Admissions Platform

A modern, full-stack international education advisory and student admissions platform built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Prisma ORM**.

UES Abroad streamlines the journey for students aspiring to study abroad — featuring real university campus photography, destination discovery, curated course directories, an interactive Forex & Blocked Account calculator, student housing listings, and an integrated blog and resources hub.

---

## 🌟 Key Features

### 🎓 Student Experience
- **Interactive Hero & Statistics:** Dynamic hero section showcasing authentic university campus visuals and key student value metrics.
- **Popular Study Destinations (3×3 Grid):** Clean desktop and mobile grid showcasing top countries (UK, USA, Canada, Australia, Germany, Ireland, France, New Zealand, UAE) with visa and post-study work rights information.
- **Campus & University Explorer:** Filterable catalog of partner universities with tuition estimates, ranking data, and real campus photography.
- **Forex & Blocked Account Calculator:** Real-time multi-currency converter with interactive guidance for **Tuition Fees**, **GIC (Canada)**, and **Blocked Accounts (Germany)**.
- **7-Step Student Journey:** Visual, interactive timeline guiding applicants from initial profile evaluation to visa issuance and pre-departure briefing.
- **Student Accommodation Portal:** Dedicated housing directory with property filters, amenity breakdowns, and direct booking inquiries.
- **Comprehensive Blogs & Articles:** Built-in editorial platform (`/blogs` and `/blogs/[slug]`) featuring visa guidelines, scholarship walkthroughs, SOP masterclasses, and social sharing.
- **Multi-Channel Lead Inquiries:** Modal lead capture integrated with email notifications and direct WhatsApp chat links.

### 🛡️ Admin CRM & Management Portal
- **Dashboard:** At-a-glance analytics on leads, inquiries, and application statuses.
- **Leads Management:** Detailed table view with status workflows (New, Contacted, In Progress, Enrolled), notes, and export options.
- **Universities & Courses Directory:** Manage institutions, intakes, program details, and tuition rates.
- **Platform Settings:** Tenant branding and configuration toggles.
- **Authentication:** Protected admin routes powered by **NextAuth.js**.

### ⚡ Performance & Optimization
- **WebP Asset Optimization:** Complete conversion of university, destination, and article media to modern WebP format, delivering an ~80% reduction in asset payload size and near-instant load times.
- **Static Site Generation (SSG):** Pre-rendered blog articles and static pages for optimal SEO performance and sub-second page loads.
- **Graceful Demo Fallbacks:** Platform seamlessly operates in demo/preview mode with realistic data when deployed without an active PostgreSQL database.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Custom CSS
- **Database & ORM:** [Prisma ORM 5](https://www.prisma.io/) with PostgreSQL / [NeonDB](https://neon.tech/)
- **Authentication:** [NextAuth.js v5](https://authjs.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Validation:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js:** v20.x or higher
- **npm:** v10.x or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Athulkvs04/ues_abroad.git
cd ues_abroad
npm install
```

### 3. Environment Configuration
Copy the environment template:
```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:
```env
# Database (PostgreSQL / NeonDB)
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/dbname?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your-generated-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Optional: Resend API for lead email notifications
RESEND_API_KEY=""
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (NeonDB / PostgreSQL)

This project is optimized for [Neon Serverless Postgres](https://neon.tech) and standard PostgreSQL databases.

```bash
# Push schema definitions to your database
npx prisma db push

# Seed initial dataset (universities, courses, admin credentials)
npm run seed # or npx tsx prisma/seed.ts
```

> **Note on Demo Mode:** If `DATABASE_URL` is omitted, API routes safely return fallback mock data, ensuring zero runtime crashes during local previews or static evaluations.

---

## 🔐 Admin Portal Credentials

- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Email:** `admin@uesabroad.com`
- **Default Password:** `admin123` *(ensure this is changed in production via settings)*

---

## 🧪 Quality Assurance & Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts local Next.js development server |
| `npm run build` | Builds optimized production bundle and runs static site generation |
| `npm run start` | Runs the production build server |
| `npm run lint` | Runs ESLint 9 checks across the codebase |
| `npx tsc --noEmit` | Runs full TypeScript static type checking |
| `npx prisma studio` | Launches interactive Prisma web GUI for database inspection |

---

## ☁️ Production Deployment

### Deploying to Vercel
1. Import the GitHub repository into [Vercel](https://vercel.com).
2. Set Environment Variables in Project Settings:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (`https://your-domain.vercel.app`)
3. The `postinstall` script triggers `prisma generate` automatically.
4. Deploy and verify.

---

## 📄 License

Proprietary © UES Abroad. All rights reserved.
