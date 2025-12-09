# Firebase Setup Guide - Fix 404 NOT_FOUND Error

## The Error
`404: NOT_FOUND` with region `bom1` means your Firestore database is not created or not properly configured.

## Step-by-Step Fix

### 1. Create Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **mondalpl-30ea5**
3. Click on **Firestore Database** in the left sidebar
4. Click **Create database** button
5. Choose **Start in production mode** (we'll set rules next)
6. Select a **location** for your database:
   - Choose **asia-south1 (Mumbai)** or **asia-south2** (closest to bom1 region)
   - Or choose any available region
7. Click **Enable**

### 2. Set Firestore Security Rules

1. In Firestore Database, go to the **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write all documents
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Specific rules for products collection
    match /products/{productId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
    
    // Specific rules for bills collection
    match /bills/{billId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if request.auth != null;
    }
  }
}
```

3. Click **Publish**

### 3. Enable Authentication

1. Go to **Authentication** in the left sidebar
2. Click **Get started** (if first time)
3. Go to **Sign-in method** tab
4. Click on **Email/Password**
5. Toggle **Enable** to ON
6. Click **Save**

### 4. Verify Database Location

The error shows region `bom1` (Mumbai). Make sure:
- Your Firestore database is created
- The location matches or is compatible
- The database is in **Active** status (not paused)

### 5. Check Browser Console

Open browser DevTools (F12) and check:
- Any Firebase errors in Console
- Network tab for failed requests
- Application tab → Storage → Check Firebase connection

## Common Issues

### Issue 1: Database Not Created
**Solution**: Follow Step 1 above to create the database

### Issue 2: Wrong Region
**Solution**: Create database in Mumbai (asia-south1) or recreate in a different region

### Issue 3: Authentication Not Enabled
**Solution**: Follow Step 3 above to enable Email/Password authentication

### Issue 4: Security Rules Too Restrictive
**Solution**: Use the rules provided in Step 2

## After Setup

1. Refresh your application
2. Try to sign up/login
3. The 404 error should be resolved
4. You should be able to add products and generate bills

## Still Getting Errors?

1. Check Firebase Console → Project Settings → General
2. Verify your Firebase config matches `client/src/firebase.js`
3. Check if billing is enabled (Firestore requires billing for some regions)
4. Try creating the database in a different region (us-central1, europe-west1, etc.)



