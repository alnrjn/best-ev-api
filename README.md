# Best EV API 🚗⚡

A high-performance, modular REST API for an Electric Vehicle (EV) catalog and management system. Built with **Fastify**, **TypeScript**, and **Prisma ORM**.

---

## 🏗 Architecture & Design

This project follows a **Feature-based Modular Structure** to ensure scalability and maintainability.

- **`src/modules/`**: Contains feature-specific logic. Each module includes its own routes, controllers, and services.
- **`src/plugins/`**: Shared Fastify plugins (e.g., Prisma Client instance).
- **`src/middleware/`**: Shared security and authentication middleware.
- **`src/app.ts`**: Core application configuration (CORS, Multipart, Static files).
- **`src/server.ts`**: Application entry point.

---

## 🛠 Tech Stack

- **Framework**: [Fastify](https://www.fastify.io/) (Fast & Low overhead)
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Auth**: JWT (jsonwebtoken) & bcryptjs
- **File Handling**: @fastify/multipart & @fastify/static

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18+)
- MySQL Database

### 2. Installation

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://user:password@localhost:3306/best_ev"
NEXTAUTH_URL="http://localhost:3000"
JWT_SECRET="your_secret_key"
```

### 4. Database Setup

```bash
# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Seed initial Admin user
npx tsx prisma/seed.ts
```

_Default Seed Admin: `admin@bestev.com` / `password123`_

### 5. Run the Server

```bash
# Development mode
npm run dev

# Production Build
npm run build
npm start
```

---

## 📡 API Endpoints

### 🔓 Public Routes

| Method | Endpoint             | Description                                      |
| :----- | :------------------- | :----------------------------------------------- |
| `GET`  | `/api/v1/cars`       | Get paginated cars (Filtered by Search/Category) |
| `GET`  | `/api/v1/cars/:slug` | Get specific car details by slug                 |
| `GET`  | `/api/v1/uploads/*`  | Access uploaded car images                       |

### 🔐 Auth Routes

| Method | Endpoint        | Description            |
| :----- | :-------------- | :--------------------- |
| `POST` | `/api/v1/login` | Login to get JWT Token |

### 🛠 Admin Routes (Protected - Requires Bearer Token)

| Method   | Endpoint                 | Description                  |
| :------- | :----------------------- | :--------------------------- |
| `POST`   | `/api/v1/upload`         | Upload images (Max 10MB)     |
| `GET`    | `/api/v1/admin/cars`     | Get all cars (Manager view)  |
| `GET`    | `/api/v1/admin/cars/:id` | Get car by ID                |
| `POST`   | `/api/v1/admin/cars`     | Create new car with variants |
| `PUT`    | `/api/v1/admin/cars/:id` | Update car and variants      |
| `DELETE` | `/api/v1/admin/cars/:id` | Soft Delete car              |

---

## ⚙️ Key Features

- **Soft Delete**: Records are never physically deleted. `is_delete` flag is used.
- **Snake Case Database**: Mapping between camelCase (JS) and snake_case (SQL) via Prisma `@map`.
- **Image Optimization**: Unique filename generation and 10MB upload limit.
- **Authentication**: Secure JWT-based admin access.
- **Auto-healing**: Automatically creates `public/uploads` directory on startup.

---

## 📝 License

ISC
