# Grab A'Treat - Food Delivery Platform

A full-stack food delivery application built with **React + Vite** (Frontend) and **Vercel Functions** (Backend).

## 🏗️ Project Structure

```
Grab A'Treat/
├── src/                          # Frontend (React + TypeScript)
│   ├── components/
│   │   ├── PartnerDashboard.tsx  # Restaurant partner dashboard
│   │   └── RiderDashboard.tsx    # Delivery rider dashboard
│   ├── context/
│   │   └── GlobalContext.tsx     # Global state management
│   ├── utils/
│   │   └── cn.ts                 # Utility functions
│   ├── App.tsx
│   └── main.tsx
├── api/                           # Backend (Vercel Serverless Functions)
│   ├── auth.ts                   # Authentication endpoints
│   ├── orders.ts                 # Order management
│   ├── restaurants.ts            # Restaurant & menu data
│   ├── partners.ts               # Partner dashboard
│   ├── riders.ts                 # Rider dashboard
│   └── utils/
│       └── mockData.ts           # Mock database
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎯 Features

### Frontend
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🎭 Role-based dashboards (Partner, Rider)
- ⚡ Fast with Vite

### Backend
- 🔐 User authentication (login/signup)
- 📦 Order management system
- 🏪 Restaurant catalog with menus
- 👨‍💼 Partner dashboard (restaurant analytics)
- 🚴 Rider dashboard (delivery management)
- ☁️ Serverless with Vercel Functions

## 🚀 API Endpoints

### Authentication
```bash
POST /api/auth
Body: { action: "login", email: "customer@example.com", password: "pass" }
      { action: "signup", name: "John", email: "john@example.com", role: "customer" }
```

### Restaurants
```bash
GET /api/restaurants                    # Get all restaurants
GET /api/restaurants?restaurantId=rest1 # Get restaurant menu
```

### Orders
```bash
GET /api/orders                    # Get all orders
GET /api/orders?userId=user1       # Get user's orders
POST /api/orders                   # Create new order
PUT /api/orders                    # Update order status
```

### Partner Dashboard
```bash
GET /api/partners?partnerId=partner1 # Get partner's analytics & orders
```

### Rider Dashboard
```bash
GET /api/riders?riderId=rider1  # Get rider's deliveries & stats
PUT /api/riders                 # Accept/update delivery order
```

## 📊 Mock Data

The backend includes pre-populated mock data:

### Users
- **Customer:** user1 (customer@example.com)
- **Partner:** partner1 (partner@example.com)
- **Rider:** rider1 (rider@example.com)

### Restaurants
- Pizza Palace
- Burger Bliss
- Spice Route

### Orders
- Sample orders with different statuses (pending, confirmed, out_for_delivery, delivered)

## 🛠️ Setup & Run

```bash
# Install dependencies
npm install

# Development
npm run dev       # Start Vite dev server (http://localhost:5173)

# Build
npm run build     # Build for production
npm run preview   # Preview production build
```

## 🌍 Deployment

The project is deployed on **Vercel**:
- Frontend: Automatically deployed on push to main
- Backend: Vercel Functions have built-in serverless support

**Live URL:** https://grab-a-treat-aaliya.vercel.app

## 💡 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Vite
- **Backend:** Node.js, Vercel Functions
- **State Management:** React Context API
- **Styling:** Tailwind CSS

## 📝 Note for College Project

This is a **fully functional mock implementation**:
- ✅ Real backend endpoints
- ✅ API call structure demonstrated
- ✅ Mock database with all required data
- ✅ Role-based dashboards working
- ✅ Order management system
- ✅ Zero cost deployment (Vercel free tier)

---

**Built as a college project for food delivery platform demonstration.**
