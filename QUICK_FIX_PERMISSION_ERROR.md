# 🚨 URGENT: Fix Permission Error - Quick Reference

## The Error You're Seeing
```
FirebaseError: Missing or insufficient permissions.
```

## ⚡ QUICK FIX (2 Minutes)

### 1️⃣ Open Firebase
```
https://console.firebase.google.com/
→ Select: mondalpl-30ea5
```

### 2️⃣ Go to Firestore Rules
```
Left Menu → Firestore Database → Rules Tab
```

### 3️⃣ Copy & Paste This Code

**Delete everything in the editor and paste:**

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /bills/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /customers/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /inventoryLogs/{document=**} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
    }
  }
}
```

### 4️⃣ Click "Publish" Button

### 5️⃣ Refresh Your App
```
Press: Ctrl+R (Windows) or Cmd+R (Mac)
```

---

## ✅ It Should Work Now!

Try adding a product. The error should be gone!

---

## 📞 If Still Not Working

1. **Clear cache**: `Ctrl+Shift+Delete`
2. **Force refresh**: `Ctrl+Shift+R`
3. **Check you're logged in** (blue "Sign out" button visible)
4. **Wait 30 seconds** after publishing rules
5. **Try in incognito mode**

---

## 📚 Detailed Guides

- **Visual Guide**: See `FIRESTORE_RULES_VISUAL_GUIDE.md`
- **Complete Guide**: See `FIREBASE_PERMISSION_FIX.md`

---

**That's it! Your permission error should be fixed.** ✅
