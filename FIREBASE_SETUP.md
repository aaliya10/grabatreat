# Firebase Setup Guide

## 🔥 Quick Firebase Setup (2 minutes)

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a Project"**
3. Name it: `grab-a-treat`
4. Disable Google Analytics (optional)
5. Click **"Create Project"**

### 2. Get Firebase Credentials

1. In Firebase Console, click **"</>  Web"** icon
2. Register your app
3. Copy the config object (it will look like this):

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "grab-a-treat-xxxxx",
  storageBucket: "grab-a-treat-xxxxx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
};
```

### 3. Add to Your Project

**Option A: Environment Variables (Recommended)**

Create `.env.local` file in your project root:

```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY_HERE
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=grab-a-treat-xxxxx
VITE_FIREBASE_STORAGE_BUCKET=grab-a-treat-xxxxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef1234567890
```

**Option B: Direct Config**

Edit `src/config/firebase.ts` and replace:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  // ... rest of config
};
```

### 4. Enable Authentication

In Firebase Console:
1. Go to **Authentication**
2. Click **"Get Started"**
3. Click **"Email/Password"**
4. Enable it

### 5. Create Firestore Database

In Firebase Console:
1. Go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"**
4. Select a region (closest to you)
5. Click **"Create"**

### 6. Set Firestore Security Rules (Important!)

Replace default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /orders/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Done! ✅

Now your app has a real backend with:
- ✅ User authentication (signup/login)
- ✅ Cloud database (Firestore)
- ✅ Real-time data sync
- ✅ Multi-device support
- ✅ 100% free

## 🚀 What You Get

**Free Firebase Tier:**
- 50,000 read operations/day
- 20,000 write operations/day
- 20,000 delete operations/day
- 1GB data storage
- Perfect for college projects!

## 📚 Useful Links

- [Firebase Docs](https://firebase.google.com/docs)
- [Firestore Docs](https://firebase.google.com/docs/firestore)
- [Authentication Docs](https://firebase.google.com/docs/auth)

## ⚠️ Important Security Notes

1. **Never commit `.env.local`** - Add to `.gitignore` ✅ (already done)
2. **Keep API keys safe** - Env vars protect them
3. **Test mode rules expire** - Update before production

## Testing

After setup, try:

1. **Sign up** a new user
2. **Check Firebase** console → See user in Authentication
3. **Create an order** 
4. **Check Firestore** → See order in database
5. **Login on another device** → See same data! 🎉
