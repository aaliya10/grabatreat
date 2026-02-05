# Firebase Integration Guide

## 🚀 Quick Start with Firebase

### Status: Ready for Firebase Integration

Your project now supports **two modes**:

### Mode 1: Mock Data (Current - No Firebase needed)
- ✅ Works immediately
- Works offline
- No cloud sync
- Good for development

### Mode 2: Firebase (Recommended - Real Backend)
- ✅ User data persists
- ✅ Multi-device sync
- ✅ Real authentication
- ✅ Cloud database
- Takes 5 minutes to set up

---

## 🔥 How to Enable Firebase

### Step 1: Setup Firebase (5 minutes)
Follow [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### Step 2: Add Firebase Config
Create `.env.local` in project root:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

### Step 3: Use Firebase in Frontend

Your Firebase service is ready at: `src/services/firebaseService.ts`

**Example: Sign up user**
```typescript
import { registerUser } from '@/services/firebaseService';

const user = await registerUser(
  'user@example.com',
  'password',
  'John Doe',
  'customer',
  '9876543210'
);
```

**Example: Get customer orders**
```typescript
import { getCustomerOrders } from '@/services/firebaseService';

const orders = await getCustomerOrders(userId);
```

### Step 4: Restart Dev Server
```bash
npm run dev
```

---

## 🎯 Architecture Overview

```
┌─────────────────────────────────────┐
│   Frontend (React + Vite)           │
│  - Components                       │
│  - GlobalContext                    │
│  - Firebase Service                 │
└──────────────┬──────────────────────┘
               │
        ┌──────▼──────────┬──────────────┐
        │                 │              │
        ▼                 ▼              ▼
   Firebase Auth   Firebase Firestore  Vercel API
   (login/signup)  (orders/data)      (fallback)
```

---

## 📦 Available Firebase Functions

### Authentication
```typescript
registerUser(email, password, name, role, phone)
loginUser(email, password)
logoutUser()
getCurrentUser()
```

### Orders
```typescript
createOrder(order)
getCustomerOrders(customerId)
getRestaurantOrders(restaurantId)
getRiderOrders(riderId)
updateOrderStatus(orderId, status)
assignRiderToOrder(orderId, riderId)
getAllOrders()
```

---

## 🧪 Testing

1. **Without Firebase (Current)**
   - Uses mock data from `/api/utils/mockData.ts`
   - Works immediately
   - Data resets on page refresh

2. **With Firebase (After Setup)**
   - Real user accounts
   - Persistent data
   - Multi-device sync
   - Works across devices

---

## 🔒 Security

- ✅ `.env.local` is in `.gitignore` - Never committed
- ✅ API keys are safe
- ✅ Firestore rules control access
- ✅ Test mode rules (need update for production)

---

## 📚 File Structure

```
src/
├── config/
│   └── firebase.ts          ← Firebase configuration
├── services/
│   └── firebaseService.ts   ← All Firebase functions
├── components/
├── context/
└── ...

api/
├── auth.ts
├── orders.ts
├── partners.ts
├── riders.ts
├── restaurants.ts
└── utils/mockData.ts
```

---

## ❓ FAQ

**Q: Does it work without Firebase?**
A: Yes! Mock data works immediately. Firebase is optional.

**Q: Will data sync across devices?**
A: With Firebase, yes. Without Firebase, no.

**Q: Is it free?**
A: Yes, Firebase free tier is generous (perfect for college projects).

**Q: Can I add payment later?**
A: Yes, Firebase + Stripe integration is straightforward.

---

## 🚀 Next Steps

1. ✅ Backend API created (Vercel Functions)
2. ⏭️ Firebase configured (optional)
3. ⏭️ Connect frontend to Firebase
4. ⏭️ Test multi-device sync
5. ⏭️ Deploy and showcase!

---

**Everything is ready! Choose your deployment path:**

- **Simple Path:** Use mock data (works now)
- **Professional Path:** Add Firebase (better for projects)
