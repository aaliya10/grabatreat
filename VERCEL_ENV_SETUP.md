# Vercel Environment Variables Setup

## Your Firebase Credentials (Copy-Paste Ready)

VITE_FIREBASE_API_KEY=AIzaSyApfZ6oryjTUS27Ar57crtzoF0-3Y1qEc0
VITE_FIREBASE_AUTH_DOMAIN=grabatreat-14a4f.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=grabatreat-14a4f
VITE_FIREBASE_STORAGE_BUCKET=grabatreat-14a4f.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=137964955077
VITE_FIREBASE_APP_ID=1:137964955077:web:43b81be57da2aed394d7ac

---

## How to Add to Vercel

### Option 1: Web Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click your **"grab-a-treat"** project
3. Click **Settings** → **Environment Variables**
4. For each variable above:
   - Click **"Add New"**
   - Name: (e.g., VITE_FIREBASE_API_KEY)
   - Value: (paste the value)
   - Environments: Check Production, Preview, Development
   - Click **"Add"**

### Option 2: Command Line

Run these commands (one at a time):

```bash
vercel env add VITE_FIREBASE_API_KEY
AIzaSyApfZ6oryjTUS27Ar57crtzoF0-3Y1qEc0
```

Then repeat for the other 5 variables.

---

## After Adding Variables

1. Go to **Deployments** tab
2. Click the latest deployment
3. Click **"..."** → **"Redeploy"**
4. Your app will rebuild with Firebase! ✅

---

Done! Your Vercel project now has Firebase configured.
