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

## 📋 Problem Set Format

### Basic Structure
```json
{
  "title": "Problem Set Title",
  "description": "Brief description",
  "questions": [...]
}
```

### Question Types

#### Single Choice
```json
{
  "id": 1,
  "type": "single_choice",
  "question": "What is $\\sqrt{16}$?",
  "options": ["2", "4", "8", "16"],
  "correct_answer": 1,
  "score": 10,
  "explanation": "The square root of 16 is 4."
}
```

#### Multiple Choice
```json
{
  "id": 2,
  "type": "multiple_choice", 
  "question": "Select all prime numbers:",
  "options": ["2", "3", "4", "5"],
  "correct_answers": [0, 1, 3],
  "score": 15,
  "explanation": "2, 3, and 5 are prime numbers."
}
```

#### Essay Question
```json
{
  "id": 3,
  "type": "essay",
  "question": "Explain the Pythagorean theorem...",
  "score": 20,
  "explanation": "The theorem states that a²+b²=c²..."
}
```

See the prompt generation guide for complete format documentation.

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