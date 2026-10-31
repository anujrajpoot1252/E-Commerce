# 🛍️ ShopEase - Modern Full-Stack E-Commerce Website

ShopEase is a full-featured e-commerce platform built using modern web architecture:
**Frontend (HTML5/CSS3/JavaScript) + PHP Session Layer + Node.js/Express REST API + MongoDB**.

---

## 📌 Project Architecture

```
[ User Browser ]
       │  (HTTPS Requests)
       ▼
[ Frontend: HTML5 + CSS3 + Vanilla JS ]
       │
       ├───► [ PHP Services: Sessions, Server-rendered pages & Forms ]
       │            │ (API Requests via cURL)
       │            ▼
       └───► [ Node.js + Express: REST API & Business Logic ]
                    │ (Mongoose ODM)
                    ▼
             [ MongoDB Database ]
```

---

## 🚀 Today's Progress (Day 1 & Day 2 Completed)

### ✅ Day 1: Environment & Dependency Setup
- Added `bcryptjs` to `backend/package.json` for password hashing and authentication.
- Created `backend/.env` configuration template with PORT, MongoDB URIs, and JWT Secrets.
- Updated `backend/config/db.js` with dynamic fallback support for database connection strings.

### ✅ Day 2: Server Routing & Architecture Wiring
- Mounted all core business logic REST routes into `backend/server.js`:
  - `POST /api/auth/signup` & `POST /api/auth/login` (Authentication)
  - `GET /api/products` & `GET /api/products/:id` (Product Catalog)
  - `GET /api/cart`, `POST /api/cart/add`, `DELETE /api/cart/remove/:id` (Shopping Cart)
  - `POST /api/orders/create`, `GET /api/orders/my-orders` (Order Management & Stock Deduction)
- Integrated `cors` middleware to allow cross-origin requests from Frontend and PHP.
- Connected Centralized Error Handler middleware (`errorHandler.js`).
- Resolved model casing inconsistencies (`User.js`).

---

## 📂 Project Folder Structure

```text
E-Commerce/
├── backend/
│   ├── config/ (db.js)
│   ├── controllers/ (auth, product, cart, order)
│   ├── middleware/ (auth, errorHandler)
│   ├── models/ (User, Product, Cart, Order, Category, Payment)
│   ├── routes/ (authRoutes, productRoutes, cartRoutes, orderRoutes)
│   ├── package.json
│   └── server.js
├── database/
│   ├── mongo_schema.js
│   └── schema.sql
├── frontend/ (In Progress - Multi-page UI)
├── php/ (Scheduled - Session & Authentication Bridge)
└── README.md
```

---

## 🎯 Next Step (Day 3)
- Connect MongoDB (Local/Atlas) and run sample data seeder (`seed.js`).
- Test all REST API endpoints end-to-end.
