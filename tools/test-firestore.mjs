import fs from 'fs';

// Load .env.local into process.env (simple parser)
if (fs.existsSync('.env.local')) {
  const raw = fs.readFileSync('.env.local', 'utf8');
  raw.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([^=#]+)\s*=\s*(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

try {
  const { initializeApp } = await import('firebase/app');
  const { getAuth, signInAnonymously } = await import('firebase/auth');
  const { getFirestore, collection, addDoc } = await import('firebase/firestore');

  const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  try {
    await signInAnonymously(auth);
    console.log('Anonymous sign-in successful');
  } catch (e) {
    console.warn('Anonymous sign-in failed:', e.message || e);
  }

  const db = getFirestore(app);

  const sampleOrder = {
    customerId: 'local-test-000',
    restaurantId: 1,
    items: [{ itemId: 'test-item', quantity: 1, price: 99 }],
    totalPrice: 99,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    estimatedDelivery: '',
    deliveryAddress: 'Local Test Address',
  };

  try {
    const ref = await addDoc(collection(db, 'orders'), sampleOrder);
    console.log('Wrote test order to Firestore with id:', ref.id);
  } catch (err) {
    console.error('Failed to write order to Firestore:', err.message || err);
  }
} catch (err) {
  console.error('Test script setup failed:', err.message || err);
  process.exit(1);
}
