import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createOrder as createOrderInFirestore,
  subscribeToCustomerOrders,
  subscribeToRestaurantOrders,
  subscribeToRiderOrders,
} from '../services/firebaseService';
import { auth } from '../config/firebase';
import { signInAnonymously } from 'firebase/auth';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'COOKING' | 'READY' | 'PICKED_UP' | 'DELIVERED';
export type OrderType = 'HOME' | 'TRAIN';
export type UserStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'ONLINE';

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  isVeg: boolean;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  type: OrderType;
  restaurantId: number;
  restaurantName: string;
  timestamp: number;
  customerName: string;
  address?: string;
  pnr?: string;
  coach?: string;
  seat?: string;
  tip?: number;
  pickupOtp: string;
  deliveryOtp: string;
  review?: {
    rating: number;
    comment: string;
    timestamp: number;
  };
  refundStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
  refundReason?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  desc: string;
  isVeg: boolean;
  isAvailable: boolean;
  image: string;
  category: string;
}

export interface Restaurant {
  id: number;
  name: string;
  rating: string;
  time: string;
  image: string;
  tags: string[];
  offer?: string;
  menu: MenuItem[];
  isPureVeg?: boolean;
}

interface UserSession {
  role: 'customer' | 'partner' | 'rider' | null;
  name: string;
  mobile: string;
  status: UserStatus;
  restaurantId?: number;
  points: number;
  favorites: number[];
  email: string;
  address: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'FLAT' | 'PERCENT';
  maxDiscount?: number;
  minOrder: number;
  description: string;
}

interface GlobalContextType {
  orders: Order[];
  restaurants: Restaurant[];
  userSession: UserSession;
  restaurantOnlineStatus: Record<number, UserStatus>;
  availableCoupons: Coupon[];
  cartItems: OrderItem[];
  addToCart: (item: Omit<OrderItem, 'quantity'>) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'status' | 'timestamp' | 'pickupOtp' | 'deliveryOtp'>) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  toggleMenuItemAvailability: (restaurantId: number, menuItemId: number) => void;
  setUserStatus: (status: UserStatus) => void;
  setRestaurantStatus: (restaurantId: number, status: UserStatus) => void;
  loginUser: (mobile: string, password?: string) => boolean;
  registerUser: (userData: any) => { success: boolean; message?: string };
  logoutUser: () => void;
  toggleFavorite: (restaurantId: number) => void;
  updateProfile: (data: Partial<Pick<UserSession, 'name' | 'email' | 'address'>>) => void;
  redeemPoints: (amount: number) => void;
  claimedCoupon: string | null;
  claimCoupon: (code: string) => void;
  addReview: (orderId: string, rating: number, comment: string) => void;
  requestRefund: (orderId: string, reason: string) => void;
  handleRefund: (orderId: string, status: 'APPROVED' | 'REJECTED') => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const INITIAL_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: 'Ovenly - Bakery',
    rating: '4.8',
    time: '20 mins',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop',
    tags: ['Bakery', 'Dessert', 'Combos'],
    offer: 'Buy 1 Get 1',
    isPureVeg: true,
    menu: [
      { id: 101, name: 'Midnight Cocoa Croissant', price: 120, desc: 'Rich chocolate filled buttery croissant', isVeg: true, isAvailable: true, category: 'Bakery', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1926&auto=format&fit=crop' },
      { id: 102, name: 'Honey-Lavender Pound Cake', price: 150, desc: 'Floral slice with organic honey', isVeg: true, isAvailable: true, category: 'Bakery', image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1936&auto=format&fit=crop' },
      { id: 107, name: 'Coffee + Cookie Combo', price: 149, desc: 'Fresh coffee with a signature cookie', isVeg: true, isAvailable: true, category: 'Combos', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1970&auto=format&fit=crop' }
    ]
  },
  {
    id: 2,
    name: 'Spicebell - Café',
    rating: '4.5',
    time: '25 mins',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2078&auto=format&fit=crop',
    tags: ['Café', 'Beverages', 'Fast Food'],
    offer: 'Flat ₹50 OFF',
    isPureVeg: true,
    menu: [
      { id: 201, name: 'Masala Mocha Latte', price: 180, desc: 'Spiced espresso fusion', isVeg: true, isAvailable: true, category: 'Beverages', image: 'https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1936&auto=format&fit=crop' },
      { id: 202, name: 'Garlic Cheese Toast', price: 160, desc: 'Zesty baked bread', category: 'Fast Food', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=2080&auto=format&fit=crop' }
    ]
  },
  {
    id: 3,
    name: 'Amraban',
    rating: '4.7',
    time: '40 mins',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    tags: ['Konkani', 'Mains', 'Seafood'],
    menu: [
      { id: 301, name: 'Coconut Fish Curry', price: 420, desc: 'Fresh catch in spiced gravy', category: 'Mains', isVeg: false, isAvailable: true, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop' },
      { id: 302, name: 'Palm Jaggery Payasam', price: 220, desc: 'Traditional sweet pudding', category: 'Desserts', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?q=80&w=2070&auto=format&fit=crop' }
    ]
  },
  {
    id: 4,
    name: "Domino's Pizza",
    rating: '4.3',
    time: '30 mins',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop',
    tags: ['Pizza', 'Fast Food', 'Dessert'],
    offer: 'Free Garlic Bread',
    menu: [
      { id: 401, name: 'Volcano Cheese Burst Pizza', price: 399, desc: 'Premium cheese explosion', category: 'Pizza', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=2070&auto=format&fit=crop' },
      { id: 402, name: 'Chocolate Lava Brownie', price: 199, desc: 'Decadent warm dessert', category: 'Dessert', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=1935&auto=format&fit=crop' }
    ]
  },
  {
    id: 5,
    name: 'The Royal Kitchen',
    rating: '4.2',
    time: '35 mins',
    image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1968&auto=format&fit=crop',
    tags: ['North Indian', 'Thali', 'Mains'],
    menu: [
      { id: 501, name: 'Butter Chicken', price: 280, desc: 'Rich and creamy classic', category: 'Mains', isVeg: false, isAvailable: true, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1968&auto=format&fit=crop' }
    ]
  },
  {
    id: 6,
    name: 'Dragon Wok',
    rating: '4.1',
    time: '30 mins',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=2070&auto=format&fit=crop',
    tags: ['Chinese', 'Fast Food'],
    menu: [
      { id: 601, name: 'Dragon Manchurian', price: 180, desc: 'Crispy dry balls', category: 'Mains', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=2070&auto=format&fit=crop' }
    ]
  },
  {
    id: 7,
    name: 'Biryani Bliss',
    rating: '4.6',
    time: '45 mins',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?q=80&w=1974&auto=format&fit=crop',
    tags: ['Biryani', 'Mains'],
    menu: [
      { id: 701, name: 'Signature Dum Biryani', price: 280, desc: 'Aromatic basmati layers', category: 'Biryani', isVeg: false, isAvailable: true, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop' }
    ]
  },
  {
    id: 8,
    name: 'Burger Town',
    rating: '4.4',
    time: '25 mins',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop',
    tags: ['Burgers', 'Fast Food', 'Combos'],
    menu: [
      { id: 801, name: 'Signature Town Burger', price: 290, desc: 'Grilled prime patty', category: 'Burgers', isVeg: false, isAvailable: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop' }
    ]
  },
  {
    id: 9,
    name: 'The Cake Express',
    rating: '4.9',
    time: '15 mins',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1989&auto=format&fit=crop',
    tags: ['Dessert', 'Bakery'],
    offer: 'Flat 20% OFF',
    isPureVeg: true,
    menu: [
      { id: 901, name: 'Red Velvet Pastry', price: 90, desc: 'Cream cheese frosting', category: 'Desserts', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?q=80&w=1926&auto=format&fit=crop' }
    ]
  },
  {
    id: 11,
    name: 'Dragon House',
    rating: '4.5',
    time: '35 mins',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=1964&auto=format&fit=crop',
    tags: ['Chinese Premium', 'Asian'],
    menu: [
      { id: 1101, name: 'Chili Lollipops', price: 320, desc: 'Crispy drumettes with dip', category: 'Starters', isVeg: false, isAvailable: true, image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=2070&auto=format&fit=crop' }
    ]
  },
  {
    id: 12,
    name: 'Urban Grill',
    rating: '4.6',
    time: '30 mins',
    image: 'https://images.unsplash.com/photo-1544025162-d76690b68f6b?q=80&w=2069&auto=format&fit=crop',
    tags: ['Burgers', 'BBQ', 'Fast Food'],
    menu: [
      { id: 1201, name: 'Smoky BBQ Burger', price: 280, desc: 'Flame grilled perfection', category: 'Burgers', isVeg: false, isAvailable: true, image: 'https://images.unsplash.com/photo-1544025162-d76690b68f6b?q=80&w=2069&auto=format&fit=crop' }
    ]
  },
  {
    id: 14,
    name: 'Dessert Heaven',
    rating: '4.9',
    time: '15 mins',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2000&auto=format&fit=crop',
    tags: ['Dessert', 'Ice Cream'],
    isPureVeg: true,
    menu: [
      { id: 1401, name: 'Ultimate Sundae', price: 180, desc: 'Layered fruit and nuts', category: 'Dessert', isVeg: true, isAvailable: true, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2000&auto=format&fit=crop' }
    ]
  }
];

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>(INITIAL_RESTAURANTS);
  const [userSession, setUserSession] = useState<UserSession>({ 
    role: null, 
    name: '', 
    mobile: '', 
    status: 'AVAILABLE',
    points: 100, // Welcome bonus
    favorites: [],
    email: '',
    address: 'DBJ College, Chiplun'
  });

  const [registeredUsers, setRegisteredUsers] = useState<any[]>([
    { mobile: '9999999999', password: 'demo123', name: 'Peter Parker', role: 'customer', email: 'spidey@avengers.com', points: 100, favorites: [], address: 'DBJ College, Chiplun' },
    { mobile: '8888888888', password: 'demo123', name: 'Ovenly - Bakery', role: 'partner', restaurantId: 1, email: 'contact@ovenly.com', address: 'Chiplun Market' },
    { mobile: '7777777777', password: 'demo123', name: 'Steve Rogers', role: 'rider', email: 'cap@shield.gov', address: 'Chiplun Station' }
  ]);

  const [restaurantOnlineStatus, setRestaurantOnlineStatus] = useState<Record<number, UserStatus>>({
    1: 'AVAILABLE',
    2: 'AVAILABLE',
    3: 'AVAILABLE',
    4: 'AVAILABLE',
    5: 'AVAILABLE',
    6: 'AVAILABLE',
    7: 'AVAILABLE',
    8: 'AVAILABLE',
    9: 'AVAILABLE',
    11: 'AVAILABLE',
    12: 'AVAILABLE',
    14: 'AVAILABLE'
  });
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [claimedCoupon, setClaimedCoupon] = useState<string | null>(null);

  const addToCart = (item: Omit<OrderItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemName: string) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.name === itemName);
      if (existing && existing.quantity > 1) {
        return prev.map(i => i.name === itemName ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.name !== itemName);
    });
  };

  const clearCart = () => setCartItems([]);

  const availableCoupons: Coupon[] = [
    { code: 'WELCOME50', discount: 50, type: 'FLAT', minOrder: 100, description: 'Flat ₹50 OFF on orders above ₹100' },
    { code: 'CHIPLUN', discount: 20, type: 'PERCENT', maxDiscount: 100, minOrder: 200, description: '20% OFF up to ₹100' },
    { code: 'TRAIN10', discount: 10, type: 'PERCENT', minOrder: 300, description: '10% OFF on orders above ₹300' }
  ];

  const placeOrder = (orderData: Omit<Order, 'id' | 'status' | 'timestamp' | 'pickupOtp' | 'deliveryOtp'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'PENDING',
      timestamp: Date.now(),
      pickupOtp: '6789', // Fixed for Mock
      deliveryOtp: '9876', // Fixed for Mock
    };
    setOrders(prev => [newOrder, ...prev]);
    
    // Earn points: 1 point per 10 rupees
    const earnedPoints = Math.floor(orderData.totalPrice / 10);
    setUserSession(prev => ({ ...prev, points: prev.points + earnedPoints }));

    // If Firebase is configured, persist order to Firestore so it syncs across devices.
    const firebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== 'YOUR_API_KEY';
    if (firebaseConfigured) {
      try {
        console.log('[ORDER] Firebase is configured. Attempting to persist order to Firestore...');
        // Map local order shape to Firestore-friendly shape
        const persisted = {
          customerId: userSession.mobile,
          customerName: userSession.name,
          restaurantId: orderData.restaurantId,
          items: orderData.items.map(i => ({ itemId: String(i.name), quantity: i.quantity, price: i.price })),
          totalPrice: orderData.totalPrice,
          status: newOrder.status,
          createdAt: new Date().toISOString(),
          estimatedDelivery: '',
          deliveryAddress: userSession.address || '',
        } as any;

        createOrderInFirestore(persisted).then((result) => {
          console.log('[ORDER] Successfully persisted to Firestore:', result);
        }).catch((err) => {
          console.error('[ORDER] Failed to persist order to Firestore:', err.code || err.message || err);
        });
      } catch (err) {
        console.error('[ORDER] Firestore order persistence error:', err);
      }
    } else {
      console.log('[ORDER] Firebase not configured. Order saved locally only.');
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const toggleMenuItemAvailability = (restaurantId: number, menuItemId: number) => {
    setRestaurants(prev => prev.map(res => {
      if (res.id === restaurantId) {
        return {
          ...res,
          menu: res.menu.map(item => 
            item.id === menuItemId ? { ...item, isAvailable: !item.isAvailable } : item
          )
        };
      }
      return res;
    }));
  };

  const loginUser = (mobile: string, password?: string) => {
    const user = registeredUsers.find(u => u.mobile === mobile && (!password || u.password === password));
    
    if (user) {
      setUserSession({
        name: user.name,
        mobile: user.mobile,
        role: user.role,
        status: 'AVAILABLE',
        restaurantId: user.restaurantId,
        points: user.points || 0,
        favorites: user.favorites || [],
        email: user.email || '',
        address: user.address || 'DBJ College, Chiplun'
      });
      return true;
    }
    return false;
  };

  const registerUser = (userData: any) => {
    // Check if user already exists
    if (registeredUsers.find(u => u.mobile === userData.mobile)) {
      return { success: false, message: 'Mobile number already registered' };
    }

    const newUser = {
      ...userData,
      points: 100, // Welcome bonus
      favorites: [],
      address: 'DBJ College, Chiplun'
    };

    setRegisteredUsers(prev => [...prev, newUser]);
    
    // Auto-login after registration
    setUserSession({
      name: newUser.name,
      mobile: newUser.mobile,
      role: newUser.role,
      status: 'AVAILABLE',
      email: newUser.email,
      restaurantId: newUser.restaurantId,
      points: 100,
      favorites: [],
      address: 'DBJ College, Chiplun'
    });

    return { success: true };
  };

  const logoutUser = () => {
    setUserSession({ 
      role: null, 
      name: '', 
      mobile: '', 
      status: 'OFFLINE',
      points: 0,
      favorites: [],
      email: '',
      address: ''
    });
  };

  const setUserStatus = (status: UserStatus) => {
    setUserSession(prev => ({ ...prev, status }));
  };

  const setRestaurantStatus = (restaurantId: number, status: UserStatus) => {
    setRestaurantOnlineStatus(prev => ({ ...prev, [restaurantId]: status }));
  };

  const toggleFavorite = (restaurantId: number) => {
    setUserSession(prev => {
      const isFav = prev.favorites.includes(restaurantId);
      if (isFav) {
        return { ...prev, favorites: prev.favorites.filter(id => id !== restaurantId) };
      }
      return { ...prev, favorites: [...prev.favorites, restaurantId] };
    });
  };

  const updateProfile = (data: Partial<Pick<UserSession, 'name' | 'email' | 'address'>>) => {
    setUserSession(prev => ({ ...prev, ...data }));
  };

  const redeemPoints = (amount: number) => {
    setUserSession(prev => ({ ...prev, points: Math.max(0, prev.points - amount) }));
  };

  const claimCoupon = (code: string) => {
    setClaimedCoupon(code);
  };

  const addReview = (orderId: string, rating: number, comment: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, review: { rating, comment, timestamp: Date.now() } } : order
    ));
  };

  const requestRefund = (orderId: string, reason: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, refundStatus: 'PENDING', refundReason: reason } : order
    ));
  };

  const handleRefund = (orderId: string, status: 'APPROVED' | 'REJECTED') => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, refundStatus: status } : order
    ));
  };

  // Toast Listener for Status Changes
  useEffect(() => {
    if (orders.length > 0) {
      const latestOrder = orders[0];
      if (latestOrder.status === 'DELIVERED') {
        console.log(`Order ${latestOrder.id} has been delivered! Enjoy your food!`);
      }
    }
  }, [orders]);

  // Real-time syncing with Firestore when configured & user session exists
  useEffect(() => {
    const firebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_API_KEY !== 'YOUR_API_KEY';
    if (!firebaseConfigured) {
      console.log('[SYNC] Firebase not configured. Skipping Firestore sync.');
      return;
    }

    console.log('[SYNC] Firebase configured. Setting up anonymous sign-in and subscriptions...');

    // Ensure we have a Firebase auth context (anonymous sign-in) so Firestore rules that
    // require `request.auth != null` will pass. This keeps the app flow unchanged for demo.
    if (!auth.currentUser) {
      signInAnonymously(auth).then(() => {
        console.log('[SYNC] Anonymous sign-in successful.');
      }).catch((err) => {
        console.warn('[SYNC] Anonymous Firebase sign-in failed:', err.code, err.message || err);
      });
    }

    let unsub: (() => void) | null = null;

    if (userSession.role === 'customer') {
      console.log('[SYNC] Customer detected. Subscribing to customer orders for:', userSession.mobile);
      unsub = subscribeToCustomerOrders(userSession.mobile, (remoteOrders) => {
        console.log('[SYNC] Received customer orders from Firestore:', remoteOrders.length);
        // Map remote orders to local Order shape as best-effort
        const mapped = remoteOrders.map((o: any) => {
          const ridId = o.restaurantId || 1;
          const restaurant = restaurants.find(r => r.id === ridId);
          return {
            id: o.id,
            items: (o.items || []).map((it: any) => ({ name: it.itemId || it.name || 'item', price: it.price || 0, quantity: it.quantity || 1, isVeg: true })),
            totalPrice: o.totalPrice || 0,
            status: (o.status as any) || 'PENDING',
            type: 'HOME',
            restaurantId: ridId,
            restaurantName: restaurant?.name || 'Restaurant',
            timestamp: o.createdAt ? new Date(o.createdAt).getTime() : Date.now(),
            customerName: userSession.name || '',
            pickupOtp: o.pickupOtp || '6789',
            deliveryOtp: o.deliveryOtp || '9876',
            review: o.review,
            refundStatus: o.refundStatus,
            refundReason: o.refundReason,
          } as Order;
        });
        setOrders(mapped.reverse());
      });
    } else if (userSession.role === 'partner') {
      const rid = userSession.restaurantId || 1;
      console.log('[SYNC] Partner detected. Subscribing to restaurant orders for:', rid);
      unsub = subscribeToRestaurantOrders(rid, (remoteOrders) => {
        console.log('[SYNC] Received partner orders from Firestore:', remoteOrders.length);
        const mapped = remoteOrders.map((o: any) => {
          const restaurant = restaurants.find(r => r.id === (o.restaurantId || rid));
          return {
            id: o.id,
            items: (o.items || []).map((it: any) => ({ name: it.itemId || it.name || 'item', price: it.price || 0, quantity: it.quantity || 1, isVeg: true })),
            totalPrice: o.totalPrice || 0,
            status: (o.status as any) || 'PENDING',
            type: 'HOME',
            restaurantId: o.restaurantId || rid,
            restaurantName: restaurant?.name || 'Restaurant',
            timestamp: o.createdAt ? new Date(o.createdAt).getTime() : Date.now(),
            customerName: o.customerName || o.customerId || '',
            pickupOtp: o.pickupOtp || '6789',
            deliveryOtp: o.deliveryOtp || '9876',
            review: o.review,
            refundStatus: o.refundStatus,
            refundReason: o.refundReason,
          } as Order;
        });
        setOrders(mapped.reverse());
      });
    } else if (userSession.role === 'rider') {
      console.log('[SYNC] Rider detected. Subscribing to rider orders for:', userSession.mobile);
      unsub = subscribeToRiderOrders(userSession.mobile, (remoteOrders) => {
        console.log('[SYNC] Received rider orders from Firestore:', remoteOrders.length);
        const mapped = remoteOrders.map((o: any) => {
          const ridId = o.restaurantId || 1;
          const restaurant = restaurants.find(r => r.id === ridId);
          return {
            id: o.id,
            items: (o.items || []).map((it: any) => ({ name: it.itemId || it.name || 'item', price: it.price || 0, quantity: it.quantity || 1, isVeg: true })),
            totalPrice: o.totalPrice || 0,
            status: (o.status as any) || 'PENDING',
            type: 'HOME',
            restaurantId: ridId,
            restaurantName: restaurant?.name || 'Restaurant',
            timestamp: o.createdAt ? new Date(o.createdAt).getTime() : Date.now(),
            customerName: o.customerName || o.customerId || '',
            pickupOtp: o.pickupOtp || '6789',
            deliveryOtp: o.deliveryOtp || '9876',
            review: o.review,
            refundStatus: o.refundStatus,
            refundReason: o.refundReason,
          } as Order;
        });
        setOrders(mapped.reverse());
      });
    }

    return () => {
      if (unsub) {
        console.log('[SYNC] Cleaning up subscriptions.');
        unsub();
      }
    };
  }, [userSession.role, userSession.mobile, userSession.restaurantId]);

  return (
    <GlobalContext.Provider value={{ 
      orders, 
      restaurants, 
      userSession, 
      restaurantOnlineStatus,
      availableCoupons,
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      placeOrder, 
      updateOrderStatus, 
      toggleMenuItemAvailability,
      setUserStatus,
      setRestaurantStatus,
      loginUser,
      registerUser,
      logoutUser,
      toggleFavorite,
      updateProfile,
      redeemPoints,
      claimedCoupon,
      claimCoupon,
      addReview,
      requestRefund,
      handleRefund
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
