# Care.xyz - Professional Caregiving Services Platform

A comprehensive caregiving booking platform for Bangladesh, built with Next.js 16, TypeScript, Prisma, and Stripe.

## 🎯 Project Overview

Care.xyz is a web application that enables families in Bangladesh to easily book trusted caregiving services for babies, elderly individuals, and people recovering from illness. The platform features a modern interface, strong authentication, secure payments, and comprehensive booking management.

## ✨ Features

### User Features

- **Authentication**: Email/password and Google OAuth via NextAuth
- **Service Catalog**: Browse Baby Care, Elderly Care, and Post-Operative Care services
- **Dynamic Booking**: Multi-step booking form with:
  - Duration selection (hourly/daily)
  - Hierarchical location selection (Division → District → City → Area)
  - Live cost calculation
  - Address input
- **Payment Integration**: Secure Stripe payment processing
- **Booking Management**: View, track, and cancel bookings
- **Email Notifications**: Automated invoice emails via Resend
- **User Dashboard**: Overview of bookings and account settings
- **Dark/Light Mode**: Full theme support

### Admin Features

- **Admin Dashboard**: Overview of bookings, revenue, and services
- **Payment Management**: View all transactions and receipts
- **Service Management**: Toggle service availability
- **Protected Routes**: Role-based access control

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript
- **Runtime**: Bun
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth v5
- **UI Components**: Shadcn UI + Radix UI
- **Styling**: Tailwind CSS v4
- **Payments**: Stripe
- **Email**: Resend
- **Validation**: Zod
- **Form Management**: React Hook Form

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/         # Protected routes
│   │   ├── booking/[serviceId]/
│   │   ├── dashboard/
│   │   │   ├── bookings/
│   │   │   └── settings/
│   │   └── payment/[bookingId]/
│   ├── admin/               # Admin dashboard
│   │   ├── payments/
│   │   └── services/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   └── webhooks/stripe/
│   ├── services/
│   │   └── [serviceId]/
│   └── actions/             # Server actions
│       ├── admin.ts
│       ├── auth.ts
│       ├── booking.ts
│       └── payment.ts
├── components/
│   ├── auth/
│   ├── booking/
│   ├── dashboard/
│   ├── home/
│   ├── layout/
│   ├── payment/
│   └── ui/                  # Shadcn UI components
├── lib/
│   ├── data/
│   ├── stripe/
│   ├── validations/
│   ├── email.ts
│   ├── prisma.ts
│   ├── session.ts
│   └── utils.ts
└── types/
```

## 🚀 Getting Started

### Prerequisites

- Bun (latest version)
- PostgreSQL database
- Stripe account (for payments)
- Google OAuth credentials (optional)
- Resend API key (for emails)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd "Assignment 12"
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your credentials:

   ```bash
   cp .env.example .env
   ```

   Required variables:

   ```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-here"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   STRIPE_PUBLIC_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   RESEND_API_KEY="re_..."
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   bunx prisma generate

   # Run migrations
   bunx prisma migrate dev

   # Seed the database
   bun prisma/seed.ts

   # Create admin user
   bun scripts/create-admin.ts
   ```

   **Default Admin Credentials:**
   - Email: `admin@care.xyz`
   - Password: `Admin@123456`

   > ⚠️ Change the password after first login!

5. **Run the development server**

   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
bun run build
bun run start
```

## 📊 Database Schema

### Models

- **User**: Authentication and profile information
- **Account**: OAuth provider accounts
- **Service**: Available caregiving services
- **Booking**: Service bookings with location and duration
- **Payment**: Stripe payment records

### Enums

- **Role**: USER, ADMIN
- **BookingStatus**: PENDING, CONFIRMED, COMPLETED, CANCELLED
- **DurationUnit**: HOUR, DAY

## 🔐 Authentication Flow

1. Users can register with email/password or Google OAuth
2. Passwords are hashed with bcrypt
3. Sessions are managed via JWT
4. Protected routes redirect unauthenticated users to login
5. Authenticated users accessing login/register are redirected to dashboard
6. Admin routes require ADMIN role

## 💳 Payment Flow

1. User creates a booking (status: PENDING)
2. User is redirected to payment page
3. Stripe PaymentIntent is created
4. User completes payment via Stripe Elements
5. Webhook confirms payment and:
   - Updates booking status to CONFIRMED
   - Creates payment record
   - Sends invoice email to user

## 📧 Email Notifications

Automated emails are sent via Resend for:

- Booking confirmation with invoice
- Payment receipt
- Booking details

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: System preference detection
- **Loading States**: Skeleton loaders and spinners
- **Form Validation**: Real-time validation with error messages
- **Toast Notifications**: User feedback for actions
- **Accessible Components**: ARIA labels and keyboard navigation

## 🔒 Security Features

- Password hashing with bcrypt
- CSRF protection
- Secure session management
- Environment variable validation
- Stripe webhook signature verification
- Role-based access control
- SQL injection prevention (Prisma)

## 📝 Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bunx prisma studio   # Open Prisma Studio
bunx prisma migrate dev  # Run database migrations
```

## 🧪 Testing

The project includes:

- TypeScript type checking
- ESLint for code quality
- Prisma schema validation

## 🚧 Future Enhancements

- [ ] Caregiver profiles with ratings
- [ ] Advanced pricing (time-based, special care)
- [ ] Full Bengali localization
- [ ] SMS/WhatsApp notifications
- [ ] Real-time availability calendar
- [ ] Booking rescheduling
- [ ] Review and rating system
- [ ] Advanced search and filters

## 📄 License

This project is part of an assignment for Programming Hero Level-1.

## 👥 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
