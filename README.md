# Grab A'Treat 🍕🍔

A full-stack **food delivery platform** with both **frontend and backend** components. Perfect for college projects!

## 🎯 What's Included

### ✅ Frontend
- Modern React application with TypeScript
- Responsive design with Tailwind CSS
- Partner & Rider dashboards
- Order tracking
- Real-time UI updates

### ✅ Backend (Vercel Functions)
- RESTful API endpoints
- Authentication system
- Order management
- Restaurant & menu management
- Dashboard analytics
- Mock database with sample data

### ✅ Deployment
- Live on Vercel (free tier)
- Serverless functions
- Zero cost

## 📁 Project Structure

```
api/                              # Backend Endpoints
├── auth.ts                       # ✅ Login/Signup
├── orders.ts                     # ✅ Order CRUD
├── restaurants.ts                # ✅ Restaurant & Menus
├── partners.ts                   # ✅ Partner Dashboard
├── riders.ts                     # ✅ Rider Dashboard
└── utils/mockData.ts             # ✅ Mock Database

src/                              # Frontend (React)
├── components/
│   ├── PartnerDashboard.tsx      # 📊 Restaurant analytics
│   └── RiderDashboard.tsx        # 🚴 Delivery tracking
├── context/GlobalContext.tsx     # 🔄 State management
└── ...
```

## 🚀 Quick Start

```bash
# Install
npm install

# Run development
npm run dev

# Build for production
npm run build
```

## 📚 Backend Documentation

See [BACKEND.md](./BACKEND.md) for:
- Complete API reference
- Mock data structure
- Setup instructions
- Example API calls

## 🌐 API Endpoints at a Glance

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/auth` | POST | Login/Signup |
| `/api/restaurants` | GET | Get restaurants & menus |
| `/api/orders` | GET/POST/PUT | Manage orders |
| `/api/partners` | GET | Partner analytics |
| `/api/riders` | GET/PUT | Rider deliveries |

## 🎨 Features Demonstrated

- ✅ User Authentication
- ✅ Order Creation & Management
- ✅ Order Status Tracking
- ✅ Restaurant Listings
- ✅ Menu Items
- ✅ Partner Dashboard (Revenue, Orders, Analytics)
- ✅ Rider Dashboard (Deliveries, Earnings)
- ✅ Real-time Order Updates
- ✅ Role-based Access (Customer, Partner, Rider)

## 🔑 Demo Credentials

Use any of these to test:

**Customer:**
- Email: `customer@example.com`
- Any password

**Partner (Restaurant):**
- Email: `partner@example.com`
- Any password

**Rider (Delivery):**
- Email: `rider@example.com`
- Any password

## 💻 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19 + TypeScript + Tailwind CSS + Vite |
| Backend | Node.js + Vercel Functions |
| State | React Context API |
| Deployment | Vercel (Free) |

## 🌍 Live Demo

🔗 **[Visit Live Application](https://grab-a-treat-aaliya.vercel.app)**

## 📸 Key Screens

1. **Login/Auth Screen** - Role-based authentication
2. **Customer Dashboard** - Browse restaurants, place orders
3. **Partner Dashboard** - View orders, analytics, revenue
4. **Rider Dashboard** - View assigned deliveries, earnings

## ✨ Why This Project Stands Out for College

✅ **Complete Full-Stack** - Both frontend AND backend  
✅ **Real API Endpoints** - Serverless functions, not just mock UI  
✅ **Mock Data** - Already populated with realistic data  
✅ **Zero Cost** - Entirely free deployment  
✅ **Scalable** - Easy to add real database later  
✅ **Production-Ready** - Deployed on Vercel  

## 🎓 College Project Benefits

This project demonstrates:
- Full-stack development
- Frontend-Backend integration
- API design & implementation
- Database schema design
- Real deployment & DevOps
- Role-based systems
- State management

## 🤝 Contributing

Feel free to extend this project with:
- Payment integration
- Real database (Firebase/PostgreSQL)
- WebSocket for real-time updates
- Map integration
- Review system
- Admin panel

## 📄 License

Free to use for educational purposes.

---

**Made with ❤️ for college projects**
