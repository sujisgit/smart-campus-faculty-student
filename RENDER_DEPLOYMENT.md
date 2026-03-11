# Render.com Backend Deployment Guide

## Prerequisites

- Render.com account (https://render.com)
- GitHub repository with your Smart Campus backend code
- PostgreSQL database (local or managed)

---

## Step 1: Prepare Backend for Render

### Environment Variables

Create a `.env` file in `smart-campus-backend/` directory with the following:

```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=smart_campus
DB_PASSWORD=your_password
DB_PORT=5432

# Server Configuration
PORT=5000
NODE_ENV=production
```

### Update database config to use environment variables

Edit `smart-campus-backend/config/db.js`:

```javascript
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "smart_campus",
  password: process.env.DB_PASSWORD || "Sujitha14",
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
```

### Update server to use PORT env variable

Edit `smart-campus-backend/server.js`:

```javascript
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Step 2: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Smart Campus Backend"
git remote add origin https://github.com/YOUR_USERNAME/smart-campus-backend.git
git push -u origin main
```

---

## Step 3: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New"** → **"PostgreSQL"**
3. Configure:
   - **Name**: smart-campus-db
   - **Database**: smart_campus
   - **User**: postgres
   - **Region**: Select closest to you
   - **PostgreSQL Version**: 15 or higher
4. Click **"Create Database"**
5. Copy the connection string (you'll need this)

---

## Step 4: Deploy Backend to Render

1. In Render Dashboard, click **"New"** → **"Web Service"**
2. **Connect Repository**:
   - Click "Connect a repository"
   - Select your GitHub repo containing the backend
3. **Configure**:
   - **Name**: smart-campus-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or Paid (as preferred)
   - **Auto-deploy**: ON (recommended)

4. **Add Environment Variables**:
   Click "Add Environment Variable" and add:

   | Key           | Value                         |
   | ------------- | ----------------------------- |
   | `DB_USER`     | postgres                      |
   | `DB_HOST`     | [Your Render PostgreSQL host] |
   | `DB_NAME`     | smart_campus                  |
   | `DB_PASSWORD` | [Your PostgreSQL password]    |
   | `DB_PORT`     | 5432                          |
   | `NODE_ENV`    | production                    |
   | `PORT`        | 5000                          |

   **To get PostgreSQL details:**
   - Go to your PostgreSQL database in Render
   - Copy connection string: `postgresql://user:password@host:5432/dbname`

5. Click **"Create Web Service"**

---

## Step 5: Run Database Schema

After deployment:

1. Download/install PostgreSQL client tools
2. Connect to your Render PostgreSQL database:

   ```bash
   psql postgresql://user:password@your-render-host:5432/smart_campus
   ```

3. Run the database schema:

   ```bash
   \i database_schema.sql
   ```

   Or copy-paste the contents of `database_schema.sql` directly

---

## Step 6: Update Frontend Configuration

After backend is deployed on Render:

1. Get your Render app URL from the Render dashboard (looks like: `https://smart-campus-api-xxxx.onrender.com`)

2. Update [app.json](../app.json):

   ```json
   "extra": {
     "environment": "production",
     "apiUrl": "https://your-render-app.onrender.com"
   }
   ```

3. Rebuild the Android/iOS app:
   ```bash
   npm start
   ```

---

## Getting Your Render App URL

1. Go to Render Dashboard
2. Click on your web service: "smart-campus-api"
3. You'll see the URL at the top (e.g., `https://smart-campus-api-abc123.onrender.com`)

---

## Troubleshooting

### 502 Bad Gateway

- Check if app is running: Go to "Logs" in Render dashboard
- Verify database connection string is correct
- Check if POST/GET routes are properly exported

### Connection Timeout

- Verify database host is accessible
- Check firewall/security settings on PostgreSQL database
- Ensure `DB_HOST` environment variable is set correctly

### Logs Not Showing

- Check the "Logs" tab in Render dashboard for errors
- Add console.log statements in your code for debugging
- Restart the service from Render dashboard

### Database Tables Don't Exist

- Run the database schema SQL script after first deployment
- Use PostgreSQL client to connect and verify tables exist

---

## Environment Variables Reference

| Variable      | Example              | Purpose             |
| ------------- | -------------------- | ------------------- |
| `DB_USER`     | postgres             | PostgreSQL username |
| `DB_HOST`     | dpg-xxxxx.render.com | PostgreSQL host     |
| `DB_NAME`     | smart_campus         | Database name       |
| `DB_PASSWORD` | your_password        | PostgreSQL password |
| `DB_PORT`     | 5432                 | PostgreSQL port     |
| `NODE_ENV`    | production           | Node environment    |
| `PORT`        | 5000                 | Server port         |

---

## Monitoring & Maintenance

### View Logs

1. Go to your service in Render dashboard
2. Click "Logs" tab
3. Filter by error/info messages

### Check Database

```bash
psql postgresql://user:password@host:5432/smart_campus
# Then run SQL queries to verify data
```

### Restart Service

1. Render dashboard → Your service
2. Click "Manual Deploy" to restart

---

## Free Tier Limitations

- **Web Service**: 750 compute hours/month (always on: ~31 days/month)
- **PostgreSQL**: 90-day inactivity will delete data
- **Bandwidth**: 100 GB/month
- **Ram**: 256 MB
- **Cold starts**: May take 30-50 seconds if idle

For production, consider upgrading to paid plans.

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Update frontend config with Render URL
3. ✅ Test all API endpoints
4. ✅ Deploy frontend to Expo/Play Store/App Store
5. ✅ Monitor application in production
