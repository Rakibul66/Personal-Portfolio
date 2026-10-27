# 100% Free PostgreSQL & Backend Hosting Setup Guide

## 1. Free Cloud PostgreSQL (Pick Either Neon or Supabase)

### Option A: Neon.tech (Recommended - Takes 1 minute)
1. Go to [https://neon.tech](https://neon.tech) and sign up with GitHub (free).
2. Click **Create Project** (Name: `rakibulhr-portfolio`).
3. You will immediately see a **Connection string** that looks like:
   ```text
   postgresql://rakibulhr_owner:AbC123XyZ@ep-cool-flower-123456.us-east-2.aws.neon.tech/rakibulhr?sslmode=require
   ```
4. Copy this string.

### Option B: Supabase
1. Go to [https://supabase.com](https://supabase.com) and create a free project.
2. In **Project Settings** -> **Database**, copy the **URI connection string** (`Transaction` or `Session` mode on port 5432 or 6543).

---

## 2. Connect Your Local NestJS API to Your Free Cloud Database

1. Open `server/.env` and replace `DATABASE_URL` with your copied string:
   ```env
   DATABASE_URL="your_neon_or_supabase_connection_string"
   ```
2. In your terminal, run the initial migration & seed:
   ```bash
   cd server
   npx prisma db push
   npm run seed
   ```
   *This automatically creates all tables (`User`, `Project`, `Message`, `Skill`, `Experience`) and inserts your default projects and admin account!*

---

## 3. Free Backend Deployment on Render.com

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: add NestJS backend with Prisma and PostgreSQL"
   git push origin main
   ```
2. Go to [https://render.com](https://render.com) and sign in with GitHub.
3. Click **New +** -> **Web Service**.
4. Select your `RakibulHR` repository.
5. Fill in the settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Instance Type**: **Free**
6. Under **Environment Variables**, add:
   - `DATABASE_URL` = *(Your Neon or Supabase connection string)*
   - `JWT_SECRET` = *(Any random secure string)*
   - `ADMIN_EMAIL` = `admin@rakibulhr.dev`
   - `ADMIN_PASSWORD` = *(Your desired secure password)*
7. Click **Create Web Service**. Render will deploy your live API with free HTTPS (e.g., `https://rakibulhr-portfolio-api.onrender.com`).
