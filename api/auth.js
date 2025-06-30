import crypto from 'crypto';

// Simple session storage (in production, use Redis or database)
const sessions = new Map();

// Generate a simple token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Verify authentication token
export function verifyToken(token) {
  return sessions.has(token);
}

// Authentication API endpoint
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { password } = req.body;
      const globalPassword = process.env.GLOBAL_PASSWORD || 'exam2024';
      
      if (!password) {
        return res.status(400).json({ 
          success: false, 
          error: 'Password is required' 
        });
      }

      if (password === globalPassword) {
        // Generate session token
        const token = generateToken();
        
        // Store session (expires in 24 hours)
        sessions.set(token, {
          created: Date.now(),
          expires: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        });
        
        // Clean up expired sessions
        cleanupExpiredSessions();
        
        res.status(200).json({ 
          success: true, 
          token,
          message: 'Authentication successful'
        });
      } else {
        res.status(401).json({ 
          success: false, 
          error: 'Invalid password' 
        });
      }
    } catch (error) {
      console.error('Auth API Error:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Internal server error' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} not allowed` 
    });
  }
}

// Clean up expired sessions
function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now > session.expires) {
      sessions.delete(token);
    }
  }
}