import { verifyToken } from './auth.js';

// Authentication middleware
function requireAuth(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' });
    return false;
  }
  
  const token = authHeader.substring(7);
  if (!verifyToken(token)) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return false;
  }
  
  return true;
}

// API endpoint to get server-side environment variables
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Check authentication
    if (!requireAuth(req, res)) {
      return;
    }

    try {
      // Return environment variables (only after authentication)
      const config = {
        hasOpenAIKey: !!process.env.OPENAI_API_KEY,
        openaiApiKey: process.env.OPENAI_API_KEY || null,
        adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
        globalPassword: process.env.GLOBAL_PASSWORD || 'exam2024'
      };
      
      res.status(200).json(config);
    } catch (error) {
      console.error('Config API Error:', error);
      res.status(500).json({ error: 'Failed to load configuration' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}