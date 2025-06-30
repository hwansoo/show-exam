// Configuration file for environment variables injection
// This file can be used with build tools like Webpack, Vite, or similar

// For development: copy .env.example to .env and set your values
// For production: set environment variables in your hosting platform

const config = {
    // OpenAI API Key - can be injected at build time
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
    
    // Admin Password - can be injected at build time  
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
    
    // API endpoint for grading (if using a proxy server)
    API_ENDPOINT: process.env.API_ENDPOINT || 'https://api.openai.com/v1/chat/completions'
};

// For browsers that don't support process.env, provide fallbacks
if (typeof window !== 'undefined') {
    window.APP_CONFIG = {
        OPENAI_API_KEY: config.OPENAI_API_KEY,
        ADMIN_PASSWORD: config.ADMIN_PASSWORD,
        API_ENDPOINT: config.API_ENDPOINT
    };
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}