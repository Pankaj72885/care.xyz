# Care.xyz - Professional Caregiving Services Platform

[![Live Site](https://img.shields.io/badge/Live-Site-green?style=for-the-badge&logo=vercel)](https://carexyz-production.up.railway.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Pankaj72885/care.xyz)

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.8-sky)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF)

## 📋 Overview

**Care.xyz** is a comprehensive full-stack web application that enables families in Bangladesh to easily book trusted caregiving services for babies, elderly individuals, and people recovering from illness. The platform simplifies discovery, booking, payment, and tracking with a modern, accessible interface, robust authentication, and clear status visibility.

This production-ready application demonstrates modern web development practices using **Next.js 16 (App Router)**, **Server Actions**, **PostgreSQL**, and **Stripe** payments.

---

## ✨ Complete Feature Set

### 🎯 Core Features

#### 🔐 Authentication & Authorization

- **Multiple Auth Methods**: Email/password credentials and Google OAuth via NextAuth.js v5
- **Secure Sessions**: JWT-based authentication with persistent sessions across protected routes
- **Role-Based Access Control (RBAC)**: User and Admin roles with distinct permissions
- **Session Management**: Proper token mapping and session callbacks for seamless user experience
- **Protected Routes**: Middleware-based route protection without unnecessary redirects

#### 🏥 Service Management

- **Service Categories**: Baby Care, Elderly Care, and Sick People Care services
- **Dynamic Service Pages**: SEO-optimized detail pages with metadata for each service
- **Service Catalog**: Browse all available services with descriptions, pricing, and availability
- **Admin Controls**: Full CRUD operations for services (Create, Read, Update, Delete)
- **Status Toggle**: Enable/disable services instantly
- **URL-Friendly Slugs**: Auto-generated SEO-friendly URLs

#### 📅 Booking System

- **Multi-Step Booking Flow**:
  1. **Duration Selection**: Choose hours or days with live validation
  2. **Hierarchical Location**: Division → District → City → Area selection for Bangladesh
  3. **Address Input**: Detailed address collection with validation
  4. **Live Cost Calculation**: Real-time total cost updates based on duration and service rate
  5. **Confirmation**: Review and confirm booking details

- **Booking Lifecycle Management**:
  - **Status Transitions**: `PENDING` → `CONFIRMED` → `COMPLETED` / `CANCELLED`
  - **User Actions**: View booking history, track status, cancel bookings
  - **Admin Actions**: Update booking statuses, manage all bookings centrally

- **My Bookings Dashboard**:
  - Paginated booking list with filters
  - Status badges for quick identification
  - Service details, duration, location, and total cost
  - Action buttons (Pay Now, Mark Complete, Cancel)

#### 💳 Payment Processing

- **Stripe Integration**: Industry-standard secure payment processing
- **Payment Flow**:
  - Client-side Stripe Elements for card input
  - Server-side Payment Intent creation
  - Webhook handling for payment confirmation
  - Automatic booking status update on successful payment
- **Payment Records**: Full transaction history with Stripe Payment Intent IDs
- **Receipt Management**: Stripe-generated receipts for all transactions
- **Admin Payment Oversight**: View and search all payment transactions

#### 👥 User Management

- **User Registration**: Comprehensive signup with NID, name, email, contact, and password
- **Password Validation**: Strong password requirements (6+ chars, uppercase, lowercase)
- **Profile Management**: Users can update name, NID, and contact information
- **User Settings Page**: Dedicated settings page for profile updates
- **Admin User Management**:
  - View all registered users
  - Promote/demote user roles
  - Safety features to prevent self-deletion or self-demotion

#### 🎨 Design & UX

- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Dark/Light Mode**: Full theme support with consistent design tokens
- **Shadcn UI Components**: Accessible, composable UI components
- **Modern Typography**: Clean, readable fonts with proper hierarchy
- **Visual Feedback**: Loading states, success/error toasts, status badges
- **Accessibility**: ARIA labels, keyboard navigation, focus states, readable contrast

#### 📊 Admin Dashboard

- **Overview Metrics**:
  - Total users count
  - Total bookings and revenue
  - Active services count
  - Recent activity feed

- **Visual Analytics**:
  - Service performance charts
  - Revenue breakdown by service
  - Booking status distribution
  - Top-performing services

- **Management Sections**:
  - **Services**: Full CRUD with pricing management
  - **Bookings**: Centralized booking management with status updates
  - **Users**: User database with role management
  - **Payments**: Transaction history with search and filters

#### 🔍 SEO & Metadata

- **Dynamic Metadata**: Service-specific titles and descriptions
- **Open Graph Tags**: Social media sharing optimization
- **Structured URLs**: Clean, semantic URL structure
- **Sitemap Ready**: Proper routing for search engine indexing

#### 🛡️ Security Features

- **Input Validation**: Zod schemas for all forms and API inputs
- **CSRF Protection**: Built-in Next.js CSRF protection
- **Secure Cookies**: HttpOnly, SameSite cookies for sessions
- **Environment Variables**: Proper secrets management
- **Webhook Verification**: Stripe signature verification
- **SQL Injection Prevention**: Prisma ORM parameterized queries

---

## 🛠️ Technology Stack

### Frontend

- **Next.js 15**: App Router, Server Components, Server Actions
- **React 19**: Latest React features with concurrent rendering
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: High-quality, accessible component library
- **Lucide Icons**: Modern icon set
- **React Hook Form**: Performant form handling
- **Zod**: Runtime type validation

### Backend

- **Next.js Server Actions**: Type-safe server mutations
- **NextAuth.js v5**: Authentication and session management
- **Prisma ORM**: Type-safe database client
- **PostgreSQL**: Robust relational database
- **Stripe API**: Payment processing
- **Server Components**: Optimized data fetching

### Development Tools

- **Bun**: Fast JavaScript runtime and package manager
- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Prisma Studio**: Database GUI

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+) or [Bun](https://bun.sh/) installed
- **PostgreSQL** database (local or cloud like Neon/Supabase/Railway)
- **Stripe Account** for payment processing
- **Google Cloud Console Project** for OAuth (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Pankaj72885/care.xyz.git
   cd care.xyz
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/care_xyz"

   # Auth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-super-secret-key-min-32-chars"

   # Google OAuth (Optional)
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

5. **Seed Database** (Optional)

   Create default admin and sample services:

   ```bash
   bun scripts/create-admin.ts
   ```

6. **Start Development Server**

   ```bash
   bun dev
   ```

   Visit `http://localhost:3000` to see the application.

---

## 📖 User Guide

### For Regular Users

1. **Registration**:
   - Navigate to `/register`
   - Fill in NID, name, email, contact, and password
   - Password must be 6+ characters with uppercase and lowercase letters

2. **Browse Services**:
   - Visit homepage or `/services`
   - View detailed information about each service
   - Check pricing and availability

3. **Book a Service**:
   - Click "Book Service" on any service
   - Select duration (hours or days)
   - Choose location (Division → District → City → Area)
   - Enter detailed address
   - Review total cost
   - Confirm booking

4. **Make Payment**:
   - Go to "My Bookings" (`/dashboard/bookings`)
   - Click "Pay Now" on pending bookings
   - Enter card details (Stripe test cards accepted)
   - Receive confirmation

5. **Track Bookings**:
   - View all bookings in dashboard
   - Monitor status changes
   - Mark completed services
   - Cancel if needed

6. **Update Profile**:
   - Access Settings from user dropdown
   - Update name, NID, or contact information
   - Changes saved immediately

---

## 🛡️ Admin Guide

### Accessing the Admin Panel

1. **Login**: Navigate to `/login` and sign in with admin credentials
2. **Access**: You'll be redirected to `/admin` dashboard
3. **Navigation**: Use sidebar for Services, Bookings, Users, and Payments

### Default Admin Credentials

> ⚠️ **Important**: Change password immediately after first login

- **Email**: `admin@care.xyz`
- **Password**: `Admin@123456`

### Admin Features

| Feature       | Route             | Description                                                |
| ------------- | ----------------- | ---------------------------------------------------------- |
| **Dashboard** | `/admin`          | Overview metrics, charts, and quick actions                |
| **Services**  | `/admin/services` | Create, edit, delete services. Toggle active status        |
| **Bookings**  | `/admin/bookings` | View all bookings. Update status (Confirm/Complete/Cancel) |
| **Users**     | `/admin/users`    | Manage user accounts. Promote/demote roles                 |
| **Payments**  | `/admin/payments` | View transaction history. Search and filter payments       |

### Admin Workflows

**Managing Services**:

1. Navigate to `/admin/services`
2. Click "Create Service" to add new service
3. Fill in title, description, category, and base rate
4. Toggle active status to enable/disable
5. Edit or delete existing services

**Managing Bookings**:

1. View all bookings in `/admin/bookings`
2. Filter by status or search by user
3. Click on booking to update status
4. Status flow: PENDING → CONFIRMED → COMPLETED

**Managing Users**:

1. Access `/admin/users` to view all users
2. Search by name or email
3. Promote users to admin or demote to regular user
4. Cannot delete or demote yourself (safety feature)

---

## 🧪 Testing Guide

### Test Accounts

| Role      | Email                  | Password       |
| --------- | ---------------------- | -------------- |
| **Admin** | `admin@care.xyz`       | `Admin@123456` |
| **User**  | Create via `/register` | Your choice    |

### Stripe Test Cards

| Card Number           | Scenario                |
| --------------------- | ----------------------- |
| `4242 4242 4242 4242` | Successful payment      |
| `4000 0000 0000 0002` | Card declined           |
| `4000 0025 0000 3155` | Requires authentication |

Use any future expiry date, any 3-digit CVC, and any postal code.

### Testing Flows

**User Journey**:

1. Register new account at `/register`
2. Browse services at `/services`
3. Book a service (select duration, location, address)
4. View booking in `/dashboard/bookings`
5. Pay with test card
6. Verify status changes to CONFIRMED
7. Mark as completed when done

**Admin Journey**:

1. Login as admin
2. Create new service in `/admin/services`
3. Verify service appears on homepage
4. View all bookings in `/admin/bookings`
5. Update booking status
6. Check payment records in `/admin/payments`
7. Manage users in `/admin/users`

---

## 🎯 Project Architecture

### Database Schema

**User**:

- id, name, email, passwordHash, googleId
- nid (National ID), contact, role (USER/ADMIN)
- emailVerified, image, timestamps

**Service**:

- id, title, description, slug
- category (BABY_CARE, ELDERLY_CARE, SICK_CARE)
- baseRate, active, timestamps

**Booking**:

- id, userId, serviceId
- durationUnit (HOUR/DAY), durationValue
- division, district, city, area, address
- totalCost, status (PENDING, CONFIRMED, COMPLETED, CANCELLED)
- timestamps

**Payment**:

- id, bookingId, stripePaymentIntentId
- amount, currency, status, receiptUrl
- timestamps

### Folder Structure

```
src/
├── app/
│   ├── (marketing)/          # Public pages
│   │   ├── page.tsx          # Homepage
│   │   └── about/
│   ├── (protected)/          # Auth-required pages
│   │   ├── dashboard/        # User dashboard
│   │   ├── booking/          # Booking flow
│   │   └── payment/          # Payment pages
│   ├── admin/                # Admin panel
│   ├── services/             # Service pages
│   ├── api/                  # API routes
│   └── auth/                 # Auth pages
├── components/
│   ├── ui/                   # Shadcn components
│   ├── layout/               # Layout components
│   ├── dashboard/            # Dashboard components
│   ├── admin/                # Admin components
│   └── settings/             # Settings components
├── lib/                      # Utilities
├── actions/                  # Server actions
└── types/                    # TypeScript types
```

---

## 🚧 Challenges Faced & Solutions

### 1. **Settings Page Access Issue**

**Problem**: Admin users were being redirected to `/admin` when trying to access `/dashboard/settings`, even though regular users could access it fine.

**Root Cause**:

- Direct `redirect()` calls in the settings page component were conflicting with middleware
- `session.user.id` was `undefined` because the session callback wasn't mapping `token.sub` to `session.user.id`

**Solution**:

- Created `getCurrentUser()` server action following the same pattern as `getUserBookings()`
- Updated session callback in `auth.config.ts` to properly map user data from JWT token
- Removed direct `redirect()` calls and used server actions that return `null` instead

**Learning**: Server actions provide better separation of concerns and avoid conflicts with Next.js middleware.

### 2. **Session Data Persistence**

**Problem**: User data (id, role, nid, contact) wasn't available in the session object across the application.

**Solution**:

- Implemented proper JWT callback to store user data in token
- Updated session callback to map all necessary fields from token to session
- Ensured `token.sub` (user ID) is mapped to `session.user.id`

**Code**:

```typescript
async session({ session, token }) {
  if (session.user && token.sub) {
    session.user.id = token.sub;
    session.user.role = (token.role as "USER" | "ADMIN") || "USER";
    session.user.nid = token.nid as string | undefined;
    session.user.contact = token.contact as string | undefined;
  }
  return session;
}
```

### 3. **Stripe Webhook Integration**

**Problem**: Bookings weren't being confirmed automatically after successful payments.

**Solution**:

- Implemented proper webhook endpoint with signature verification
- Added idempotent booking status updates
- Proper error handling and logging for webhook events

### 4. **TypeScript Type Safety**

**Problem**: Complex types for bookings with nested relations causing type errors.

**Solution**:

- Created proper TypeScript interfaces for all entities
- Used Prisma's generated types with proper includes
- Implemented type guards where necessary

### 5. **Form Validation**

**Problem**: Inconsistent validation between client and server.

**Solution**:

- Centralized Zod schemas for all forms
- Shared schemas between client and server
- React Hook Form integration with Zod resolver

### 6. **Responsive Design**

**Problem**: Complex booking form not working well on mobile devices.

**Solution**:

- Mobile-first approach with Tailwind CSS
- Progressive enhancement for larger screens
- Touch-friendly UI elements
- Proper viewport configuration

### 7. **Database Migrations**

**Problem**: Schema changes breaking existing data during development.

**Solution**:

- Used Prisma migrations for version control
- Proper migration strategy with rollback capability
- Seed scripts for consistent test data

### 8. **Authentication Flow**

**Problem**: Users being redirected unnecessarily during authentication.

**Solution**:

- Proper middleware configuration with route matchers
- Correct callback URLs in NextAuth config
- Session strategy optimization (JWT vs database)

---

## 👨‍💻 Utility Scripts

```bash
# Create or reset admin user
bun scripts/create-admin.ts

# Find all admin users
bun scripts/find-admin.ts

# Open Prisma Studio (database GUI)
bunx prisma studio

# Run database migrations
bunx prisma migrate dev

# Generate Prisma client
bunx prisma generate

# Reset database (⚠️ deletes all data)
bunx prisma migrate reset
```

---

## 🚀 Deployment

### Environment Setup

1. **Database**: Set up PostgreSQL on Railway, Supabase, or Neon
2. **Application**: Deploy to Vercel, Railway, or similar platform
3. **Environment Variables**: Configure all required env vars in deployment platform
4. **Stripe Webhook**: Register webhook endpoint in Stripe dashboard
5. **Domain**: Configure custom domain if needed

### Deployment Checklist

- [ ] Database provisioned and accessible
- [ ] All environment variables configured
- [ ] Prisma migrations run
- [ ] Admin user created
- [ ] Stripe webhook endpoint registered
- [ ] Google OAuth credentials updated (if using)
- [ ] Test payment flow end-to-end
- [ ] Verify email notifications (if implemented)
- [ ] Check all protected routes
- [ ] Test admin dashboard functionality

---

## 🔮 Future Enhancements

- **Caregiver Profiles**: Ratings, certifications, language skills, availability calendars
- **Advanced Pricing**: Time-of-day surcharges, special care modifiers, subscription bundles
- **Localization**: Full Bengali UI with proper date/time and address formatting
- **Notifications**: SMS/WhatsApp status updates in addition to email
- **Real-time Scheduling**: Live availability and rescheduling workflows
- **Audit Trails**: Rich event logs for transparency and compliance
- **Reviews & Ratings**: User feedback system for services
- **Chat System**: Real-time communication between users and caregivers
- **Mobile App**: Native iOS and Android applications

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment platform
- **Shadcn** for the beautiful UI components
- **Stripe** for secure payment processing
- **Prisma** for the excellent ORM

---

## 📞 Support

For issues, questions, or contributions:

- **GitHub Issues**: [Report a bug](https://github.com/Pankaj72885/care.xyz/issues)
- **GitHub Discussions**: [Ask a question](https://github.com/Pankaj72885/care.xyz/discussions)

---

**Built with ❤️ by [Pankaj72885](https://github.com/Pankaj72885)**
