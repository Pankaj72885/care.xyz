# Admin User Guide - Care.xyz

## 🔐 Admin Credentials

**Default Admin Account:**

- **Email**: `admin@care.xyz`
- **Password**: `Admin@123456`
- **Role**: ADMIN

> ⚠️ **IMPORTANT**: Change the password after first login for security!

---

## 📋 How to Access Admin Panel

1. **Login to the application**
   - Go to: http://localhost:3000/login
   - Enter the admin credentials above
   - Click "Sign in"

2. **Access Admin Dashboard**
   - After login, navigate to: http://localhost:3000/admin
   - You should see the admin panel with:
     - Dashboard overview
     - Booking management
     - Payment management
     - Service management

---

## 🛠️ Admin User Management Scripts

### Create Admin User

If you need to create the admin user (or recreate it):

```bash
bun scripts/create-admin.ts
```

This script will:

- Create a new admin user with the default credentials
- If the user already exists, it will update their role to ADMIN
- Hash the password securely using bcrypt

### Find Admin Users

To list all admin users in the database:

```bash
bun scripts/find-admin.ts
```

This script will:

- Search for all users with ADMIN role
- Display their name, email, ID, and creation date
- Show instructions if no admin users are found

---

## 🔧 Manual Admin User Creation

If you prefer to create an admin user manually:

### Option 1: Using Prisma Studio

1. Open Prisma Studio:

   ```bash
   bunx prisma studio
   ```

2. Navigate to http://localhost:5555

3. Click on the "User" model

4. Find the user you want to make admin

5. Edit the user and change the `role` field to `ADMIN`

6. Save the changes

### Option 2: Register and Update

1. Register a new user via the UI at http://localhost:3000/register

2. Use Prisma Studio or a database client to update the user's role to `ADMIN`

3. Or use this SQL query:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```

---

## 🎯 Admin Features

As an admin, you have access to:

### 1. **Admin Dashboard** (`/admin`)

- Overview of bookings, revenue, and services
- Quick stats and analytics
- Recent bookings list with user details

### 2. **Service Management** (`/admin/services`)

- **View All Services**: See all services with booking counts and status
- **Create Service**: Add new caregiving services
  - Set title, slug, description, category, and base rate
  - Auto-generate URL-friendly slugs from titles
  - Categories: Baby Care, Elderly Care, Post-Operative Care
- **Edit Service**: Update service information
  - Modify all service details
  - Change pricing and descriptions
  - Update slugs with validation
- **Delete Service**: Remove services (only if no bookings exist)
  - Protection against deleting services with active bookings
  - Clear error messages and suggestions to deactivate instead
- **Toggle Active Status**: Enable/disable services without deleting
  - Quick on/off switch for each service

### 3. **User Management** (`/admin/users`)

- **View All Users**: Complete user list with details
  - Name, email, role, contact, NID
  - Booking count per user
  - Join date
- **Edit User**: Update user profile information
  - Change name, email, contact, NID
  - Email and NID uniqueness validation
  - Prevent duplicate entries
- **Change User Role**: Promote users to admin or demote to regular user
  - Cannot demote yourself (safety feature)
  - Clear role descriptions (USER vs ADMIN)
  - Immediate effect on access permissions
- **Delete User**: Remove users from the system
  - Cannot delete yourself (safety feature)
  - Warning about cascade deletion of bookings
  - Shows booking count before deletion
  - Confirmation required

### 4. **Payment Management** (`/admin/payments`)

- View all transactions
- Access payment receipts
- Monitor payment status
- Track Stripe payment intents
- Filter by status and date

### 5. **Reports & Analytics** (`/admin/reports`)

- **Overview Metrics**:
  - Total users count
  - Total bookings count
  - Total revenue (BDT)
  - Active services count

- **Booking Status Breakdown**:
  - Pending bookings
  - Confirmed bookings
  - Completed bookings
  - Cancelled bookings

- **Service Performance Report**:
  - Service-wise booking statistics
  - Completed bookings per service
  - Revenue generated per service
  - Service status (active/inactive)
  - Base rate comparison
  - Category breakdown

- **Top Services by Revenue**:
  - Ranked list of best-performing services
  - Booking counts and completion rates
  - Revenue comparison
  - Performance insights

### 6. **Protected Routes**

- Only users with ADMIN role can access `/admin/*` routes
- Regular users are redirected if they try to access admin pages
- Middleware-level protection
- Session-based authentication
- Role verification on every request

---

## 🔒 Security Notes

1. **Change Default Password**: The default password is publicly documented. Change it immediately after first login.

2. **Role-Based Access Control**: The application uses NextAuth with role-based middleware to protect admin routes.

3. **Password Hashing**: All passwords are hashed using bcrypt with a salt factor of 10.

4. **Session Management**: Admin sessions are managed via JWT tokens.

---

## 🐛 Troubleshooting

### Can't Access Admin Panel

**Problem**: Getting redirected or seeing "Access Denied"

**Solutions**:

1. Verify you're logged in with the admin account
2. Check the user's role in the database:
   ```bash
   bun scripts/find-admin.ts
   ```
3. Clear browser cookies and try logging in again
4. Check the browser console for errors

### Admin User Not Found

**Problem**: Can't find the admin user in the database

**Solutions**:

1. Run the create admin script:
   ```bash
   bun scripts/create-admin.ts
   ```
2. Check database connection in `.env` file
3. Verify Prisma migrations are up to date:
   ```bash
   bunx prisma migrate status
   ```

### Forgot Admin Password

**Problem**: Lost or forgot the admin password

**Solutions**:

1. Run the create admin script again (it will update the existing user):
   ```bash
   bun scripts/create-admin.ts
   ```
2. Or manually reset the password using Prisma Studio
3. Or delete the user and create a new one

---

## 📚 Related Documentation

- [README.md](./README.md) - Main project documentation
- [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Testing and login guide
- [Prisma Schema](./prisma/schema.prisma) - Database schema

---

**Last Updated**: December 27, 2025
