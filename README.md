# BloomCare – 

A full-stack eCommerce platform for menstrual care products built with **Next.js**, **PostgreSQL**, and **Prisma**.

## Features

### 🛍️ eCommerce
- Sanitary pads, Menstrual cups, Tampons
- Hot bags & Heating pads
- Period underwear
- Disposal bags & Waste management kits

### 🧠 Educational Blog
- Period health articles
- Pain relief tips
- Ovulation & cycle tracking
- Hygiene awareness

### ♻️ Waste Management
- Disposal guides
- Eco-friendly products
- Recycling awareness

### 👩‍💻 User Features
- Register / Login
- Add to cart & Wishlist
- Order history
- Checkout

### 👨‍💼 Admin Dashboard
- Add / Edit / Delete products
- Manage orders
- Manage blog posts
- Manage users

## Tech Stack

- **Next.js 16** (App Router)
- **PostgreSQL** (database)
- **Prisma** (ORM)
- **NextAuth v5** (authentication)
- **Tailwind CSS** (styling)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database

### Setup

1. **Clone and install**

   ```bash
   cd girlsm
   npm install
   ```

2. **Configure environment**

   Copy `.env.example` to `.env` and set:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/girlsm?schema=public"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

   Generate `NEXTAUTH_SECRET`:

   ```bash
   openssl rand -base64 32
   ```

3. **Initialize database**

   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

### Seed Accounts

After running `npm run db:seed`:

- **Admin:** admin@bloomcare.com / admin123
- **User:** user@example.com / admin123

## Project Structure

```
src/
├── app/              # App Router pages & API routes
├── components/       # React components
├── lib/              # Utilities (db, auth)
└── types/            # TypeScript types
```

## License

MIT
