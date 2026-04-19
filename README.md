# E-commerce Backend API

Production-grade REST API built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- JWT-based authentication with bcrypt password hashing
- RESTful API with CRUD operations
- PostgreSQL database with Prisma ORM
- Input validation using Zod
- CORS configured for frontend
- Error handling middleware
- Protected routes with role-based access

## Tech Stack

- **Node.js** & **Express.js** - Server framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Zod** - Schema validation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup PostgreSQL Database

Make sure PostgreSQL is installed and running. Create a database:

```sql
CREATE DATABASE ecommerce_db;
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and update with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db?schema=public"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

### 4. Run Prisma Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

### 5. Seed Database (Optional)

```bash
node src/seed.js
```

This creates:
- Admin user: `admin@example.com` / `admin123`
- Regular user: `john@example.com` / `john123`
- 8 sample products

### 6. Start Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products (with filters, search, pagination)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get all categories
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/items` - Add item to cart (protected)
- `PUT /api/cart/items/:itemId` - Update cart item (protected)
- `DELETE /api/cart/items/:itemId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders/my-orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order by ID (protected)
- `GET /api/orders/all` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Reviews
- `GET /api/reviews/:productId` - Get product reviews
- `POST /api/reviews/:productId` - Create review (protected)

## Project Structure

```
Backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── reviewController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── reviewRoutes.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── password.js
│   │   └── validation.js
│   ├── seed.js
│   └── server.js
├── .env
├── .env.example
├── .gitignore
└── package.json
```
"# Ecommerce-Backend" 
