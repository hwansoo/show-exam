const jwt = require('jsonwebtoken');

// JWT secret key - same as auth.js
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// OpenAI API configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Verify JWT token
function verifyToken(token) {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
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

// Create sophisticated grading prompt
function createGradingPrompt(question, userAnswer, maxScore) {
  return `You are an expert educator grading a student's essay answer. Please evaluate the following response with fairness and educational insight.

**Question:** ${question.question}
**Maximum Score:** ${maxScore} points
**Student Answer:** ${userAnswer}

**Grading Criteria:**
1. **Mathematical Accuracy (40%):** Are calculations and formulas correct?
2. **Conceptual Understanding (30%):** Does the student understand the underlying concepts?
3. **Explanation Quality (20%):** Is the reasoning clear and well-explained?
4. **Completeness (10%):** Does the answer address all parts of the question?

**Special Considerations:**
- Give full credit for mathematically correct solutions even if explanation is brief
- Recognize mathematical expressions in any notation (^2, ², etc.)
- Value correct reasoning process over keyword matching
- Be encouraging and constructive in feedback
- Consider partial credit for correct approaches with minor errors

**Output Format:**
Respond with valid JSON only:
{
  "score": [number between 0 and ${maxScore}],
  "feedback": "[detailed, constructive feedback explaining the score]",
  "strengths": "[what the student did well]",
  "improvements": "[specific suggestions for improvement]",
  "isCorrect": [true/false - whether the core answer is correct]
}

**Important:** Be fair and educational. A correct mathematical solution should receive high marks even if the explanation could be more detailed.`;
}

// Call OpenAI API using Node.js built-in modules
async function callOpenAI(prompt) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const https = require('https');
  const url = 'https://api.openai.com/v1/chat/completions';
  
  const payload = {
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are an expert educator who grades student essays fairly and provides constructive feedback. Always respond with valid JSON.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.3,
    max_tokens: 1000
  };
  
  const postData = JSON.stringify(payload);
  
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'show-exam-grading-system',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const response = JSON.parse(data);
            
            if (response.choices && response.choices[0] && response.choices[0].message) {
              const content = response.choices[0].message.content;
              
              // Try to parse the JSON response from OpenAI
              try {
                const gradingResult = JSON.parse(content);
                resolve(gradingResult);
              } catch (parseError) {
                console.error('Failed to parse OpenAI JSON response:', content);
                reject(new Error('Invalid JSON response from OpenAI'));
              }
            } else {
              reject(new Error('Unexpected OpenAI API response format'));
            }
          } else {
            const errorData = JSON.parse(data);
            reject(new Error(`OpenAI API error: ${res.statusCode} - ${errorData.error?.message || 'Unknown error'}`));
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
}

// Fallback grading system (improved version of the original)
function gradeEssayFallback(question, userAnswer, maxScore) {
  const answerLower = userAnswer.toLowerCase();
  let score = 0;
  let feedback = "";
  let strengths = "";
  let improvements = "";
  
  // Check if answer is too short
  if (userAnswer.trim().length < 5) {
    return {
      score: 0,
      feedback: "답안이 너무 짧습니다. 문제에서 요구하는 내용을 자세히 작성해주세요.",
      strengths: "문제에 응답하려는 의지를 보였습니다.",
      improvements: "더 자세한 설명과 계산 과정을 포함해주세요.",
      isCorrect: false
    };
  }
  
  // Basic effort score
  let baseScore = Math.floor(maxScore * 0.4); // 40% for attempting
  
  // Mathematical expression detection
  const hasFormula = /(\d+\s*[\+\-\*\/\^²]\s*\d+)|([a-z]²?\s*[\+\-\*\/]\s*[a-z]²?)|(=\s*\d+)/.test(answerLower);
  const hasCalculation = /\d+/.test(userAnswer);
  const hasSquareNotation = /(²|\^2|\*\*2)/.test(userAnswer);
  
  // Pythagorean theorem specific
  if (question.question.includes("피타고라스") || question.question.includes("pythagorean")) {
    const pythagoreanKeywords = [
      "피타고라스", "pythagorean", "직각삼각형", "빗변", "제곱", 
      "a²+b²=c²", "a^2+b^2=c^2", "25", "16", "9", "5²", "3²", "4²"
    ];
    
    let keywordCount = 0;
    pythagoreanKeywords.forEach(keyword => {
      if (answerLower.includes(keyword.toLowerCase())) {
        keywordCount++;
      }
    });
    
    // Check for correct calculation (5² - 3² = 16, answer = 4)
    const hasCorrectCalculation = 
      (answerLower.includes("25") && answerLower.includes("9") && answerLower.includes("16")) ||
      (answerLower.includes("5²") && answerLower.includes("3²")) ||
      (answerLower.includes("4²") || answerLower.includes("= 4") || answerLower.includes("답은 4"));
    
    if (hasCorrectCalculation) {
      score = Math.floor(maxScore * 0.85); // 85% for correct calculation
      feedback = "수학적 계산이 정확합니다. ";
      strengths = "피타고라스 정리를 올바르게 적용하여 정확한 답을 도출했습니다.";
      improvements = "피타고라스 정리의 개념 설명을 추가하면 더 완벽한 답안이 됩니다.";
    } else if (keywordCount >= 2 && hasFormula) {
      score = Math.floor(maxScore * 0.7); // 70%
      feedback = "피타고라스 정리의 개념을 이해하고 있습니다. ";
      strengths = "관련 개념들을 언급했습니다.";
      improvements = "계산 과정을 더 명확하게 보여주세요.";
    } else if (hasCalculation) {
      score = Math.max(baseScore, Math.floor(maxScore * 0.5)); // 50%
      feedback = "계산을 시도했습니다. ";
      strengths = "수치적 접근을 시도했습니다.";
      improvements = "피타고라스 정리 공식과 개념 설명을 포함해주세요.";
    } else {
      score = baseScore;
      feedback = "답안을 작성했으나 내용이 부족합니다. ";
      strengths = "문제에 응답하려고 노력했습니다.";
      improvements = "피타고라스 정리 공식(a²+b²=c²)과 계산 과정을 포함해주세요.";
    }
  } else {
    // Generic scoring for other essay questions
    if (userAnswer.length > 100) {
      score = Math.floor(maxScore * 0.7); // 70% for detailed answers
      feedback = "자세한 답안을 작성했습니다. ";
    } else if (userAnswer.length > 50) {
      score = Math.floor(maxScore * 0.6); // 60% for moderate answers
      feedback = "적절한 길이의 답안을 작성했습니다. ";
    } else {
      score = baseScore;
      feedback = "답안이 다소 짧습니다. ";
    }
    
    strengths = "문제에 성실히 응답했습니다.";
    improvements = "더 구체적인 설명과 예시를 포함하면 좋겠습니다.";
  }
  
  return {
    score: Math.min(score, maxScore), // Cap at max score
    feedback: feedback + "AI 채점 시스템을 사용할 수 없어 기본 채점을 적용했습니다.",
    strengths: strengths,
    improvements: improvements,
    isCorrect: score >= maxScore * 0.7
  };
}

// Main handler function
module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Check authentication
  if (!requireAuth(req, res)) {
    return;
  }

  try {
    const { question, userAnswer, maxScore } = req.body;
    
    if (!question || !userAnswer || !maxScore) {
      return res.status(400).json({ 
        error: 'Missing required fields: question, userAnswer, maxScore' 
      });
    }

    console.log('Grading essay question:', question.id || 'unknown');
    console.log('User answer length:', userAnswer.length);
    console.log('Max score:', maxScore);

    // Try AI grading first
    if (OPENAI_API_KEY) {
      try {
        console.log('Attempting AI grading with OpenAI...');
        const prompt = createGradingPrompt(question, userAnswer, maxScore);
        const aiResult = await callOpenAI(prompt);
        
        console.log('AI grading successful');
        res.status(200).json({
          ...aiResult,
          method: 'ai',
          timestamp: new Date().toISOString()
        });
        return;
        
      } catch (aiError) {
        console.error('AI grading failed:', aiError.message);
        // Fall through to fallback grading
      }
    } else {
      console.log('OpenAI API key not configured, using fallback grading');
    }

    // Fallback to improved rule-based grading
    console.log('Using fallback grading system...');
    const fallbackResult = gradeEssayFallback(question, userAnswer, maxScore);
    
    res.status(200).json({
      ...fallbackResult,
      method: 'fallback',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Grading error:', error);
    res.status(500).json({ 
      error: 'Grading failed', 
      details: error.message 
    });
  }
};