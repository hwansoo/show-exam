import fs from 'fs';
import path from 'path';
import { verifyToken } from './auth.js';

// GitHub API configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_API_BASE = 'https://api.github.com';

const DATA_DIR = path.join(process.cwd(), 'data');
const INDEX_FILE = path.join(DATA_DIR, 'index.json');

// Helper function to read JSON file (local fallback)
function readJsonFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

// GitHub API helper functions
async function getFileFromGitHub(filePath) {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // File doesn't exist
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf8');
    return {
      content: JSON.parse(content),
      sha: data.sha
    };
  } catch (error) {
    console.error('Error reading from GitHub:', error);
    return null;
  }
}

async function saveFileToGitHub(filePath, data, sha = null) {
  try {
    const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
    
    const payload = {
      message: `Update ${filePath}`,
      content: content
    };
    
    if (sha) {
      payload.sha = sha;
    }
    
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API error: ${response.status} - ${errorData.message}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving to GitHub:', error);
    throw error;
  }
}

// Unified read function (try GitHub first, fallback to local)
async function readDataFile(relativePath) {
  // Try reading from GitHub first
  if (GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO) {
    try {
      const githubData = await getFileFromGitHub(relativePath);
      if (githubData) {
        return githubData;
      }
    } catch (error) {
      console.error('GitHub read failed, falling back to local:', error);
    }
  }
  
  // Fallback to local file system
  const localPath = path.join(process.cwd(), relativePath);
  const content = readJsonFile(localPath);
  return content ? { content, sha: null } : null;
}

// Unified write function (use GitHub for persistence)
async function writeDataFile(relativePath, data, sha = null) {
  if (GITHUB_TOKEN && GITHUB_OWNER && GITHUB_REPO) {
    try {
      return await saveFileToGitHub(relativePath, data, sha);
    } catch (error) {
      console.error('GitHub write failed:', error);
      throw new Error(`Failed to save to GitHub: ${error.message}`);
    }
  } else {
    throw new Error('GitHub integration not configured for file persistence');
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
export default function handler(req, res) {
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
          const indexData = await readDataFile('data/index.json');
          if (!indexData) {
            return res.status(500).json({ error: 'Failed to read index' });
          }
          
          const problemSet = indexData.content.problem_sets.find(ps => ps.key === key);
          if (!problemSet) {
            return res.status(404).json({ error: 'Problem set not found' });
          }
          
          const problemSetData = await readDataFile(`data/${problemSet.file}`);
          if (!problemSetData) {
            return res.status(500).json({ error: 'Failed to read problem set' });
          }
          
          res.status(200).json(problemSetData.content);
        } else {
          // Get all problem sets index
          console.log('Attempting to read index file...');
          console.log('GitHub config:', { 
            hasToken: !!GITHUB_TOKEN, 
            hasOwner: !!GITHUB_OWNER, 
            hasRepo: !!GITHUB_REPO 
          });
          
          const indexData = await readDataFile('data/index.json');
          if (!indexData) {
            console.error('Failed to read index data');
            return res.status(500).json({ error: 'Failed to read index' });
          }
          
          console.log('Successfully read index data');
          res.status(200).json(indexData.content);
        }
        break;

      case 'POST':
        // Create new problem set
        const { key: newKey, data: problemSetData } = req.body;
        
        if (!newKey || !problemSetData) {
          return res.status(400).json({ error: 'Key and data are required' });
        }

        // Validate key format
        if (!/^[a-zA-Z0-9_]+$/.test(newKey)) {
          return res.status(400).json({ error: 'Invalid key format' });
        }

        const indexData = await readDataFile('data/index.json');
        if (!indexData) {
          return res.status(500).json({ error: 'Failed to read index' });
        }

        // Check if key already exists
        if (indexData.content.problem_sets.some(ps => ps.key === newKey)) {
          return res.status(409).json({ error: 'Problem set already exists' });
        }

        // Save problem set file to GitHub
        const newFileName = `${newKey}.json`;
        
        try {
          await writeDataFile(`data/${newFileName}`, problemSetData);
        } catch (error) {
          console.error('Failed to save problem set to GitHub:', error);
          return res.status(500).json({ error: 'Failed to save problem set' });
        }

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
        
        try {
          await writeDataFile('data/index.json', indexData.content, indexData.sha);
        } catch (error) {
          console.error('Failed to update index in GitHub:', error);
          return res.status(500).json({ error: 'Failed to update index' });
        }

        res.status(201).json({ message: 'Problem set created successfully' });
        break;

      case 'PUT':
        // Update existing problem set
        if (!key) {
          return res.status(400).json({ error: 'Key is required' });
        }

        const { data: updatedData } = req.body;
        if (!updatedData) {
          return res.status(400).json({ error: 'Data is required' });
        }

        const currentIndexData = await readDataFile('data/index.json');
        if (!currentIndexData) {
          return res.status(500).json({ error: 'Failed to read index' });
        }

        const existingProblemSet = currentIndexData.content.problem_sets.find(ps => ps.key === key);
        if (!existingProblemSet) {
          return res.status(404).json({ error: 'Problem set not found' });
        }

        // Don't allow updating built-in problem sets
        if (existingProblemSet.is_built_in) {
          return res.status(403).json({ error: 'Cannot update built-in problem sets' });
        }

        // Update problem set file
        try {
          await writeDataFile(`data/${existingProblemSet.file}`, updatedData);
        } catch (error) {
          console.error('Failed to update problem set in GitHub:', error);
          return res.status(500).json({ error: 'Failed to update problem set' });
        }

        // Update index metadata
        existingProblemSet.title = updatedData.title;
        existingProblemSet.description = updatedData.description;
        existingProblemSet.updated_at = new Date().toISOString();

        try {
          await writeDataFile('data/index.json', currentIndexData.content, currentIndexData.sha);
        } catch (error) {
          console.error('Failed to update index in GitHub:', error);
          return res.status(500).json({ error: 'Failed to update index' });
        }

        res.status(200).json({ message: 'Problem set updated successfully' });
        break;

      case 'DELETE':
        // Delete problem set
        if (!key) {
          return res.status(400).json({ error: 'Key is required' });
        }

        const deleteIndexData = await readDataFile('data/index.json');
        if (!deleteIndexData) {
          return res.status(500).json({ error: 'Failed to read index' });
        }

        const problemSetToDelete = deleteIndexData.content.problem_sets.find(ps => ps.key === key);
        if (!problemSetToDelete) {
          return res.status(404).json({ error: 'Problem set not found' });
        }

        // Don't allow deleting built-in problem sets
        if (problemSetToDelete.is_built_in) {
          return res.status(403).json({ error: 'Cannot delete built-in problem sets' });
        }

        // Note: GitHub API doesn't have a direct delete endpoint for files in this implementation
        // For now, we'll just remove from index. In a full implementation, you'd want to 
        // implement GitHub file deletion as well.

        // Update index (remove the problem set)
        deleteIndexData.content.problem_sets = deleteIndexData.content.problem_sets.filter(ps => ps.key !== key);
        
        try {
          await writeDataFile('data/index.json', deleteIndexData.content, deleteIndexData.sha);
        } catch (error) {
          console.error('Failed to update index in GitHub:', error);
          return res.status(500).json({ error: 'Failed to update index' });
        }

        res.status(200).json({ message: 'Problem set deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}