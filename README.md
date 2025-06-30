# 📚 Show Exam - Interactive Exam Practice Service

A comprehensive web-based exam practice platform with admin management capabilities, built for free deployment on Vercel.

## ✨ Features

### 🎯 Exam Taking
- **Multiple Question Types**: Single choice, multiple choice, true/false, short answer, essay
- **Math Support**: LaTeX rendering with KaTeX
- **Random Shuffling**: Options are randomized to prevent memorization
- **Compound Questions**: Multi-part questions with sub-questions
- **Automatic Grading**: Objective questions graded instantly
- **AI Essay Grading**: Advanced OpenAI GPT-4 integration with educational rubrics
- **Smart Feedback**: Detailed feedback with strengths and improvement suggestions
- **Mathematical Recognition**: Proper scoring for mathematical accuracy over keywords

### 🛠️ Admin Management
- **Password Protection**: Secure admin panel access
- **CRUD Operations**: Create, read, update, delete problem sets
- **JSON Import**: Direct JSON problem set upload
- **Built-in Protection**: Default problem sets cannot be deleted
- **Real-time Updates**: Changes reflect immediately

### 🚀 Deployment Ready
- **Vercel Optimized**: Free tier deployment support
- **File-based Storage**: No database required
- **Serverless API**: Efficient resource usage
- **Environment Variables**: Secure configuration management

## 🏗️ Architecture

```
Frontend (Static HTML/JS) → Vercel Serverless Functions → JSON File Storage
                                        ↓
                              AI Grading System (OpenAI GPT-4)
```

- **Frontend**: Single-page application with vanilla JavaScript
- **Backend**: Node.js serverless functions for API operations
- **Storage**: JSON files in the repository (git-tracked)
- **AI Grading**: OpenAI GPT-4 integration for essay evaluation
- **Deployment**: Vercel with automatic deployments

## 📁 Project Structure

```
show-exam/
├── api/                    # Serverless API functions
│   ├── auth.js            # JWT authentication
│   ├── grade-essay.js     # AI grading system
│   ├── problem-sets.js    # CRUD operations
│   └── config.js          # API configuration
├── data/                  # Problem sets storage
│   ├── index.json         # Problem sets index
│   ├── math_basic.json    # Sample math problems
│   └── physics_basic.json # Sample physics problems
├── tests/                 # Organized test suites
│   ├── auth/             # Authentication tests
│   ├── api/              # API endpoint tests
│   ├── grading/          # AI grading tests
│   ├── deployment/       # Deployment tests
│   └── archive/          # Legacy tests
├── index.html            # Main application
├── vercel.json           # Vercel configuration
├── playwright.config.js  # Test configuration
└── package.json          # Dependencies
```

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone https://github.com/yourusername/show-exam.git
cd show-exam
npm install
```

### 2. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Local Development
```bash
npm run dev
```

### 4. Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📋 Problem Set Format & Generation Guide

### 📋 Basic Structure

```json
{
  "title": "문제집 제목",
  "description": "문제집 설명",
  "questions": [
    // 문제 목록
  ]
}
```

### 🔍 Supported Question Types

#### 1. Single Choice (객관식)
- **Purpose**: Single correct answer selection
- **Required fields**: id, type, question, options, correct_answer, score, explanation

```json
{
  "id": 1,
  "type": "single_choice",
  "question": "문제 내용 (LaTeX 수식 지원: $\\sqrt{16}$)",
  "options": ["선택지1", "선택지2", "선택지3", "선택지4"],
  "correct_answer": 1,
  "score": 10,
  "explanation": "해설 내용"
}
```

#### 2. Multiple Choice (복수 선택)
- **Purpose**: Multiple correct answers selection
- **Required fields**: correct_answers (array)

```json
{
  "id": 2,
  "type": "multiple_choice",
  "question": "해당하는 것을 모두 고르세요.",
  "options": ["옵션1", "옵션2", "옵션3", "옵션4", "옵션5", "옵션6"],
  "correct_answers": [0, 1, 3, 5],
  "score": 15,
  "explanation": "해설 내용"
}
```

#### 3. True/False (참/거짓)
- **Purpose**: True/false judgment
- **Required fields**: correct_answer (boolean)

```json
{
  "id": 3,
  "type": "true_false",
  "question": "$\\pi$는 무리수이다.",
  "correct_answer": true,
  "score": 10,
  "explanation": "해설 내용"
}
```

#### 4. Short Answer (단답형)
- **Purpose**: Brief answer input
- **Required fields**: correct_answer (string)

```json
{
  "id": 4,
  "type": "short_answer",
  "question": "$2x + 5 = 13$일 때, $x$의 값을 구하세요.",
  "correct_answer": "4",
  "score": 15,
  "explanation": "해설 내용"
}
```

#### 5. Essay (서술형)
- **Purpose**: Long-form written responses (AI grading)
- **Required fields**: score, explanation

```json
{
  "id": 5,
  "type": "essay",
  "question": "피타고라스 정리를 설명하고 계산 과정을 서술하세요.",
  "score": 20,
  "explanation": "모범 답안 및 채점 기준"
}
```

#### 6. Compound Questions (복합 문제)
- **Purpose**: Multiple sub-questions within one main question
- **Required fields**: sub_questions (array)

```json
{
  "id": 6,
  "type": "compound",
  "question": "운동 법칙에 관한 문제",
  "score": 30,
  "sub_questions": [
    {
      "id": "6a",
      "type": "true_false",
      "question": "뉴턴의 제1법칙은 관성의 법칙이다.",
      "correct_answer": true,
      "score": 10,
      "explanation": "해설"
    },
    {
      "id": "6b",
      "type": "short_answer",
      "question": "F=ma에서 a를 구하세요.",
      "correct_answer": "2",
      "score": 10,
      "explanation": "해설"
    }
  ]
}
```

### 🎯 Problem Generation Guidelines

#### Essential Requirements:
1. **Unique ID**: Assign unique numeric ID for each question
2. **Appropriate Score**: 5-25 points based on difficulty
3. **Clear Explanation**: Include answer rationale and learning points
4. **LaTeX Math**: Use `$...$` or `$$...$$` for mathematical expressions

#### Recommendations:
- Use mixed question types for variety
- Structure difficulty progressively (easy → hard)
- Include practical examples
- Use clear, unambiguous wording

### 📝 Example Generation Prompt

```
"다음 주제로 10문제짜리 문제집을 만들어주세요:
- 주제: [고등학교 화학 - 산과 염기]
- 구성: 객관식 4문제, 참/거짓 2문제, 단답형 2문제, 서술형 1문제, 복합문제 1문제
- 난이도: 중급
- 특이사항: pH 계산 문제 포함, 실생활 예시 활용"
```

### ⚠️ Important Notes

1. **JSON Syntax**: Follow proper JSON formatting
2. **Character Escaping**: Use `\"` for quotes, `\\` for backslashes
3. **LaTeX Syntax**: Use correct LaTeX syntax for mathematical expressions
4. **Array Indexing**: correct_answer and correct_answers start from 0
5. **Question IDs**: Use format like "2a", "2b" for compound sub-questions

## 🔧 Configuration

### Environment Variables
- `GLOBAL_PASSWORD`: Global access password to protect the entire service (default: exam2024)
- `OPENAI_API_KEY`: For AI essay grading (optional)
- `ADMIN_PASSWORD`: Admin panel access (default: admin123)

### Access Control
1. **Global Access**: Enter the global password to access the service
2. **Admin Access**: Click the "🔧 관리자" button and enter admin password
3. **Problem Management**: Create, edit, and delete custom problem sets

## 🌐 API Reference

### Endpoints
- `GET /api/problem-sets` - List all problem sets
- `GET /api/problem-sets?key={key}` - Get specific problem set
- `POST /api/problem-sets` - Create new problem set
- `PUT /api/problem-sets?key={key}` - Update problem set
- `DELETE /api/problem-sets?key={key}` - Delete problem set
- `POST /api/grade-essay` - AI-powered essay grading
- `POST /api/auth` - User authentication

### Response Format
```json
{
  "version": "1.0.0",
  "problem_sets": [
    {
      "key": "math_basic",
      "title": "Basic Math",
      "description": "Fundamental math concepts",
      "category": "mathematics",
      "is_built_in": true
    }
  ]
}
```

## 🛡️ Security

- **Global Password Protection**: Entire service protected with password authentication
- **Session Management**: 24-hour secure session tokens for authenticated users
- **API Protection**: All endpoints require authentication after login
- **Admin Authentication**: Separate password-based access control for admin functions
- **Input Validation**: JSON schema validation for all data
- **CORS Protection**: Configured for frontend access
- **Built-in Safety**: Core problem sets protected from deletion
- **API Key Protection**: Secure storage and transmission of OpenAI API keys

## 📊 Free Tier Deployment

### Vercel Free Tier Includes:
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Global CDN
- ✅ Custom domains
- ✅ SSL certificates

### Resource Usage:
- **Problem sets**: ~1-5KB each
- **Total storage**: <1MB for typical use
- **Bandwidth**: Minimal for educational use

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check [DEPLOYMENT.md](DEPLOYMENT.md) and [SETUP.md](SETUP.md)
- **Issues**: Open an issue on GitHub
- **Questions**: Start a discussion in the repository

## 🗺️ Roadmap

- [ ] User progress tracking
- [ ] Detailed analytics dashboard
- [ ] Advanced question types
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Question bank import from Excel/CSV

---

**Built with ❤️ for education. Deploy for free on Vercel!**