import Constants from "expo-constants";

/**
 * API Configuration for different environments
 *
 * Supports:
 * - Development (local): http://localhost:5000
 * - Production (Render): https://your-render-app.onrender.com
 *
 * Environment detection priority:
 * 1. If __DEV__ (running locally) → localhost:5000
 * 2. If process.env.NODE_ENV === 'production' → use process.env.RENDER_API_URL
 * 3. If app.json extra.apiUrl provided → use that
 * 4. Default to localhost:5000
 */

const ENV = {
  dev: {
    apiUrl: "http://localhost:5000",
  },
  prod: {
    apiUrl: process.env.RENDER_API_URL || "https://api.smartcampus.com",
  },
};

// Get environment from process variables and app.json config
const getEnvVars = () => {
  // Priority 1: Check if we're in development mode (running via Expo CLI locally)
  if (__DEV__) {
    console.log("🚀 Development mode detected - Using localhost:5000");
    return ENV.dev;
  }

  // Priority 2: Check NODE_ENV from process variables (set during build/deployment)
  if (process.env.NODE_ENV === "production") {
    const renderApiUrl = process.env.RENDER_API_URL;
    if (renderApiUrl) {
      console.log("🌐 Production mode (Render) - Using:", renderApiUrl);
      return {
        apiUrl: renderApiUrl,
      };
    }
  }

  // Priority 3: Check app.json extra.apiUrl if available
  const extra = Constants.expoConfig?.extra || {};
  if (extra.apiUrl) {
    console.log("📱 Using API URL from app.json:", extra.apiUrl);
    return {
      apiUrl: extra.apiUrl,
    };
  }

  // Default: Use development URL
  console.log("⚙️  Defaulting to localhost:5000");
  return ENV.dev;
};

const Config = {
  ...getEnvVars(),
  // Add other config variables here if needed
};

export default Config;
