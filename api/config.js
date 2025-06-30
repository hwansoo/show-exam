// API endpoint to get server-side environment variables
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    try {
      // Return environment variables (only non-sensitive config)
      const config = {
        hasOpenAIKey: !!process.env.OPENAI_API_KEY,
        openaiApiKey: process.env.OPENAI_API_KEY || null,
        adminPassword: process.env.ADMIN_PASSWORD || 'admin123'
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