import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockOrders, mockRestaurants, mockUsers } from './utils/mockData';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const { partnerId } = req.query;

    if (partnerId) {
      // Get partner's restaurant and orders
      const partner = mockUsers[partnerId as string];
      const restaurant = mockRestaurants[0]; // Assuming partner1 owns restaurant rest1

      // Get orders for this restaurant
      const restaurantOrders = mockOrders.filter(o => o.restaurantId === restaurant.id);

      // Calculate stats
      const totalOrders = restaurantOrders.length;
      const completedOrders = restaurantOrders.filter(o => o.status === 'delivered').length;
      const pendingOrders = restaurantOrders.filter(o => o.status === 'pending').length;
      const totalRevenue = restaurantOrders
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + o.totalPrice, 0);

      return res.status(200).json({
        success: true,
        partner,
        restaurant,
        orders: restaurantOrders,
        stats: {
          totalOrders,
          completedOrders,
          pendingOrders,
          totalRevenue,
        },
      });
    }

    res.status(200).json({
      success: true,
      restaurants: mockRestaurants,
    });
    return;
  }

  res.status(405).json({ message: 'Method not allowed' });
}
