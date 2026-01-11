# 🛍️ Velora E-Commerce Platform

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.9-brightgreen?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)

> **A modern, full-stack enterprise e-commerce solution built for performance, scalability, and a seamless user experience.**

---

## 🌟 Overview

**Velora** is a robust e-commerce application designed to bridge the gap between complex backend logic and a fluid frontend user interface. It features a secure, microservices-ready **Spring Boot** backend and a dynamic **React** frontend powered by **Vite**. The platform supports comprehensive role-based access control (RBAC) for Admins and Customers, real-time data management, and a highly responsive design.

---

## 🚀 Key Features

### 👤 Customer Experience
*   **🛒 Smart Cart System**: Persistent shopping cart with real-time price calculation and stock validation.
*   **❤️ Wishlist Management**: Save favorite items for later.
*   **📦 Order Tracking**: Detailed order history and status tracking (Pending → Shipped → Delivered).
*   **🔍 Advanced Search & Filtering**: Browse products by category, price range, and ratings.
*   **💳 Secure Checkout**: Integrated payment processing flow (Placeholder/Stripe ready).
*   **👤 User Profile**: Manage personal details, addresses, and account settings.

### 🛡️ Admin Dashboard
*   **📊 Analytics Overview**: Visual dashboard for sales performance, user growth, and order stats.
*   **📦 Product Management**: Full CRUD capabilities for inventory, including image handling and stock adjustments.
*   **📂 Category Management**: Organize products into hierarchical categories.
*   **👥 User Management**: View and manage customer accounts and roles.
*   **📝 Order Fulfillment**: Process incoming orders and update their statuses.
*   **⭐ Review Moderation**: Manage product reviews and ratings.

---

## 🏗️ Technical Architecture

The application follows a **Layered RESTful Architecture** ensuring separation of concerns:

1.  **Frontend (Client)**: React Single Page Application (SPA) consuming REST APIs.
2.  **Backend (Server)**: Spring Boot Application exposing REST endpoints.
3.  **Database (Persistence)**: MySQL relational database accessed via Hibernate/JPA.
4.  **Security**: Stateless JWT (JSON Web Token) authentication.

### 📂 Folder Structure
```text
ECommerceApplication/
├── 📂 ECommerceApplication Backend/    # Spring Boot Server
│   ├── src/main/java/com/velora/
│   │   ├── 🎮 controllers/             # API Endpoints
│   │   ├── 📦 model/                   # JPA Entities
│   │   ├── 💾 repository/              # Data Access Layer
│   │   ├── ⚙️ service/                 # Business Logic
│   │   └── 🔒 security/                # JWT & Auth Config
│   └── src/main/resources/             # Config & Static Data
│
└── 📂 ECommerceApplication Frontend/   # React Client
    ├── src/
    │   ├── 🧩 components/              # Reusable UI Components
    │   ├── ⚡ context/                 # State Management (Auth, Cart)
    │   ├── 📄 pages/                   # Application Views
    │   │   ├── 🛡️ admin/               # Admin Dashboard Pages
    │   │   └── 👤 customer/            # Customer Shop Pages
    │   └── 🛣️ routes/                  # App Navigation
    └── public/                         # Static Assets
```

---

## 🛠️ Technology Stack

### Backend (Server)
| Technology | Description |
| :--- | :--- |
| **Java 17** | Core language for robust backend logic. |
| **Spring Boot 3.5.9** | Framework for rapid application development. |
| **Spring Security** | Authentication & Authorization via JWT. |
| **Spring Data JPA** | Hibernate-based ORM for database interactions. |
| **MySQL** | Relational database management system. |
| **Lombok** | Boilerplate code reduction. |
| **Maven** | Dependency management and build automation. |

### Frontend (Client)
| Technology | Description |
| :--- | :--- |
| **React 19.2.0** | Library for building user interfaces. |
| **Vite 7.2.4** | Next-generation frontend tooling (super fast!). |
| **Tailwind CSS 4.1** | Utility-first CSS framework for custom designs. |
| **React Router 6.23** | Standard routing library for React. |
| **Lucide React** | Beautiful, consistent icons. |
| **Axios/Fetch** | HTTP client for API communication. |

---

## 🔌 API Documentation (Snapshot)

The backend provides a rich set of RESTful endpoints.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signin` | Authenticate user & return JWT | Public |
| `POST` | `/api/auth/signup` | Register a new user account | Public |
| `GET` | `/api/products` | Retrieve all products (with pagination) | Public |
| `GET` | `/api/products/{id}` | Get specific product details | Public |
| `POST` | `/api/cart/add` | Add item to user's cart | User |
| `POST` | `/api/orders/place` | Submit a new order | User |
| `GET` | `/api/admin/stats` | Get dashboard analytics | Admin |
| `POST` | `/api/admin/products` | Create a new product | Admin |

---

## 🏃‍♂️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites
*   **Java JDK 17** or higher
*   **Node.js v18** or higher
*   **MySQL Server** running on default port `3306`

### 1. Database Configuration
Create a database named `velora_db` in your MySQL server.
```sql
CREATE DATABASE velora_db;
```
*Note: The application is configured to automatically create tables (`ddl-auto=update`).*

### 2. Backend Setup
1.  Navigate to the backend directory:
    ```bash
    cd "ECommerceApplication Backend"
    ```
2.  Update database credentials in `src/main/resources/application.properties` if necessary:
    ```properties
    spring.datasource.username=YOUR_DB_USERNAME
    spring.datasource.password=YOUR_DB_PASSWORD
    ```
3.  Run the application:
    ```bash
    ./mvnw spring-boot:run
    ```

### 3. Frontend Setup
1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd "ECommerceApplication Frontend"
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open your browser and verify the app is running at `http://localhost:5173`.

---

## 📸 Screenshots

| Customer Home | Product Details |
| :---: | :---: |
| *(Add Screenshot)* | *(Add Screenshot)* |

| Admin Dashboard | Shopping Cart |
| :---: | :---: |
| *(Add Screenshot)* | *(Add Screenshot)* |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

<div align="center">
  <sub>Built with ❤️ by the Velora Team</sub>
</div>
