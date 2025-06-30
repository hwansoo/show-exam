const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// JWT secret key - same as auth.js
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Verify JWT token - same logic as auth.js
function verifyToken(token) {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

// Helper function to read JSON file
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

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

// Main handler function
module.exports = function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Check authentication for all requests
  if (!requireAuth(req, res)) {
    return;
  }

  const { method } = req;
  const { key } = req.query;

  try {
    switch (method) {
      case 'GET':
        if (key) {
          // Get specific problem set
          console.log('Getting specific problem set:', key);
          
          const indexPath = path.join(process.cwd(), 'data', 'index.json');
          const index = readJsonFile(indexPath);
          if (!index) {
            return res.status(500).json({ error: 'Failed to read index' });
          }
          
          const problemSet = index.problem_sets.find(ps => ps.key === key);
          if (!problemSet) {
            return res.status(404).json({ error: 'Problem set not found' });
          }
          
          const problemSetPath = path.join(process.cwd(), 'data', problemSet.file);
          console.log('Reading problem set from:', problemSetPath);
          
          const content = readJsonFile(problemSetPath);
          if (!content) {
            return res.status(500).json({ error: 'Failed to read problem set' });
          }
          
          console.log('Successfully loaded problem set, questions:', content.questions?.length);
          res.status(200).json(content);
        } else {
          // Get all problem sets index
          console.log('Getting problem sets index');
          
          const indexPath = path.join(process.cwd(), 'data', 'index.json');
          const index = readJsonFile(indexPath);
          if (!index) {
            return res.status(500).json({ error: 'Failed to read index' });
          }
          
          console.log('Successfully loaded index, problem sets count:', index.problem_sets?.length);
          res.status(200).json(index);
        }
        break;

      case 'POST':
        // Create new problem set - temporarily disabled
        res.status(501).json({ error: 'Write operations temporarily disabled' });
        break;

      case 'PUT':
        // Update existing problem set - temporarily disabled
        res.status(501).json({ error: 'Write operations temporarily disabled' });
        break;

      case 'DELETE':
        // Delete problem set - temporarily disabled
        res.status(501).json({ error: 'Write operations temporarily disabled' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};