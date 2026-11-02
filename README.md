# ShopEase

A full-stack e-commerce web application with PHP session services, a Node.js REST API, and MongoDB persistence.

---

## Architecture

```text
[ User Browser ]
       |  (HTTP Requests)
       v
[ Frontend: HTML5, CSS3, JavaScript ]
       |
       +---> [ PHP Services: Sessions, Server-rendered pages, Form processing ]
       |            | (API calls via cURL)
       |            v
       +---> [ Node.js & Express: REST API & Business Logic ]
                    | (Mongoose ODM)
                    v
             [ MongoDB Database ]
```

---

## Project Structure

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
├── frontend/
├── php/
├── .agents/skills/unslop/
└── README.md
```

---

## Progress

### Phase 1: Environment and Core Wiring
- Added `bcryptjs` dependency for credential hashing.
- Configured environment variables template (`.env`).
- Added database connection fallback handling in `db.js`.
- Wired REST endpoints into Express `server.js`:
  - Authentication: `/api/auth`
  - Products: `/api/products`
  - Cart: `/api/cart`
  - Orders: `/api/orders`
- Configured CORS and centralized error handling middleware.
- Resolved model naming consistency (`User.js`).
- Installed `unslop` design skill for UI redline reviews and clean design standards.

### Next Milestone
- Seed sample catalog data in MongoDB (`seed.js`).
- Verify API endpoints end-to-end.
- Implement PHP session and authentication bridge.

---

## Local Development

- **Frontend Demo Server:** Run `php -S localhost:8000` to view the interactive test interface.
- **Backend API:** Run `node backend/server.js` (starts on port 5000 once Node.js is installed).
