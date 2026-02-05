import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// User types
export interface FirebaseUser {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'partner' | 'rider';
  phone: string;
  createdAt: string;
}

// Order types
export interface FirebaseOrder {
  id: string;
  customerId: string;
  restaurantId: string;
  items: { itemId: string; quantity: number; price: number }[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
  riderId?: string;
  deliveryAddress: string;
}

// ============ Authentication ============

/**
 * Register a new user
 */
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: 'customer' | 'partner' | 'rider',
  phone: string
): Promise<FirebaseUser> => {
  try {
    // Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Save user data to Firestore
    const userData: FirebaseUser = {
      id: firebaseUser.uid,
      email,
      name,
      role,
      phone,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), userData);

    return userData;
  } catch (error: any) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

/**
 * Login user
 */
export const loginUser = async (email: string, password: string): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }

    return userDoc.data() as FirebaseUser;
  } catch (error: any) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

/**
 * Logout user
 */
export const logoutUser = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    throw new Error(`Logout failed: ${error.message}`);
  }
};

/**
 * Get current user
 */
export const getCurrentUser = (): Promise<FirebaseUser | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          resolve(userDoc.data() as FirebaseUser);
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
      unsubscribe();
    });
  });
};

// ============ Orders ============

/**
 * Create a new order
 */
export const createOrder = async (order: Omit<FirebaseOrder, 'id'> & { id?: string }): Promise<FirebaseOrder> => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: Timestamp.now(),
    });

    return {
      ...order,
      id: docRef.id,
    } as FirebaseOrder;
  } catch (error: any) {
    throw new Error(`Order creation failed: ${error.message}`);
  }
};

/**
 * Get orders for a customer
 */
export const getCustomerOrders = async (customerId: string): Promise<FirebaseOrder[]> => {
  try {
    const q = query(collection(db, 'orders'), where('customerId', '==', customerId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebaseOrder[];
  } catch (error: any) {
    throw new Error(`Failed to fetch customer orders: ${error.message}`);
  }
};

/**
 * Get orders for a restaurant (partner)
 */
export const getRestaurantOrders = async (restaurantId: string): Promise<FirebaseOrder[]> => {
  try {
    const q = query(collection(db, 'orders'), where('restaurantId', '==', restaurantId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebaseOrder[];
  } catch (error: any) {
    throw new Error(`Failed to fetch restaurant orders: ${error.message}`);
  }
};

/**
 * Get orders assigned to a rider
 */
export const getRiderOrders = async (riderId: string): Promise<FirebaseOrder[]> => {
  try {
    const q = query(collection(db, 'orders'), where('riderId', '==', riderId));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebaseOrder[];
  } catch (error: any) {
    throw new Error(`Failed to fetch rider orders: ${error.message}`);
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
  } catch (error: any) {
    throw new Error(`Failed to update order: ${error.message}`);
  }
};

/**
 * Assign rider to order
 */
export const assignRiderToOrder = async (orderId: string, riderId: string): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { riderId, status: 'PICKED_UP' });
  } catch (error: any) {
    throw new Error(`Failed to assign rider: ${error.message}`);
  }
};

/**
 * Get all orders (for admin/stats)
 */
export const getAllOrders = async (): Promise<FirebaseOrder[]> => {
  try {
    const snapshot = await getDocs(collection(db, 'orders'));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FirebaseOrder[];
  } catch (error: any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

/**
 * Real-time subscriptions
 */
export const subscribeToCustomerOrders = (customerId: string, cb: (orders: FirebaseOrder[]) => void) => {
  const q = query(collection(db, 'orders'), where('customerId', '==', customerId));
  const unsub = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as FirebaseOrder[];
    cb(orders);
  });
  return unsub;
};

export const subscribeToRestaurantOrders = (restaurantId: string | number, cb: (orders: FirebaseOrder[]) => void) => {
  const q = query(collection(db, 'orders'), where('restaurantId', '==', restaurantId as any));
  const unsub = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as FirebaseOrder[];
    cb(orders);
  });
  return unsub;
};

export const subscribeToRiderOrders = (riderId: string, cb: (orders: FirebaseOrder[]) => void) => {
  const q = query(collection(db, 'orders'), where('riderId', '==', riderId));
  const unsub = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as FirebaseOrder[];
    cb(orders);
  });
  return unsub;
};

export const subscribeToAllOrders = (cb: (orders: FirebaseOrder[]) => void) => {
  const q = query(collection(db, 'orders'));
  const unsub = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((d) => ({ id: d.id, ...d.data() })) as FirebaseOrder[];
    cb(orders);
  });
  return unsub;
};
