import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockRestaurants, mockMenuItems } from './utils/mockData';

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
    const { restaurantId } = req.query;

    // Get menu items for a restaurant
    if (restaurantId) {
      const menu = mockMenuItems.filter(item => item.restaurantId === restaurantId);
      const restaurant = mockRestaurants.find(r => r.id === restaurantId);

      return res.status(200).json({
        success: true,
        restaurant,
        menu,
      });
    }

    // Get all restaurants
    res.status(200).json({
      success: true,
      restaurants: mockRestaurants,
    });
    return;
  }

  res.status(405).json({ message: 'Method not allowed' });
}
