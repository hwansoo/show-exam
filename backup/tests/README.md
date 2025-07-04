# Test Directory Structure

This directory contains organized test suites for the show-exam application.

## Directory Structure

```
tests/
├── auth/           # Authentication-related tests
├── api/            # API endpoint tests (CRUD operations)
├── grading/        # AI grading system tests
├── deployment/     # Deployment and infrastructure tests
├── archive/        # Archived/legacy test files
└── README.md       # This file
```

## Test Categories

### Authentication Tests (`auth/`)
- `auth-flow.spec.js` - Complete authentication flow testing
- `auth-debug.spec.js` - Authentication debugging and troubleshooting
- `auth-with-env.spec.js` - Environment variable authentication testing
- `quick-auth-test.spec.js` - Quick authentication verification

### API Tests (`api/`)
- `api-test.spec.js` - General API functionality tests
- `test-problem-sets-api.spec.js` - Problem sets CRUD operations
- `test-write-operations.spec.js` - Create/Update operations testing
- `test-delete-operations.spec.js` - Delete operations testing
- `test-consistency-fix.spec.js` - Data consistency verification
- `debug-api-data.spec.js` - API data debugging

### Grading System Tests (`grading/`)
- `test-new-grading-system.spec.js` - AI grading system testing
- `test-grading-quick.spec.js` - Quick grading functionality tests
- `test-improved-grading-demo.spec.js` - Grading improvement demonstrations

### Deployment Tests (`deployment/`)
- `test-latest-deployment.spec.js` - Latest deployment verification
- `test-newest-deployment.spec.js` - Newest deployment testing
- `debug-deployment.spec.js` - Deployment debugging

### Archived Tests (`archive/`)
- Legacy test files kept for reference
- Debug utilities and one-off tests
- Historical test implementations

## Running Tests

### Run all tests:
```bash
npx playwright test
```

### Run specific test category:
```bash
npx playwright test tests/auth/
npx playwright test tests/api/
npx playwright test tests/grading/
```

### Run specific test file:
```bash
npx playwright test tests/grading/test-new-grading-system.spec.js
```

## Test Configuration

Test configuration is managed in:
- `playwright.config.js` - Main Playwright configuration
- `.env` - Environment variables for testing

## Notes

- All tests require authentication with the global password
- API tests require the backend services to be running
- Grading tests may require OpenAI API key for full functionality
- Some tests may take longer due to AI processing time