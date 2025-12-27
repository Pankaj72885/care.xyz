# Care.xyz - Health Care Service Booking Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.8-sky)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF)

## 📋 Overview

**Care.xyz** is a comprehensive full-stack web application designed to facilitate the booking of health care services (such as baby care, elderly care, and post-operative care). Built with modern web technologies, it features a robust role-based access control system (RBAC), secure payment processing, and a powerful admin dashboard for managing the entire platform.

This project demonstrates a production-ready architecture using **Next.js 15 (App Router)**, **Server Actions**, and **PostgreSQL**.

---

## ✨ Key Features

### 👤 For Users

- **Service Discovery**: Browse available care services with detailed descriptions and pricing.
- **Seamless Booking**: Multi-step booking wizard with location selection and cost calculation.
- **Secure Payments**: Integrated Stripe checkout for secure transactions.
- **User Dashboard**:
  - Track booking history and status.
  - Complete payments for pending bookings.
  - Mark services as "Completed" upon delivery.
- **Authentication**: Secure login via Email/Password or Google OAuth.

### 🛡️ For Admins (Comprehensive Dashboard)

A powerful admin panel to manage the entire platform operation.

#### 📊 Dashboard & Analytics

- **Overview Metrics**: Total users, bookings, revenue, and active services.
- **Visual Reports**: Service performance, revenue breakdown, and top-performing services.
- **Quick Navigation**: Intuitively designed dashboard with quick access cards.

#### 🔧 Service Management

- **CRUD Operations**: Create, Read, Update, and Delete services.
- **Status Toggle**: instantly enable/disable services.
- **SEO Optimized**: Auto-generation of URL-friendly slugs.

#### 📅 Booking Management

- **Centralized View**: Monitor all bookings in the system.
- **Status Control**: Manually update booking statuses (`PENDING` → `CONFIRMED` → `COMPLETED` / `CANCELLED`).
- **Real-time Updates**: Changes reflect immediately on user dashboards.

#### 👥 User Management

- **User Database**: View and manage all registered users.
- **Role Management**: Promote/Demote users (Admin/User access).
- **Safety Features**: Protection against self-deletion or self-demotion.

#### 💳 Payment Oversight

- **Transaction History**: Monitor all incoming payments and Stripe intents.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React, Tailwind CSS, Shadcn UI, Lucide Icons
- **Backend**: Next.js Server Actions, NextAuth.js (v5)
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: NextAuth.js (Credentials + Google OAuth)
- **Payments**: Stripe API
- **Tooling**: Bun (Runtime/Package Manager), Zod (Validation), TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js or [Bun](https://bun.sh/) installed
- PostgreSQL database (local or cloud like Neon/Supabase)
- Stripe Account (for payments)
- Google Cloud Console Project (for OAuth)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/care-xyz.git
   cd care-xyz
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/care_xyz"

   # Auth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key"

   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Stripe
   STRIPE_PUBLIC_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
   ```

4. **Initialize Database**

   ```bash
   bunx prisma generate
   bunx prisma db push
   ```

5. **Create Admin User**
   Run the content seeding script to create a default admin:

   ```bash
   bun scripts/create-admin.ts
   ```

6. **Start Development Server**
   ```bash
   bun dev
   ```
   Visit `http://localhost:3000` to see the app.

---

## 📖 Admin Guide

### Accessing the Admin Panel

1. **Login**: Go to `/login` and sign in with admin credentials.
2. **Redirect**: You will be automatically redirected to `/admin`.
3. **Navigation**:
   - **Top Navbar**: Shows "Admin" link and "Admin Panel" in user dropdown.
   - **Sidebar**: Persistent navigation for Services, Users, Payments, and Bookings.
   - **Dashboard Cards**: Quick access to key sections.

### Default Admin Credentials

> ⚠️ **Change password immediately after first login**

- **Email**: `admin@care.xyz`
- **Password**: `Admin@123456`

### Management Features

| Feature | Route | Description |
|Col1|Col2|Col3|
|---|---|---|
| **Services** | `/admin/services` | Add, edit, or remove care services. Toggle visibility. |
| **Bookings** | `/admin/bookings` | View all bookings. Update status (Confirm/Complete/Cancel). |
| **Users** | `/admin/users` | Manage user accounts and roles. |
| **Reports** | `/admin/reports` | View revenue and performance analytics. |

---

## 🧪 Testing Guide

### Test Accounts

| Role      | Email              | Password                                 |
| --------- | ------------------ | ---------------------------------------- |
| **Admin** | `admin@care.xyz`   | `Admin@123456`                           |
| **User**  | `test@example.com` | `password123` (Create via Register page) |

### Testing Flow

1. **User Flow**:
   - Register a new account.
   - Browse Services (`/services`).
   - Book a service (Select Date/Location -> Confirm).
   - Go to Dashboard (`/dashboard`) -> Pay (if implemented) -> Mark as Completed.

2. **Admin Flow**:
   - Login as Admin.
   - Go to Bookings (`/admin/bookings`).
   - Change a booking status to `CONFIRMED`.
   - Go to Services (`/admin/services`) -> Create new service -> Verify it appears on homepage.

---

## 👨‍💻 Scripts

The project includes utility scripts for management:

- **Create Admin**: `bun scripts/create-admin.ts` - Creates or resets the default admin user.
- **Find Admins**: `bun scripts/find-admin.ts` - Lists all admin users in the database.
- **Prisma Studio**: `bunx prisma studio` - Visual database editor (runs on port 5555).

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
