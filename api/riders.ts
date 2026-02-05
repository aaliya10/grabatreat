import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockOrders, mockUsers } from './utils/mockData';

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
    const { riderId } = req.query;

    if (riderId) {
      // Get rider's assigned orders
      const rider = mockUsers[riderId as string];
      const assignedOrders = mockOrders.filter(o => o.riderId === riderId);

      // Calculate stats
      const totalDeliveries = assignedOrders.filter(o => o.status === 'delivered').length;
      const activeDeliveries = assignedOrders.filter(o => o.status === 'out_for_delivery').length;
      const totalEarnings = assignedOrders
        .filter(o => o.status === 'delivered')
        .reduce((sum, o) => sum + (o.totalPrice * 0.1), 0); // 10% commission

      return res.status(200).json({
        success: true,
        rider,
        orders: assignedOrders,
        stats: {
          totalDeliveries,
          activeDeliveries,
          totalEarnings: totalEarnings.toFixed(2),
          rating: 4.8,
        },
      });
    }

    // Get all available orders for riders
    const availableOrders = mockOrders.filter(o => o.status === 'confirmed' && !o.riderId);

    res.status(200).json({
      success: true,
      availableOrders,
    });
    return;
  }

  // PUT - Assign rider to order or update status
  if (req.method === 'PUT') {
    const { orderId, riderId, status } = req.body;

    const order = mockOrders.find(o => o.id === orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    if (riderId) order.riderId = riderId;
    if (status) order.status = status;

    res.status(200).json({
      success: true,
      message: 'Order updated',
      order,
    });
    return;
  }

  res.status(405).json({ message: 'Method not allowed' });
}
