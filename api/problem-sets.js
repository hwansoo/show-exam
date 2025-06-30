const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

// JWT secret key - same as auth.js
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_API_BASE = 'https://api.github.com';

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

// GitHub API helper functions using Node.js built-in modules
async function getFileFromGitHub(filePath) {
  try {
    const https = require('https');
    const url = `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
    
    return new Promise((resolve, reject) => {
      const options = {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'show-exam-vercel-app'
        }
      };
      
      const req = https.get(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            if (res.statusCode === 404) {
              resolve(null);
              return;
            }
            
            if (res.statusCode !== 200) {
              reject(new Error(`GitHub API error: ${res.statusCode}`));
              return;
            }
            
            const responseData = JSON.parse(data);
            const content = Buffer.from(responseData.content, 'base64').toString('utf8');
            resolve({
              content: JSON.parse(content),
              sha: responseData.sha
            });
          } catch (error) {
            reject(error);
          }
        });
      });
      
      req.on('error', reject);
    });
  } catch (error) {
    console.error('Error reading from GitHub:', error);
    throw error;
  }
}

async function saveFileToGitHub(filePath, data, sha = null) {
  try {
    const https = require('https');
    const url = `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`;
    
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
    
    const payload = {
      message: `${sha ? 'Update' : 'Create'} ${filePath}`,
      content: content
    };
    
    if (sha) {
      payload.sha = sha;
    }
    
    const postData = JSON.stringify(payload);
    
    return new Promise((resolve, reject) => {
      const options = {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
          'User-Agent': 'show-exam-vercel-app',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve(JSON.parse(data));
            } else {
              const errorData = JSON.parse(data);
              reject(new Error(`GitHub API error: ${res.statusCode} - ${errorData.message}`));
            }
          } catch (error) {
            reject(error);
          }
        });
      });
      
      req.on('error', reject);
      req.write(postData);
      req.end();
    });
  } catch (error) {
    console.error('Error saving to GitHub:', error);
    throw error;
  }
}

// Data validation functions
function validateProblemSetData(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid data format' };
  }
  
  if (!data.title || typeof data.title !== 'string') {
    return { valid: false, error: 'Title is required and must be a string' };
  }
  
  if (!data.description || typeof data.description !== 'string') {
    return { valid: false, error: 'Description is required and must be a string' };
  }
  
  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    return { valid: false, error: 'Questions array is required and must not be empty' };
  }
  
  // Validate each question
  for (let i = 0; i < data.questions.length; i++) {
    const question = data.questions[i];
    if (!question.id || !question.type || !question.question) {
      return { valid: false, error: `Question ${i + 1} is missing required fields (id, type, question)` };
    }
  }
  
  return { valid: true };
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
module.exports = async function handler(req, res) {
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
        // Create new problem set
        try {
          console.log('Creating new problem set...');
          
          if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
            return res.status(500).json({ error: 'GitHub integration not configured' });
          }
          
          const { key: newKey, data: problemSetData } = req.body;
          
          if (!newKey || !problemSetData) {
            return res.status(400).json({ error: 'Key and data are required' });
          }

          // Validate key format
          if (!/^[a-zA-Z0-9_]+$/.test(newKey)) {
            return res.status(400).json({ error: 'Invalid key format. Use only letters, numbers, and underscores.' });
          }

          // Validate problem set data
          const validation = validateProblemSetData(problemSetData);
          if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
          }

          // Get current index from GitHub
          console.log('Fetching current index from GitHub...');
          const indexData = await getFileFromGitHub('data/index.json');
          if (!indexData) {
            return res.status(500).json({ error: 'Failed to read index from GitHub' });
          }

          // Check if key already exists
          if (indexData.content.problem_sets.some(ps => ps.key === newKey)) {
            return res.status(409).json({ error: 'Problem set with this key already exists' });
          }

          // Save problem set file to GitHub
          const newFileName = `${newKey}.json`;
          console.log('Saving problem set file to GitHub:', newFileName);
          
          await saveFileToGitHub(`data/${newFileName}`, problemSetData);

          // Update index
          const newProblemSet = {
            key: newKey,
            file: newFileName,
            title: problemSetData.title,
            description: problemSetData.description,
            category: 'custom',
            difficulty: 'unknown',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_built_in: false
          };

          indexData.content.problem_sets.push(newProblemSet);
          
          console.log('Updating index in GitHub...');
          await saveFileToGitHub('data/index.json', indexData.content, indexData.sha);

          console.log('Problem set created successfully:', newKey);
          res.status(201).json({ 
            message: 'Problem set created successfully',
            key: newKey,
            title: problemSetData.title
          });
          
        } catch (error) {
          console.error('Failed to create problem set:', error);
          res.status(500).json({ 
            error: 'Failed to create problem set', 
            details: error.message 
          });
        }
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