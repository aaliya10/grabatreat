import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockUsers } from './utils/mockData';

/**
 * Backend Auth API
 * 
 * Frontend Configuration:
 * - For Firebase: Use it directly from frontend (client-side auth)
 * - For Mock Data: Use this API endpoint
 *
 * The frontend should use either:
 * 1. Firebase Auth (recommended) - More secure
 * 2. This API with mock data - For testing
 */

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

  if (req.method === 'POST') {
    const { action, email, password, name, role } = req.body;

    // Login with mock data
    if (action === 'login') {
      const user = Object.values(mockUsers).find(u => u.email === email);
      if (user) {
        return res.status(200).json({
          success: true,
          message: 'Login successful (mock)',
          user,
          token: `token_${user.id}_${Date.now()}`,
          note: 'Using mock data. For real persistence, configure Firebase.',
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Signup with mock data
    if (action === 'signup') {
      const newUserId = `user_${Date.now()}`;
      const newUser = {
        id: newUserId,
        name,
        email,
        role: role || 'customer',
        phone: '0000000000',
      };

      return res.status(201).json({
        success: true,
        message: 'Signup successful (mock)',
        user: newUser,
        token: `token_${newUser.id}_${Date.now()}`,
        note: 'Using mock data. For real persistence, configure Firebase.',
      });
    }
  }

  // Demo login (for testing)
  if (req.method === 'GET') {
    const { type } = req.query;

    if (type === 'demo') {
      return res.status(200).json({
        success: true,
        message: 'Demo users available',
        users: Object.values(mockUsers),
        note: 'Using mock data. For persistence across devices, use Firebase.',
      });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
