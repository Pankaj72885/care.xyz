# Admin Navigation Guide

## 🎯 How to Navigate Admin Pages

There are **TWO ways** to navigate between admin pages:

---

## 1️⃣ **Sidebar Navigation** (Always Available)

The admin sidebar is visible on **all admin pages** and provides quick access to:

```
📊 Overview      → /admin
🔧 Services      → /admin/services
👥 Users         → /admin/users
💳 Payments      → /admin/payments
📈 Reports       → /admin/reports
🏠 Back to Site  → /
```

**Location**: Left side of the screen (desktop) or top (mobile)

**Features**:

- Always visible across all admin pages
- Highlights current page
- Hover effects for better UX
- Icons for visual clarity

---

## 2️⃣ **Quick Navigation Cards** (Dashboard Only)

On the **Admin Dashboard** (`/admin`), you'll see 4 large clickable cards:

### 🔧 Services Card

- **Link**: `/admin/services`
- **Description**: "Manage services, create new ones, and toggle availability"
- **Actions**: View, Create, Edit, Delete, Toggle services

### 👥 Users Card

- **Link**: `/admin/users`
- **Description**: "View all users, edit profiles, and manage roles"
- **Actions**: View, Edit, Change Role, Delete users

### 💳 Payments Card

- **Link**: `/admin/payments`
- **Description**: "View transactions, receipts, and payment status"
- **Actions**: View payments, Check receipts, Monitor status

### 📈 Reports Card

- **Link**: `/admin/reports`
- **Description**: "View analytics, service performance, and revenue reports"
- **Actions**: View reports, Analyze performance, Track revenue

---

## 📍 Complete Admin Route Map

```
/admin
├── /admin/services
│   ├── /admin/services/create
│   ├── /admin/services/[id]/edit
│   └── /admin/services/[id]/delete
│
├── /admin/users
│   ├── /admin/users/[id]/edit
│   ├── /admin/users/[id]/role
│   └── /admin/users/[id]/delete
│
├── /admin/payments
│
└── /admin/reports
```

---

## 🎨 Visual Features

### Dashboard Stats (Top Section)

- **Total Bookings** - Count of all bookings
- **Total Users** - Count of all registered users
- **Total Revenue** - Sum of all successful payments
- **Active Services** - Count of currently active services

### Quick Navigation (Middle Section)

- **4 Clickable Cards** with:
  - Icon for visual identification
  - Title of the section
  - Description of what you can do
  - "Manage/View" button with arrow
  - Hover effects (border color + shadow)

### Recent Bookings (Bottom Section)

- **Last 5 bookings** with:
  - Service name
  - User details (name + email)
  - Booking date
  - Status badge (color-coded)

---

## 💡 Usage Tips

1. **From Dashboard**: Click any of the 4 navigation cards to jump to that section
2. **From Any Admin Page**: Use the sidebar to navigate to any other admin page
3. **Quick Access**: Bookmark `/admin` for fastest access to the dashboard
4. **Mobile**: Sidebar becomes a top navigation bar on mobile devices

---

## 🔗 Quick Links

- **Admin Dashboard**: http://localhost:3000/admin
- **Manage Services**: http://localhost:3000/admin/services
- **Manage Users**: http://localhost:3000/admin/users
- **View Payments**: http://localhost:3000/admin/payments
- **View Reports**: http://localhost:3000/admin/reports

---

## 🎯 Example Workflow

### Creating a New Service:

1. Go to `/admin` (dashboard)
2. Click "Services" card OR click "Services" in sidebar
3. Click "Create Service" button
4. Fill in the form
5. Click "Create Service"
6. Redirected back to services list

### Managing a User:

1. Go to `/admin` (dashboard)
2. Click "Users" card OR click "Users" in sidebar
3. Find the user in the table
4. Click edit (✏️), role (👤), or delete (🗑️) icon
5. Make changes
6. Confirm action

---

**Navigation is now intuitive and accessible from anywhere in the admin panel!** 🎉
