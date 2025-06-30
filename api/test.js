export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Simple test to see if basic Node.js functionality works
    const fs = require('fs');
    const path = require('path');
    
    const dataDir = path.join(process.cwd(), 'data');
    console.log('Data directory:', dataDir);
    
    // Try to read directory
    let files = [];
    try {
      files = fs.readdirSync(dataDir);
      console.log('Files in data directory:', files);
    } catch (error) {
      console.error('Error reading data directory:', error);
    }
    
    // Try to read index.json
    let indexContent = null;
    try {
      const indexPath = path.join(dataDir, 'index.json');
      console.log('Reading index from:', indexPath);
      const content = fs.readFileSync(indexPath, 'utf8');
      indexContent = JSON.parse(content);
      console.log('Index loaded successfully, problem sets count:', indexContent.problem_sets?.length);
    } catch (error) {
      console.error('Error reading index.json:', error);
    }
    
    res.status(200).json({
      success: true,
      message: 'Test endpoint working',
      dataDir: dataDir,
      files: files,
      indexContent: indexContent
    });
    
  } catch (error) {
    console.error('Test endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}