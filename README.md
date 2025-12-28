# Care.xyz - Professional Caregiving Services Platform

[![Live Site](https://img.shields.io/badge/Live-Site-green?style=for-the-badge&logo=vercel)](https://carexyz-production.up.railway.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Pankaj72885/care.xyz)

![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF)
![Shadcn UI](https://img.shields.io/badge/Shadcn-UI-000000)

## 📋 Overview

**Care.xyz** is a comprehensive full-stack web application designed to revolutionize how families in Bangladesh find and book professional caregiving services. From **elderly care** and **post-operative nursing** to **childcare**, the platform provides a seamless, secure, and transparent bridge between families and verified caregivers.

Built with performance, security, and accessibility in mind, this project demonstrates a production-grade implementation of modern web technologies, featuring robust authentication, real-time booking flows, and secure payment processing.

---

## ✨ Features Breakdown

### 🎯 User Experience & Interface

- **Modern Responsive Design**: Mobile-first architecture using **Tailwind CSS v4** and **Shadcn UI** components.
- **Dynamic Theming**: Fully supported Dark and Light modes with consistent design tokens.
- **Intuitive Navigation**: Clear user flows for service discovery, booking, and management.
- **Rich Interaction**: Smooth transitions, loading states, and toast notifications (Sonner) for immediate feedback.
- **Localized Content**: tailored for the Bangladeshi market with NID and division/district selectors.

### 🔐 Authentication & Authorization

- **NextAuth.js v5 Integration**:
  - **Methods**: Email/Password options and Google OAuth.
  - **Session Strategies**: Secure, HTTP-only cookie-based sessions using JWT.
- **Robust Role-Based Access Control (RBAC)**: Distinct permissions for `USER` and `ADMIN` roles.
- **Advanced Validation**:
  - Centralized **Zod** schemas for all inputs (Client & Server).
  - **Strict Data Types**: Custom validation for **Bangladesh National ID (13 digits)** and **Phone Numbers (11 digits)**.
  - **Password Strength**: Enforced rules (uppercase, lowercase, min length) on registration.
- **Middleware Protection**: Route guards to protect dashboard and admin routes without UX-breaking redirects.

### 🏥 Services & Booking Engine

- **Service Catalog**:
  - Dynamic Service Detail pages with SEO-friendly URLs.
  - Metadata optimization for search visibility.
- **Smart Booking System**:
  - **Multi-Step Wizard**: Duration → Location (Division/District/City/Area) → Address → Review.
  - **Precise Scheduling**: Exact Start and End time selection with conflict-free validation.
  - **Live Cost Calculation**: Real-time estimates based on service rates, duration, and unit (Hour/Day).
  - **Hierarchical Location Data**: Division-District-Upazila logic for precise service delivery.
- **Booking Management**:
  - **Dashboard**: User-friendly table with status badges (`PENDING`, `CONFIRMED`, `COMPLETED`, `CANCELLED`).
  - **Advanced Admin Filtering**: Filter bookings by Service Type, Location, Date, or Status.
  - **Actions**: One-click options to Pay, Cancel, or View invoices.

### 💳 Payments & Transactions

- **Stripe Integration**:
  - Secure card processing using Stripe Elements.
  - Server-side **Payment Intents** for robust transaction handling.
  - **Webhooks**: Automated booking confirmation upon successful payment events.
  - **Security**: Signature verification to prevent spoofed requests.
- **Transaction History**: Comprehensive record keeping linked to Booking IDs.
- **Invoice Generation**: (Architecture ready) for automated email receipts via Resend.

### 👥 Profile & settings

- **Complete Profile Management**:
  - Update Name, NID, and Contact details.
  - "Complete Profile" flow for users registering via social providers.
  - Dedicated clean Settings page with validation.

### 🛡️ Admin Dashboard

- **Centralized Control Panel**:
  - **Metrics**: Overview of total revenue, bookings, user growth, and active services.
  - **Service Management**: Create, Edit, Delete, or Toggle visibility of services.
  - **User Moderation**: View all users, promote to Admin, or demote.
  - **Booking Oversight**: Force-update booking statuses and view detailed logs.
  - **Payment Audit**: Searchable history of all platform transactions.

### 🔍 SEO & Metadata

- **Optimized Metadata**: Custom Title and Description tags for every public page (`/`, `/about`, `/contact`, `/services`, etc.).
- **Social Sharing**: Open Graph and Twitter Card tags configured for beautiful link previews.
- **Canonical URLs**: Auto-generated canonicals to prevent duplicate content penalties.
- **Sitemap & Robots**: Clean configuration for crawler visibility.

---

## 🛠️ Technology Stack

### Frontend Core

- **Next.js 16.1**: App Router, Server Components, Turbopack.
- **React 19**: Leveraging latest concurrent features.
- **TypeScript 5**: Strict type safety across the entire codebase.

### Styling & UI

- **Tailwind CSS v4**: Utility-first styling with the latest engine.
- **Shadcn UI**: Accessible component primitives.
- **Lucide Icons**: Consistent and lightweight iconography.

### Backend & Database

- **Server Actions**: Type-safe mutations avoiding traditional API routes where possible.
- **Prisma ORM**: Modern database access with type generation.
- **PostgreSQL**: Robust relational database (hosted on Neon/Railway).
- **Stripe SDK**: Secure payment infrastructure.

### Tools & DevOps

- **Bun**: Ultra-fast runtime and package manager.
- **Zod**: Schema validation for runtime safety.
- **React Hook Form**: Performant form state management.
- **ESLint & Prettier**: Code quality and formatting enforcement.

---

## 🚧 Challenges Faced & Technical Solutions

Developing a platform of this scale presented several unique challenges. Here is how they were solved:

### 1. **Authentication State & Middleware Conflicts**

- **Problem**: Admin users were frequently redirected incorrectly when accessing protected specific paths like `/dashboard/settings` due to race conditions between client-side session hooks and middleware.
- **Solution**: Refactored the dashboard layout to use a custom `getCurrentUser()` server action. that reads the session directly from the secure HTTP-only cookie on the server. This ensures the role check happens reliably before rendering any UI, eliminating flash-of-unauthorized-content.

### 2. **Session Data Persistence**

- **Problem**: Default NextAuth sessions only return basic info (name, email), but the app required specialized data like `NID` and `Role` to be available globally without database queries on every page.
- **Solution**: Customized the JWT callback in `auth.config.ts` to persist `role`, `nid`, and `contact` into the token payload, and typed the `Session` interface to expose these fields throughout the client application.

### 3. **Type-Safe Complex Forms**

- **Problem**: Managing state for a multi-step booking wizard with dependent fields (e.g., Duration affecting Cost) while ensuring the data structure matches the backend Expectation.
- **Solution**: Utilized `react-hook-form` with a comprehensive Zod schema. We separated the schema into a shared validation library (`src/lib/validations/booking.ts`) to ensure the server validated exactly what the client submitted, reusing the same logic.

### 4. **Strict Localized Validation**

- **Problem**: Default string validators were insufficient for Bangladesh specific data. Users could enter invalid NIDs or phone numbers.
- **Solution**: Implemented custom Zod regex refinements (`/^\d{13}$/` for NID) to enforce strict 13-digit inputs at both the form level and database insertion layer. This prevents "bad data" from ever reaching the core logic.

### 5. **Stripe Webhook Security**

- **Problem**: Ensuring that payment confirmations were legitimate and not spoofed, and handling the asynchronous nature of webhooks (e.g., payment succeeds but user closes browser).
- **Solution**: Implemented a robust webhook endpoint that validates the raw request body against the Stripe signature. Used idempotent updates (updating status from `PENDING` to `CONFIRMED`) to strictly handle duplicate events safely.

### 6. **SEO & Social Previews**

- **Problem**: Next.js 13+ metadata system requires careful handling of absolute URLs for OpenGraph images, which often breaks across different environments (local vs production).
- **Solution**: Implemented a global `metadataBase` configuration in `layout.tsx` using environment variables (`NEXT_PUBLIC_APP_URL`), allowing all child pages to use relative paths for images and canonicals cleanly.

### 7. **Complex Date & Time Handling**

- **Problem**: Managing precise booking schedules with start/end times across server (Prisma `Date`) and client (HTML `datetime-local`) boundaries caused significant hydration definition mismatches and validation errors. Specifically, Zod's `z.coerce.date()` clashed with React Hook Form's internal state management.
- **Solution**: Standardized on native `Date` objects within the frontend state. Replaced `coerce` logic with strict `z.date()` validation and implemented a custom change handler in the UI to parse ISO strings immediately, ensuring type consistency throughout the lifecycle.

### 8. **Bangladesh Geo-Integration**

- **Problem**: Users often entered inconsistent location data (spelling errors in District/Upazila names), leading to logistics failures.
- **Solution**: Integrated the specialized `@bangladeshi/bangladesh-address` library. This provides a clean, cascading dropdown experience (Division -> District -> Upazila), ensuring 100% accurate, standardized location data for every booking.

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js 18+** or **Bun** installed.
- **PostgreSQL** database (local or cloud).
- **Stripe** account for test API keys.

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Pankaj72885/care.xyz.git
    cd care.xyz
    ```

2.  **Install dependencies**

    ```bash
    bun install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root:

    ```env
    # Database
    DATABASE_URL="postgresql://..."

    # Auth
    AUTH_SECRET="your-auth-secret"
    AUTH_URL="http://localhost:3000"

    # OAuth
    GOOGLE_CLIENT_ID="foo"
    GOOGLE_CLIENT_SECRET="bar"

    # Stripe
    STRIPE_PUBLIC_KEY="pk_test_..."
    STRIPE_SECRET_KEY="sk_test_..."
    NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."

    # App
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Database Migration**

    ```bash
    bunx prisma generate
    bunx prisma db push
    ```

5.  **Run Development Server**
    ```bash
    bun dev
    ```

---

## 🛡️ Admin Access

To access the admin dashboard, you can use the seed script to create a default admin or register a new user and manually update their role in the database.

**Default Admin Credentials** (if seeded):

- **Email**: `admin@care.xyz`
- **Password**: `Admin@123456`

---

## 🎯 Project Architecture

### Database Schema Structure

- **User**: Handles authentication & profile data (Role, NID, Contact).
- **Service**: Defines available care options (Category, Rate, Active Status).
- **Booking**: The core entity linking Users to Services (Duration, Location, Cost, Status).
- **Payment**: Records financial transactions, strictly linked to Bookings via Stripe Intent IDs.

### Folder Structure

Code is organized by **Feature** within the App Router:

```
src/
├── app/
│   ├── (marketing)/     # Public Landing & Info Pages
│   ├── (protected)/     # Authenticated User Flows (Dashboard)
│   ├── admin/           # Secured Admin Panel
│   ├── api/             # Webhooks & Auth Endpoints
├── components/
│   ├── ui/              # Reusable Shadcn Primitives
│   ├── auth/            # Login/Register Forms
│   ├── bookings/        # Booking Logic & UI
└── lib/                 # Shared Utilities (Validation, Prisma, Utils)
```

_**Note**: This project follows strict industry standard coding practices, employing a "Feature-First" architecture, separating Server Actions, Components, and Utilities for maximum maintainability._

---

## 🔮 Future Roadmap

- [ ] **Caregiver Profiles**: Public pages for individual caregivers with reviews.
- [ ] **Real-time Chat**: Direct communication between families and caregivers.
- [ ] **Subscriptions**: Recurring service packages for long-term care.
- [ ] **Mobile App**: React Native mobile application for on-the-go management.

**Built with ❤️ by [Pankaj72885](https://github.com/Pankaj72885)**
