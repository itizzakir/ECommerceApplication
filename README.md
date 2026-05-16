# 🛍️ Velora E-Commerce Platform

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.9-brightgreen?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

> **A modern, full-stack enterprise e-commerce solution built for performance, scalability, and a seamless user experience.**

---

# 🌐 Live Demo

🚀 **Frontend Live Demo:**  
👉 https://e-commerce-application-demo-live.vercel.app/

---

# 🌟 Overview

**Velora** is a robust e-commerce application designed to bridge the gap between complex backend logic and a fluid frontend user interface. It features a secure, scalable **Spring Boot** backend and a dynamic **React** frontend powered by **Vite**. The platform supports role-based access control (RBAC), real-time data handling, and a responsive UI experience.

---

# 🚀 Features

## 👤 Customer Features

- 🛒 Add to Cart & Cart Management
- ❤️ Wishlist Functionality
- 📦 Order Tracking System
- 🔍 Product Search & Filtering
- 💳 Secure Checkout Flow
- 👤 User Profile Management
- ⭐ Product Ratings & Reviews

---

## 🛡️ Admin Features

- 📊 Dashboard Analytics
- 📦 Product CRUD Management
- 📂 Category Management
- 👥 User Management
- 📝 Order Processing
- ⭐ Review Moderation

---

# 🏗️ Architecture

The application follows a layered architecture:

```text
Frontend (React + Vite)
        ↓
REST API (Spring Boot)
        ↓
MySQL Database
```

---

# 📂 Project Structure

```text
ECommerceApplication/
├── 📂 ECommerceApplication Backend/
│   ├── src/main/java/com/velora/
│   │   ├── controllers/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── security/
│   └── src/main/resources/
│
└── 📂 ECommerceApplication Frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   │   ├── admin/
    │   │   └── customer/
    │   └── routes/
    └── public/
```

---

# 🛠️ Tech Stack

## Backend

| Technology | Purpose |
|---|---|
| Java 17 | Backend Language |
| Spring Boot | Backend Framework |
| Spring Security | Authentication |
| JWT | Authorization |
| Spring Data JPA | ORM |
| MySQL | Database |
| Maven | Dependency Management |

---

## Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI Development |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router | Routing |
| Axios | API Calls |
| Lucide React | Icons |

---

# 🔌 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register User |
| POST | `/api/auth/signin` | Login User |
| GET | `/api/products` | Get All Products |
| GET | `/api/products/{id}` | Get Product Details |
| POST | `/api/cart/add` | Add Item to Cart |
| POST | `/api/orders/place` | Place Order |
| GET | `/api/admin/stats` | Admin Dashboard Stats |

---

# ⚙️ Installation Guide

## 📌 Prerequisites

- Java JDK 17+
- Node.js 18+
- MySQL Server

---

# 1️⃣ Database Setup

```sql
CREATE DATABASE velora_db;
```

---

# 2️⃣ Backend Setup

```bash
cd "ECommerceApplication Backend"
```

Update database credentials inside:

```properties
src/main/resources/application.properties
```

Run backend:

```bash
./mvnw spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 3️⃣ Frontend Setup

```bash
cd "ECommerceApplication Frontend"
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 📸 Screenshots

| Home Page | Product Page |
|---|---|
| Add Screenshot | Add Screenshot |

| Admin Dashboard | Cart |
|---|---|
| Add Screenshot | Add Screenshot |

---

# 🌍 Deployment

## Frontend Deployment

Deploy easily on:

- Vercel
- Netlify

### Live Demo

👉 https://e-commerce-application-demo-live.vercel.app/

---

# 🔐 Authentication

- JWT Authentication
- Protected Routes
- Role-Based Access
- Secure APIs

---

# 📈 Future Improvements

- Stripe Payment Integration
- Email Notifications
- Product Recommendation AI
- Multi-Vendor Marketplace
- Dark Mode Support

---

# 🤝 Contributing

1. Fork Repository
2. Create Feature Branch
3. Commit Changes
4. Push Changes
5. Create Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## ❤️ Built with Passion by Velora Team

</div>
