# 📡 RakibulHR Portfolio & CMS — REST API Documentation

- **Base URL (Local)**: `http://localhost:4000`
- **Base URL (Production)**: `https://rakibulhr.onrender.com`
- **Authentication**: Bearer JWT Token (`Authorization: Bearer <TOKEN>`)
- **Default Content-Type**: `application/json`

---

## 📑 Table of Contents
1. [Authentication (`/auth`)](#1-authentication)
2. [Health Check (`/`)](#2-health-check)
3. [Projects (`/projects`)](#3-projects)
4. [In-House Ventures (`/ventures`)](#4-in-house-ventures)
5. [Showcase & Video Walkthroughs (`/showcase`)](#5-showcase--video-walkthroughs)
6. [Client Reviews & References (`/profile/references`)](#6-client-reviews--references)
7. [Articles & Blog (`/blogs`)](#7-articles--blog)
8. [Profile & Bio Configuration (`/profile`)](#8-profile--bio-configuration)
9. [Career Experience & Education (`/profile/experiences`)](#9-career-experience--education)
10. [Inquiries & Contact Proposals (`/messages`)](#10-inquiries--contact-proposals)
11. [Direct Media Uploads (`/upload`)](#11-direct-media-uploads)

---

## 1. Authentication

### `POST /auth/login`
Authenticate admin user and acquire JWT bearer token.
- **Access**: Public
- **Request Body**:
```json
{
  "email": "admin@example.com",
  "password": "your_secure_password"
}
```
- **Response `200 OK`**:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "e8a9037f-92c8-4f91-863b-01d6421c4f53",
    "email": "admin@example.com",
    "name": "Admin User"
  }
}
```

---

## 2. Health Check

### `GET /`
Verifies live API deployment status and active services.
- **Access**: Public
- **Response `200 OK`**:
```json
{
  "status": "online",
  "message": "RakibulHR Portfolio & CMS API is live and healthy",
  "timestamp": "2026-10-28T02:15:00.000Z",
  "version": "2.0.0",
  "endpoints": ["/projects", "/ventures", "/showcase", "/blogs", "/profile/references", "/profile", "/messages"]
}
```

---

## 3. Projects

### `GET /projects`
Returns all portfolio projects ordered by priority.
- **Access**: Public
- **Response `200 OK`**:
```json
[
  {
    "id": "586be5fb-caa6-4eb6-829b-e5bd7ca04018",
    "title": "Envato Sales Tracker",
    "subtitle": "Real-time author earnings tracking",
    "description": "Cross-platform mobile app built with Flutter and NestJS.",
    "technologies": ["Flutter", "Dart", "NestJS"],
    "category": "Mobile Application",
    "imageUrl": "https://rakibulhr.onrender.com/uploads/1793125284140.png",
    "githubUrl": "https://github.com/Rakibul-Hasan-Roxy/sales-tracker",
    "liveUrl": "https://apps.apple.com/app/id6758573315",
    "playStoreUrl": "https://play.google.com/store/apps/details?id=com.sales.tracker",
    "appStoreUrl": "https://apps.apple.com/app/id6758573315",
    "featured": true,
    "order": 1
  }
]
```

### `POST /projects`
Creates a new portfolio project.
- **Access**: Admin (JWT)
- **Headers**: `Authorization: Bearer <TOKEN>`
- **Request Body**:
```json
{
  "title": "New SaaS Mobile App",
  "subtitle": "Subscription mobile client",
  "description": "Production mobile system built with Clean Architecture.",
  "technologies": ["Flutter", "Kotlin", "PostgreSQL"],
  "category": "Mobile Application",
  "imageUrl": "https://images.unsplash.com/photo-1551650975-87deedd944c3",
  "liveUrl": "https://demo.myapp.com",
  "featured": true
}
```

### `PATCH /projects/:id`
Updates an existing project.
- **Access**: Admin (JWT)

### `DELETE /projects/:id`
Deletes a project.
- **Access**: Admin (JWT)

---

## 4. In-House Ventures

### `GET /ventures`
Returns all in-house digital products and income sites.
- **Access**: Public
- **Response `200 OK`**:
```json
[
  {
    "id": "c2f02711-3e27-4b81-91c4-da48c48be2c1",
    "title": "FlutterFlow SaaS Kit",
    "tagline": "Ready-to-launch starter kits for developers",
    "description": "Commercial boilerplate collection generating recurring digital asset income.",
    "category": "Digital Products",
    "imageUrl": "https://images.unsplash.com/...",
    "linkUrl": "https://rakibulhr.dev",
    "linkText": "Visit Platform",
    "status": "ACTIVE",
    "revenue": "$2.4k/mo",
    "order": 0
  }
]
```

### `POST /ventures`
- **Access**: Admin (JWT)
- **Request Body**: `title`, `tagline`, `description`, `category`, `imageUrl`, `linkUrl`, `linkText`, `status`, `revenue`

### `PATCH /ventures/:id`
- **Access**: Admin (JWT)

### `DELETE /ventures/:id`
- **Access**: Admin (JWT)

---

## 5. Showcase & Video Walkthroughs

### `GET /showcase`
Fetches all interactive launch archive demos and video walkthroughs.
- **Access**: Public
- **Response `200 OK`**:
```json
[
  {
    "id": "11a5fba9-4769-45b7-a243-4ad695b9e8e2",
    "title": "jahkno Radio",
    "description": "Audio streaming project demo.",
    "youtubeUrl": "https://www.youtube.com/watch?v=AgC_Wq7aWYU",
    "videoFile": null,
    "thumbnail": null,
    "category": "Audio App",
    "order": 1
  }
]
```

### `POST /showcase`
Creates a video showcase item.
- **Access**: Admin (JWT)
- **Request Body**:
```json
{
  "title": "Mobile Banking UI Flow",
  "description": "Full screen recording walkthrough",
  "youtubeUrl": "https://youtube.com/shorts/tCY2M49NiCM",
  "videoFile": null,
  "category": "FinTech Demo",
  "order": 0
}
```

### `PATCH /showcase/:id`
- **Access**: Admin (JWT)

### `DELETE /showcase/:id`
- **Access**: Admin (JWT)

---

## 6. Client Reviews & References

### `GET /profile/references`
Returns all client testimonials, ratings, and attached review videos.
- **Access**: Public
- **Response `200 OK`**:
```json
[
  {
    "id": "9371b718-9dfe-462b-9247-de6782c5994e",
    "name": "Md Shanto Islam",
    "role": "Digital marketing executive",
    "company": "Ads Agency LLC",
    "email": "shantoislam@gmail.com",
    "feedback": "MD Rakibul developed a mobile app for our ads agency that streamlined our daily payroll and operations.",
    "avatarUrl": "https://rakibulhr.onrender.com/uploads/shanto.png",
    "rating": 5,
    "videoUrl": "https://youtube.com/shorts/tCY2M49NiCM",
    "videoType": "YOUTUBE"
  }
]
```

### `POST /profile/references`
- **Access**: Admin (JWT)
- **Request Body**: `name`, `role`, `company`, `feedback`, `avatarUrl`, `rating` (1-5), `videoUrl`, `videoType` ("YOUTUBE" | "DEVICE")

### `PATCH /profile/references/:id`
- **Access**: Admin (JWT)

### `DELETE /profile/references/:id`
- **Access**: Admin (JWT)

---

## 7. Articles & Blog

### `GET /blogs`
Returns published blog articles.
- **Access**: Public

### `GET /blogs/:slug`
Fetches a single article by URL slug.
- **Access**: Public

### `POST /blogs`
Publishes a new technical post.
- **Access**: Admin (JWT)
- **Request Body**: `title`, `slug`, `excerpt`, `content`, `coverImage`, `tags`, `readingTime`

### `PATCH /blogs/:id`
- **Access**: Admin (JWT)

### `DELETE /blogs/:id`
- **Access**: Admin (JWT)

---

## 8. Profile & Bio Configuration

### `GET /profile`
Returns bio, personal titles, contact emails, and social links.
- **Access**: Public

### `PUT /profile`
Updates profile settings and contact details.
- **Access**: Admin (JWT)
- **Request Body**:
```json
{
  "name": "MD. Rakibul Hasan",
  "title": "Mobile App Developer (Flutter, Jetpack Compose, SwiftUI)",
  "headline": "Engineering scalable mobile ecosystems and premium digital products.",
  "email": "contact@rakibulhr.dev",
  "linkedinUrl": "https://linkedin.com/in/rakibul-hasan-roxy",
  "githubUrl": "https://github.com/Rakibul-Hasan-Roxy"
}
```

---

## 9. Career Experience & Education

### `GET /profile/experiences?type=EXPERIENCE`
Fetches company employment history.
- **Access**: Public

### `GET /profile/experiences?type=EDUCATION`
Fetches degrees and academic history.
- **Access**: Public

### `POST /profile/experiences`
- **Access**: Admin (JWT)
- **Request Body**: `role`, `company`, `location`, `period`, `details` (array of bullet points), `type` ("EXPERIENCE" | "EDUCATION")

### `DELETE /profile/experiences/:id`
- **Access**: Admin (JWT)

---

## 10. Inquiries & Contact Proposals

### `POST /messages`
Submits a client proposal or project inquiry.
- **Access**: Public
- **Request Body**:
```json
{
  "name": "Jane Cooper",
  "email": "jane@company.com",
  "subject": "Mobile App Development Contract",
  "message": "We would like to hire you to build an iOS and Android app in Flutter."
}
```

### `GET /messages`
Retrieves all customer inquiries.
- **Access**: Admin (JWT)

### `PATCH /messages/:id/read`
Marks message as read.
- **Access**: Admin (JWT)

### `DELETE /messages/:id`
Deletes inquiry from inbox.
- **Access**: Admin (JWT)

---

## 11. Direct Media Uploads

### `POST /upload`
Uploads images (`.jpg`, `.png`, `.webp`, `.svg`) or video files (`.mp4`, `.webm`, `.mov`) directly to cloud/server disk storage (Max: 100MB).
- **Access**: Admin (JWT)
- **Headers**:
  - `Authorization: Bearer <TOKEN>`
  - `Content-Type: multipart/form-data`
- **Form Data**:
  - `file`: `<Binary Media File>`
- **Response `201 Created`**:
```json
{
  "url": "https://rakibulhr.onrender.com/uploads/1793125284140-566508031.mp4",
  "filename": "1793125284140-566508031.mp4",
  "mimetype": "video/mp4",
  "size": 1458920
}
```
