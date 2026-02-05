import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockOrders, Order } from './utils/mockData';

// In-memory storage for this demo
let orders = [...mockOrders];

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

  // GET - Retrieve orders
  if (req.method === 'GET') {
    const { userId, status } = req.query;

    // Get user's orders
    if (userId) {
      const userOrders = orders.filter(o => o.customerId === userId);
      return res.status(200).json({
        success: true,
        orders: userOrders,
      });
    }

    // Get orders by status
    if (status) {
      const filteredOrders = orders.filter(o => o.status === status);
      return res.status(200).json({
        success: true,
        orders: filteredOrders,
      });
    }

    // Get all orders
    res.status(200).json({
      success: true,
      orders,
    });
    return;
  }

  // POST - Create new order
  if (req.method === 'POST') {
    const { customerId, restaurantId, items, deliveryAddress } = req.body;

    if (!customerId || !restaurantId || !items) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const totalPrice = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      customerId,
      restaurantId,
      items,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: '45 mins',
      deliveryAddress: deliveryAddress || 'Not specified',
    };

    orders.push(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    });
    return;
  }

  // PUT - Update order status
  if (req.method === 'PUT') {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({
        success: false,
        message: 'Missing orderId or status',
      });
    }

    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    orders[orderIndex].status = status;

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      order: orders[orderIndex],
    });
    return;
  }

  res.status(405).json({ message: 'Method not allowed' });
}
