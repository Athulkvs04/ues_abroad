# ues_abroad – Deployment Package

## Overview
This repository contains the source code for the **UES Abroad** web platform built with Next.js 16 and Prisma.

## Prerequisites
- **Node.js** (v18 or newer)
- **npm** (or pnpm/yarn)
- A **PostgreSQL** database (connection string in `DATABASE_URL`).

## Environment variables
Create a `.env` file at the project root (example below). Adjust the values for your deployment environment.
```
# PostgreSQL connection – replace with your actual DB URL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
```

## Installation
```bash
npm ci            # installs exact versions from package-lock.json
```

## Database setup
```bash
# Apply migrations
npx prisma migrate deploy
# (Optional) Seed data for local development
node ./prisma/seed.js   # if a seed script exists
```

## Build the production bundle
```bash
npm run build    # creates an optimized Next.js build in .next
```

## Start the server
```bash
npm start        # runs `next start` using the built assets
```

## Admin panel
The admin UI is available at `/admin` after the server is running and a working database connection is configured. It uses Prisma for data access.

## Release packaging
The source code is packaged as a clean ZIP file (no `node_modules`, no dev‑only files):
```bash
git archive --format=zip --output=ues_abroad_release.zip HEAD
```
Send `ues_abroad_release.zip` to your deployment partner (Conzaire).

## Tagging
A git tag is created for this release:
```bash
git tag -a v1.0.0 -m "Release v1.0.0"
# push the tag if desired
# git push origin v1.0.0
```

---
*All lint warnings have been addressed where possible; remaining unused‑variable warnings are harmless for production but can be cleaned manually if desired.*
