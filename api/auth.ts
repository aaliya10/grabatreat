import { VercelRequest, VercelResponse } from '@vercel/node';
import { mockUsers } from './utils/mockData';

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

    // Login
    if (action === 'login') {
      const user = Object.values(mockUsers).find(u => u.email === email);
      if (user) {
        return res.status(200).json({
          success: true,
          message: 'Login successful',
          user,
          token: `token_${user.id}_${Date.now()}`,
        });
      }
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Signup
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
        message: 'Signup successful',
        user: newUser,
        token: `token_${newUser.id}_${Date.now()}`,
      });
    }
  }

  // Demo login (for testing)
  if (req.method === 'GET') {
    const { type } = req.query;

    if (type === 'demo') {
      return res.status(200).json({
        success: true,
        message: 'Demo login successful',
        users: Object.values(mockUsers),
      });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
