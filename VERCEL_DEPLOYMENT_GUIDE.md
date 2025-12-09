# Vercel Deployment Guide

## 📋 Pre-Deployment Checklist

- [x] Firebase configuration moved to environment variables
- [x] .env.example file created
- [x] .gitignore configured to exclude sensitive files
- [x] All dependencies listed in package.json
- [x] React scripts and build process configured
- [x] Firebase security rules are set up
- [x] Analytics component fully integrated

## 🚀 Step-by-Step Deployment Instructions

### Step 1: Set Up Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub account (recommended for easier integration)

2. **Connect GitHub Repository**
   - Click "New Project" in Vercel dashboard
   - Select "Import Git Repository"
   - Select your GitHub account and find "Mondalpl" repository
   - Click "Import"

### Step 2: Configure Environment Variables in Vercel

1. **Add Firebase Configuration**
   - In Vercel project dashboard, go to **Settings > Environment Variables**
   - Add each of the following variables with your Firebase project values:

   ```
   REACT_APP_FIREBASE_API_KEY
   REACT_APP_FIREBASE_AUTH_DOMAIN
   REACT_APP_FIREBASE_PROJECT_ID
   REACT_APP_FIREBASE_STORAGE_BUCKET
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID
   REACT_APP_FIREBASE_APP_ID
   REACT_APP_FIREBASE_MEASUREMENT_ID
   ```

2. **How to Get Firebase Values:**
   - Go to https://console.firebase.google.com
   - Select your project (mondalpl-30ea5)
   - Click ⚙️ Settings icon (top left) > **Project Settings**
   - Go to "General" tab
   - Scroll down to "Your apps" section
   - Find your web app and click "Config"
   - Copy all the values from the JavaScript configuration

3. **Set for All Environments**
   - Make sure to set these variables for:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

### Step 3: Configure Build Settings

**Framework Preset:** React
**Build Command:** `npm run build` (auto-detected)
**Output Directory:** `build` (auto-detected)
**Install Command:** `npm install` (auto-detected)

### Step 4: Configure Root Directory (Important!)

Since we have a monorepo structure with `/client` folder:

1. In Vercel project settings, go to **Settings > General**
2. Set **Root Directory** to `client/`
3. Save changes

### Step 5: Deploy

1. **Manual Deploy**
   - Click "Deploy" button
   - Vercel will build and deploy automatically

2. **Auto Deploy**
   - Any push to `main` branch will automatically trigger deployment
   - You'll see deployment progress in Vercel dashboard

## 🔐 Security Checklist

- ✅ Never commit `.env` file (it's in .gitignore)
- ✅ Firebase API keys are now environment variables
- ✅ Firestore security rules are configured to require authentication
- ✅ All sensitive data is excluded from git

## 📦 Project Structure

```
Mondalpl/
├── client/                    # React frontend (deployed to Vercel)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Dashboard/
│   │   │       ├── Analytics.js
│   │   │       ├── Analytics.css
│   │   │       ├── Dashboard.js
│   │   │       ├── Sidebar.js
│   │   │       ├── StockManagement.js
│   │   │       └── BillGeneration.js
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── firebase.js        # Uses environment variables
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server/                    # Node.js backend (optional - not needed for Vercel)
│   └── package.json
├── .env.example              # Template for environment variables
├── .gitignore                # Excludes node_modules, .env, etc.
└── package.json              # Root package.json with scripts
```

## 🛠️ Troubleshooting

### Build Fails with "Firebase API Key is undefined"
- **Solution:** Make sure environment variables are set in Vercel dashboard with correct names:
  - `REACT_APP_FIREBASE_API_KEY` (not `REACT_APP_FIREBASE_APIKEY`)
  - All variables must start with `REACT_APP_`

### "Cannot find module" errors
- **Solution:** 
  - Make sure Root Directory is set to `client/` in Vercel settings
  - Clear Vercel cache and redeploy

### Page shows blank white screen
- **Solution:**
  - Check browser console (F12 > Console) for errors
  - Verify Firebase environment variables are correctly configured
  - Check Vercel deployment logs for build errors

### Firebase connection errors in production
- **Solution:**
  - Verify Firestore security rules allow your production domain
  - Check that authentication is properly configured
  - Review Firestore rules: allow read, write: if request.auth != null

## 📚 Useful Links

- **Vercel Documentation:** https://vercel.com/docs
- **Firebase Configuration:** https://firebase.google.com/docs/web/setup
- **React Deployment:** https://create-react-app.dev/deployment/vercel/
- **Firestore Security Rules:** https://firebase.google.com/docs/firestore/security/get-started

## ✨ Features Deployed

✅ User Authentication (Firebase Auth)
✅ Real-time Data Sync (Firestore)
✅ Stock Management Dashboard
✅ Bill Generation & PDF Export
✅ Analytics Dashboard with Charts
✅ Sales Metrics & Graphs
✅ Low Stock Alerts
✅ Offline Persistence

## 🎉 After Deployment

1. **Test the Live Application**
   - Visit your Vercel deployment URL (https://your-domain.vercel.app)
   - Test login functionality
   - Create test data
   - Verify analytics dashboard loads correctly

2. **Set Up Custom Domain (Optional)**
   - Go to Vercel dashboard > Settings > Domains
   - Add your custom domain
   - Follow DNS configuration steps

3. **Enable Auto Deployments**
   - Already enabled by default
   - Any push to `main` branch = automatic deployment

---

**Questions?** Check deployment logs in Vercel dashboard or review the console output.
