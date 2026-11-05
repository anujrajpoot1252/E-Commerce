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
│   ├── config/ (config.php)
│   ├── handlers/ (login_process.php, create_process.php)
│   ├── includes/ (api_helper.php, session.php)
│   ├── account.php
│   ├── create-account.php
│   ├── index.php
│   ├── login.php
│   └── logout.php
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

### Phase 2: PHP Services and Session Layer (Completed)
- Built `php/includes/api_helper.php` for cURL REST API communication with the Node.js backend.
- Implemented `php/includes/session.php` with authentication state helpers (`is_logged_in`, `require_login`, `require_admin`).
- Created authentication form handlers: `login_process.php` and `create_process.php`.
- Created server-rendered user interface pages:
  - `php/index.php`: Services portal and session status monitor.
  - `php/login.php`: Clean sign-in form with flash messages.
  - `php/create-account.php`: Account creation form.
  - `php/account.php`: Protected user profile and token session inspector.
  - `php/logout.php`: Safe session termination.

### Next Milestone
- Seed sample catalog data in MongoDB (`seed.js`).
- Verify API endpoints end-to-end.

---

## Local Development

- **Frontend Demo Server:** Run `php -S localhost:8000` to view the interactive test interface.
- **Backend API:** Run `node backend/server.js` (starts on port 5000 once Node.js is installed).
