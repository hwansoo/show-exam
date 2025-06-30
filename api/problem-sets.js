import fs from 'fs';
import path from 'path';
import { verifyToken } from './auth.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const INDEX_FILE = path.join(DATA_DIR, 'index.json');

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

// Helper function to write JSON file
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing file:', error);
    return false;
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
          const index = readJsonFile(INDEX_FILE);
          if (!index) {
            return res.status(500).json({ error: 'Failed to read index' });
          }
          
          const problemSet = index.problem_sets.find(ps => ps.key === key);
          if (!problemSet) {
            return res.status(404).json({ error: 'Problem set not found' });
          }
          
          const problemSetPath = path.join(DATA_DIR, problemSet.file);
          const content = readJsonFile(problemSetPath);
          if (!content) {
            return res.status(500).json({ error: 'Failed to read problem set' });
          }
          
          res.status(200).json(content);
        } else {
          // Get all problem sets index
          const index = readJsonFile(INDEX_FILE);
          if (!index) {
            return res.status(500).json({ error: 'Failed to read index' });
          }
          res.status(200).json(index);
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

        const index = readJsonFile(INDEX_FILE);
        if (!index) {
          return res.status(500).json({ error: 'Failed to read index' });
        }

        // Check if key already exists
        if (index.problem_sets.some(ps => ps.key === newKey)) {
          return res.status(409).json({ error: 'Problem set already exists' });
        }

        // Save problem set file
        const newFileName = `${newKey}.json`;
        const newFilePath = path.join(DATA_DIR, newFileName);
        
        if (!writeJsonFile(newFilePath, problemSetData)) {
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

        index.problem_sets.push(newProblemSet);
        
        if (!writeJsonFile(INDEX_FILE, index)) {
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

        const currentIndex = readJsonFile(INDEX_FILE);
        if (!currentIndex) {
          return res.status(500).json({ error: 'Failed to read index' });
        }

        const existingProblemSet = currentIndex.problem_sets.find(ps => ps.key === key);
        if (!existingProblemSet) {
          return res.status(404).json({ error: 'Problem set not found' });
        }

        // Don't allow updating built-in problem sets
        if (existingProblemSet.is_built_in) {
          return res.status(403).json({ error: 'Cannot update built-in problem sets' });
        }

        // Update problem set file
        const updateFilePath = path.join(DATA_DIR, existingProblemSet.file);
        if (!writeJsonFile(updateFilePath, updatedData)) {
          return res.status(500).json({ error: 'Failed to update problem set' });
        }

        // Update index metadata
        existingProblemSet.title = updatedData.title;
        existingProblemSet.description = updatedData.description;
        existingProblemSet.updated_at = new Date().toISOString();

        if (!writeJsonFile(INDEX_FILE, currentIndex)) {
          return res.status(500).json({ error: 'Failed to update index' });
        }

        res.status(200).json({ message: 'Problem set updated successfully' });
        break;

      case 'DELETE':
        // Delete problem set
        if (!key) {
          return res.status(400).json({ error: 'Key is required' });
        }

        const deleteIndex = readJsonFile(INDEX_FILE);
        if (!deleteIndex) {
          return res.status(500).json({ error: 'Failed to read index' });
        }

        const problemSetToDelete = deleteIndex.problem_sets.find(ps => ps.key === key);
        if (!problemSetToDelete) {
          return res.status(404).json({ error: 'Problem set not found' });
        }

        // Don't allow deleting built-in problem sets
        if (problemSetToDelete.is_built_in) {
          return res.status(403).json({ error: 'Cannot delete built-in problem sets' });
        }

        // Delete problem set file
        const deleteFilePath = path.join(DATA_DIR, problemSetToDelete.file);
        try {
          fs.unlinkSync(deleteFilePath);
        } catch (error) {
          console.error('Error deleting file:', error);
          return res.status(500).json({ error: 'Failed to delete problem set file' });
        }

        // Update index
        deleteIndex.problem_sets = deleteIndex.problem_sets.filter(ps => ps.key !== key);
        
        if (!writeJsonFile(INDEX_FILE, deleteIndex)) {
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