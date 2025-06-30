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
    const fs = require('fs');
    const path = require('path');
    
    const mathPath = path.join(process.cwd(), 'data', 'math_basic.json');
    console.log('Reading math file from:', mathPath);
    
    const content = fs.readFileSync(mathPath, 'utf8');
    const mathData = JSON.parse(content);
    
    console.log('Math data loaded, question count:', mathData.questions.length);
    
    res.status(200).json({
      success: true,
      title: mathData.title,
      questionCount: mathData.questions.length,
      questions: mathData.questions.map((q, index) => ({
        index: index + 1,
        id: q.id,
        type: q.type,
        question: q.question.substring(0, 50) + '...'
      })),
      fullData: mathData // Include full data for verification
    });
    
  } catch (error) {
    console.error('Test math endpoint error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}