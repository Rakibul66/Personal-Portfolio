# 👨‍💻 MD. Rakibul Hasan - Full-Stack Portfolio & CMS Studio

A modern, high-performance personal portfolio, digital asset marketplace, and real CMS administrative studio built with **React 18, TypeScript, Tailwind CSS, NestJS 10, Prisma ORM, and PostgreSQL**.

---

## 🚀 Key Features

- **Dynamic Public Portfolio**:
  - **Selected Works**: Responsive 3-column project showcase with technology badges, external links (Play Store, GitHub, Live Demo), and media preview.
  - **In-House Ventures & Income Sites**: Showcase of proprietary micro-SaaS platforms, developer kits, and revenue metrics.
  - **Launch Archive & Video Showcase**: Interactive carousel supporting YouTube embeds and uploaded HTML5 video playback (`.mp4`, `.webm`).
  - **Client Reviews & Testimonials**: Verified client reviews featuring 5-star ratings, quotes, company associations, and attached video reviews (with automatic YouTube Shorts / standard watch URL parsing).
  - **Technical Articles & Insights**: Engineering blog articles with tag filtering and dedicated article reader pages.
  - **Multi-Page Catalog Routes**:
    - `/` — Homepage with hero, selected works, intro video / showcase, ventures, verified reviews, and real visitor counter.
    - `/projects` — Archive with search, category filtering, 3 display themes (Grid, Cinematic Showcase, Minimal List), and pagination.
    - `/projects/:id` — Dedicated full-page project details route with live preview, deep breakdown, technologies, and related works.
    - `/ventures` — Independent digital asset portfolio.
    - `/blog` — Technical publications catalog with tag filtering.
    - `/blog/:slug` — Dedicated full-page article reader.
    - `/contact` — Direct message proposals with automatic database persistence.

- **Admin Control Studio (`/admin`)**:
  - Secure JWT authentication (`admin@rakibulhr.dev`).
  - **List-First UX**: Clean data tables displayed first with edit/delete actions, search filters, and top "+ Add" buttons that open dedicated forms.
  - **Cloud Media Pipeline (Cloudinary)**: Uploaded images, developer intro videos, demo clips, and CV documents (PDF/DOCX) stream directly to Cloudinary CDN with permanent HTTPS URLs.
  - Full management of Projects, In-House Ventures, Showcase & Intro Videos, Client Reviews, Articles, Companies, Education, Bio Links, and CV Upload.
  - Real-time visitor tracking and analytics.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, TypeScript, Vite 5, Tailwind CSS, Framer Motion, Lucide Icons, Swiper
- **Backend API**: NestJS 10, TypeScript, Prisma ORM 5, Passport JWT, Multer Memory Storage
- **Database**: PostgreSQL (Hosted on **Neon.tech** cloud)
- **Cloud Storage & CDN**: **Cloudinary** for permanent media (images, videos, CV files)

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- npm

### 1. Backend Setup (NestJS + Prisma + PostgreSQL)
```bash
cd server
npm install
```
Ensure your `server/.env` contains your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://neondb_owner:...@ep-weathered-surf-azl49bdw-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="rakibul_secret_jwt_key_2026_super_secure"
PORT=4000
```
Sync database schema and start the API:
```bash
npx prisma db push
npm run start:dev
```
*API runs at: `http://localhost:4000`*

### 2. Frontend Setup (React + Vite)
In the project root:
```bash
npm install
npm run dev
```
*Frontend runs at: `http://localhost:5173`*

---

## 🔐 Admin Studio Access

The Admin Studio is located at `/admin` (e.g. `https://your-domain.com/admin` or `http://localhost:5173/admin`).
- Initial login credentials are set via the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables in your server `.env` or deployment dashboard.
- Password hashes are securely verified via bcrypt, and sessions use signed JWT bearer tokens.

---

## 📡 REST API Endpoints Summary

> 📘 **Full API Documentation**: Complete request/response schemas, JWT auth guides, and payload examples are available in [API_DOCUMENTATION.md](file:///Users/roxy/Downloads/RakibulHR/API_DOCUMENTATION.md).

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public | Live API Health Check & Route Index |
| `POST` | `/auth/login` | Public | Acquire Admin Bearer JWT Token |
| `GET` | `/projects` | Public | List portfolio projects |
| `POST` | `/projects` | Admin | Create new project |
| `PATCH` | `/projects/:id` | Admin | Update project |
| `DELETE` | `/projects/:id` | Admin | Delete project |
| `GET` | `/ventures` | Public | List in-house ventures |
| `POST` | `/ventures` | Admin | Add venture/income site |
| `GET` | `/showcase` | Public | List video showcase items |
| `POST` | `/showcase` | Admin | Add YouTube or uploaded demo |
| `GET` | `/profile/references` | Public | List client reviews & testimonials |
| `POST` | `/profile/references` | Admin | Add client review with optional video |
| `PATCH` | `/profile/references/:id` | Admin | Update client review |
| `POST` | `/upload` | Admin | Upload images/videos from device (up to 100MB) |
| `POST` | `/messages` | Public | Submit proposal/inquiry message |
| `GET` | `/messages` | Admin | View inbox inquiries |

---

## 🌐 Production Deployment Guide (100% Free Forever)

This project is architected for zero-cost production deployment using **Render** (Backend API), **Vercel** (Frontend), and **Neon.tech** (Cloud Database).

```
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     Frontend (Vercel)           │ ───►  │     Backend API (Render.com)    │
│  https://rakibulhr.dev          │       │  https://rakibulhr-api.onrender │
└─────────────────────────────────┘       └────────────────┬────────────────┘
                                                           │
                                                           ▼
                                          ┌─────────────────────────────────┐
                                          │  Neon.tech PostgreSQL (Active)  │
                                          └─────────────────────────────────┘
```

### 1. Backend Deployment on Render.com
1. Sign in to [Render.com](https://render.com) with GitHub.
2. Click **New +** → **Web Service**.
3. Select the repository `Rakibul66/RakibulHR`.
4. Configure with these settings:
   - **Branch**: `2.0` *(or `main` if merged)*
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `node dist/src/main`
5. Under **Environment Variables**, configure your private credentials:
   - `DATABASE_URL`: `your-neon-postgres-connection-string`
   - `JWT_SECRET`: `your-secure-random-jwt-secret`
   - `PORT`: `4000`
   - `ADMIN_EMAIL`: `your-admin-email`
   - `ADMIN_PASSWORD`: `your-strong-admin-password`
6. Click **Deploy Web Service**. You will receive your public API endpoint:
   `https://rakibulhr-api.onrender.com`

### 2. Frontend Deployment on Vercel
1. Open your project on [Vercel](https://vercel.com).
2. Go to **Settings** → **Environment Variables**.
3. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://rakibulhr-api.onrender.com` *(your Render API URL)*
4. Redeploy. Your SPA routing is pre-configured via `vercel.json` to handle all direct page links (`/projects`, `/ventures`, `/blog`, `/contact`, `/admin`).

---

## 🔍 SEO & Web Quality

- **Meta Tags**: Optimized Open Graph, Twitter Cards, Google indexing directives, canonical tags, and mobile viewport configuration in `index.html`.
- **Search Engine Discovery**: Includes `public/robots.txt` and `public/sitemap.xml` mapping all public routes.
- **Performance**: Zero dummy static data; asynchronous state loading with fallbacks and responsive layouts.
