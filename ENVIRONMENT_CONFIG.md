# Environment Configuration Guide

## Overview

This app now supports dynamic environment URLs for **Development**, **Staging**, and **Production**. The API base URL is automatically determined based on the current environment.

---

## Environment Detection Priority

The app checks environment in this order:

1. **`__DEV__` flag** → Running locally via `npm start` → `http://localhost:5000`
2. **`process.env.NODE_ENV`** → If set to `production`, uses `process.env.RENDER_API_URL`
3. **`app.json` extra.apiUrl** → Fallback to app.json configuration
4. **Default** → `http://localhost:5000`

---

## How It Works

### Local Development

```bash
npm start
```

- `__DEV__` = true (auto-detected)
- API URL → `http://localhost:5000` ✅
- **No configuration needed!**

### Production Build (Render.com)

Set environment variables before building:

```bash
export NODE_ENV=production
export RENDER_API_URL=https://your-render-app.onrender.com
npm start
```

- `NODE_ENV` = production
- `RENDER_API_URL` = your Render backend URL
- API URL → `https://your-render-app.onrender.com` ✅

---

## Configuration File

### [constants/config.js](../constants/config.js)

This file contains the environment detection logic based on process variables.

---

## Setting Environment Variables

### On Windows (PowerShell)

```powershell
$env:NODE_ENV="production"
$env:RENDER_API_URL="https://your-render-app.onrender.com"
npm start
```

### On Windows (CMD)

```cmd
set NODE_ENV=production
set RENDER_API_URL=https://your-render-app.onrender.com
npm start
```

### On macOS/Linux

```bash
export NODE_ENV=production
export RENDER_API_URL=https://your-render-app.onrender.com
npm start
```

---

## Console Logs (Debug)

When the app starts, it logs which environment is active:

```
🚀 Development mode detected - Using localhost:5000
```

or

```
🌐 Production mode (Render) - Using: https://your-app.onrender.com
```

---

## Example Workflows

### Local Testing

```bash
# Terminal 1: Start backend
cd smart-campus-backend
npm start
# Runs on http://localhost:5000

# Terminal 2: Start frontend
cd smart-campus-suji-annie-master
npm start
# Automatically uses http://localhost:5000
```

### Production Build for Render

```bash
# Set environment variables
export NODE_ENV=production
export RENDER_API_URL=https://smart-campus-api-abc123.onrender.com

# Build for Android
npm run android

# Build for iOS
npm run ios
```

---

## Troubleshooting

### API URL not switching to production?

- Verify `NODE_ENV=production` is set before building
- Check console logs at app startup
- Confirm `RENDER_API_URL` environment variable is exported

### Using localhost in production build?

- Check environment variables are set: `echo $NODE_ENV`, `echo $RENDER_API_URL`
- Restart the build process after setting variables
- Check console log shows production URL

### "Cannot connect to API"?

- For local: Check backend running on localhost:5000
- For production: Check Render URL is accessible and backend is deployed
- Verify CORS is enabled in backend

---

## Using the API Service

Import from `services/api.js`:

```javascript
import { eventAPI, facilityAPI, complaintAPI } from "../services/api";

// Get all events
const response = await eventAPI.getAll();

// Register for event
const result = await eventAPI.register({
  name: "John Doe",
  email: "john@example.com",
  // ... other fields
});
```

---

## Files Updated

✅ [constants/config.js](../constants/config.js) - Environment detection (process variables)  
✅ [app.json](../app.json) - Simplified configuration  
✅ [services/api.js](../services/api.js) - Pre-configured API service
