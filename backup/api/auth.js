import jwt from 'jsonwebtoken';

// JWT secret key - in production, use a secure random key
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Generate JWT token
function generateToken() {
  return jwt.sign(
    { 
      authenticated: true,
      issued: Date.now()
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Verify JWT token
export function verifyToken(token) {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    // Token is invalid or expired
    return false;
  }
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
        // Generate JWT token
        const token = generateToken();
        
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