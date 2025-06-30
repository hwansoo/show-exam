# Authentication Test Suite

This directory contains a comprehensive Playwright test suite for verifying the JWT authentication flow in the show-exam application.

## Test Files

### Core Test Suite
- **`auth-flow.spec.js`** - Main authentication flow tests (14 test cases)
  - Global password protection verification
  - Valid/invalid password handling
  - Token storage and persistence
  - Cross-page navigation
  - Error handling
  - API endpoint protection

### Debugging and Analysis
- **`auth-debug.spec.js`** - Step-by-step debugging with detailed console output
- **`api-test.spec.js`** - Direct API endpoint testing
- **`env-test.spec.js`** - Environment variable and password testing
- **`browser-inspect.spec.js`** - Live site inspection and network monitoring
- **`final-report.spec.js`** - Comprehensive analysis report generator

## Configuration
- **`../playwright.config.js`** - Playwright configuration for multiple browsers
- **`../package.json`** - Updated with test scripts

## Usage

```bash
# Run all tests
npm test

# Run main authentication tests only
npm run test:auth

# Run debug tests with detailed output
npm run test:debug

# Generate comprehensive analysis
npm run test:analysis

# Run with visible browser
npm run test:headed

# Open interactive UI
npm run test:ui

# View test reports
npm run test:report
```

## Test Results Summary

As of the last test run:
- ✅ **3 tests passing** - UI and error handling work correctly
- ❌ **11 tests failing** - Due to backend authentication issue
- 🔍 **Root cause identified** - GLOBAL_PASSWORD environment variable mismatch

## Current Status

The authentication system frontend is fully functional, but the backend API is rejecting the default password "exam2024". This is likely due to the GLOBAL_PASSWORD environment variable in Vercel being set to a different value.

## What Works
- Frontend UI loads correctly
- Password input and form submission
- Error handling and display
- Network request formatting
- CORS configuration

## What Needs Fixing
- Backend API authentication logic
- Environment variable configuration in Vercel

## Next Steps

1. Check Vercel environment variables
2. Set GLOBAL_PASSWORD to "exam2024"
3. Redeploy the application
4. Re-run tests to verify fix

Once fixed, all tests should pass and verify complete authentication flow functionality.