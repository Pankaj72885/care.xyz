# Testing Guide for Care.xyz

## Current Status

✅ **Server Running**: http://localhost:3000
✅ **Database Connected**: PostgreSQL (Neon)
✅ **Prisma Client**: Generated and working
✅ **Environment Variables**: Configured

## Environment Variables Configured

```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=CB/EVtv6S1om5IP7rwNY1t0BTqztQV2nuWIa3MiL6BU=
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
RESEND_API_KEY=...
STRIPE_PUBLIC_KEY=...
STRIPE_SECRET_KEY=...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=... (added)
```

## Admin Credentials

**Default Admin Account:**

- **Email**: admin@care.xyz
- **Password**: Admin@123456
- **Role**: ADMIN

> ⚠️ **Important**: Change the password after first login for security!

To create the admin user, run:

```bash
bun scripts/create-admin.ts
```

To find existing admin users:

```bash
bun scripts/find-admin.ts
```

## How to Test Login

### 1. Admin Login

**With Admin Credentials:**

1. Go to http://localhost:3000/login
2. Enter:
   - Email: admin@care.xyz
   - Password: Admin@123456
3. Click "Sign in"
4. Should redirect to http://localhost:3000/dashboard
5. Access admin panel at http://localhost:3000/admin

### 2. Create a Test User

First, you need to create a user in the database. You can do this by:

**Option A: Register via UI**

1. Go to http://localhost:3000/register
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
   - Contact: (optional)
3. Click "Create account"
4. You'll be redirected to login page

**Option B: Use Google OAuth**

1. Go to http://localhost:3000/register
2. Click "Google" button
3. Sign in with your Google account
4. Account will be created automatically

### 2. Test Login

**With Email/Password:**

1. Go to http://localhost:3000/login
2. Enter:
   - Email: test@example.com
   - Password: password123
3. Click "Sign in"
4. Should redirect to http://localhost:3000/dashboard

**With Google:**

1. Go to http://localhost:3000/login
2. Click "Google" button
3. Sign in with your Google account
4. Should redirect to http://localhost:3000/dashboard

## Troubleshooting

### If Login Shows "Configuration" Error

This usually means:

1. **NEXTAUTH_SECRET is missing** - Check `.env` file
2. **NEXTAUTH_URL is wrong** - Should be `http://localhost:3000`
3. **Callbacks are misconfigured** - Check `src/auth.config.ts` and `src/auth.ts`

### If Login Doesn't Redirect

1. **Check browser console** for errors
2. **Check server logs** in terminal
3. **Clear browser cookies** for localhost
4. **Try in incognito mode**

### If "Invalid email or password"

1. **Make sure user exists** in database
2. **Password must match** what you registered with
3. **Check database** using Prisma Studio: `bunx prisma studio`

## Current Auth Configuration

### auth.config.ts

- Providers: Google, Credentials (placeholder)
- Pages: signIn, newUser, error
- Callbacks: `authorized` (for middleware route protection)

### auth.ts

- Full provider implementations with bcrypt
- Prisma adapter
- Callbacks: `session`, `jwt` (with role management)
- Spreads `authConfig.callbacks` to preserve `authorized`

## Expected Behavior

1. **Unauthenticated user** visits `/dashboard` → Redirected to `/login`
2. **User logs in** successfully → Redirected to `/dashboard`
3. **Authenticated user** visits `/login` → Redirected to `/dashboard`
4. **Admin user** can access `/admin`
5. **Regular user** cannot access `/admin`

## Database Schema

- **User**: id, name, email, passwordHash, role (USER/ADMIN)
- **Account**: OAuth accounts
- **Service**: Available services
- **Booking**: User bookings
- **Payment**: Stripe payments

## Next Steps

1. Test user registration
2. Test login with credentials
3. Test login with Google OAuth
4. Test dashboard access
5. Test booking flow
6. Test payment flow (requires Stripe webhook setup)
