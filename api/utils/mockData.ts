// Mock Database
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'partner' | 'rider';
  phone: string;
  avatar?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  rating: number;
  deliveryTime: string;
  image?: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

export interface Order {
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

// Mock Users
export const mockUsers: Record<string, User> = {
  'user1': { id: 'user1', name: 'John Doe', email: 'customer@example.com', role: 'customer', phone: '9876543210' },
  'partner1': { id: 'partner1', name: 'Pizza Palace', email: 'partner@example.com', role: 'partner', phone: '9876543211' },
  'rider1': { id: 'rider1', name: 'Raj Kumar', email: 'rider@example.com', role: 'rider', phone: '9876543212' },
};

// Mock Restaurants
export const mockRestaurants: Restaurant[] = [
  {
    id: 'rest1',
    name: 'Pizza Palace',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.5,
    deliveryTime: '30-45 mins',
    image: 'https://via.placeholder.com/200?text=Pizza+Palace',
  },
  {
    id: 'rest2',
    name: 'Burger Bliss',
    cuisines: ['American', 'Burgers'],
    rating: 4.2,
    deliveryTime: '25-35 mins',
    image: 'https://via.placeholder.com/200?text=Burger+Bliss',
  },
  {
    id: 'rest3',
    name: 'Spice Route',
    cuisines: ['Indian', 'North Indian'],
    rating: 4.7,
    deliveryTime: '35-50 mins',
    image: 'https://via.placeholder.com/200?text=Spice+Route',
  },
];

// Mock Menu Items
export const mockMenuItems: MenuItem[] = [
  {
    id: 'item1',
    restaurantId: 'rest1',
    name: 'Margherita Pizza',
    price: 250,
    description: 'Classic pizza with cheese',
    image: 'https://via.placeholder.com/150?text=Margherita',
  },
  {
    id: 'item2',
    restaurantId: 'rest1',
    name: 'Pepperoni Pizza',
    price: 350,
    description: 'Pizza with pepperoni and cheese',
    image: 'https://via.placeholder.com/150?text=Pepperoni',
  },
  {
    id: 'item3',
    restaurantId: 'rest2',
    name: 'Cheeseburger',
    price: 200,
    description: 'Juicy burger with cheese',
    image: 'https://via.placeholder.com/150?text=Cheeseburger',
  },
  {
    id: 'item4',
    restaurantId: 'rest3',
    name: 'Butter Chicken',
    price: 320,
    description: 'Creamy butter chicken curry',
    image: 'https://via.placeholder.com/150?text=Butter+Chicken',
  },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order1',
    customerId: 'user1',
    restaurantId: 'rest1',
    items: [
      { itemId: 'item1', quantity: 2, price: 250 },
      { itemId: 'item2', quantity: 1, price: 350 },
    ],
    totalPrice: 850,
    status: 'delivered',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    estimatedDelivery: '45 mins',
    riderId: 'rider1',
    deliveryAddress: '123 Main St, City',
  },
  {
    id: 'order2',
    customerId: 'user1',
    restaurantId: 'rest2',
    items: [{ itemId: 'item3', quantity: 2, price: 200 }],
    totalPrice: 400,
    status: 'out_for_delivery',
    createdAt: new Date().toISOString(),
    estimatedDelivery: '30 mins',
    riderId: 'rider1',
    deliveryAddress: '123 Main St, City',
  },
  {
    id: 'order3',
    customerId: 'user1',
    restaurantId: 'rest3',
    items: [{ itemId: 'item4', quantity: 1, price: 320 }],
    totalPrice: 320,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    estimatedDelivery: '50 mins',
    deliveryAddress: '123 Main St, City',
  },
];
