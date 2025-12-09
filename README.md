# Mondalpl - Stock Management System

A full-stack **cloud-powered** inventory management system built with React and Firebase.

## 🚀 Deployment Status

**Ready to Deploy on Vercel!**

See [`VERCEL_DEPLOYMENT_GUIDE.md`](VERCEL_DEPLOYMENT_GUIDE.md) for step-by-step deployment instructions.

---

## ✨ Features

- ✅ **Cloud Database** - All data stored in Firebase Firestore
- ✅ **User Authentication** - Secure login with Firebase Auth
- ✅ **Real-time Sync** - Instant updates across all devices
- ✅ **Stock Management** - Add, edit, delete products
- ✅ **Bill Generation** - Create invoices with PDF download
- ✅ **Analytics Dashboard** - Sales graphs, top products, low stock alerts
- ✅ **Customer Management** - Store customer information
- ✅ **Search & Filter** - Find products and bills quickly
- ✅ **Offline Mode** - Works even without internet
- ✅ **CSV Export** - Export data for analysis

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **Database**: Firebase Firestore ☁️
- **Authentication**: Firebase Auth
- **Export**: jsPDF, CSV
- **Real-time**: Firebase Listeners
- **Deployment**: Vercel (Recommended)

## Setup Instructions

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Configure Environment Variables

Create a `.env` file in the `client/` folder:

```bash
cp .env.example client/.env
```

Then add your Firebase configuration values:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Copy config values to `.env`
6. Set Firestore security rules (see below)
## 🚀 Quick Start

### For Permission Error (Current Issue)
👉 See: [`SOLUTION_PERMISSION_ERROR.md`](SOLUTION_PERMISSION_ERROR.md)

### For Complete Setup
👉 See: [`FIREBASE_SETUP_COMPLETE.md`](FIREBASE_SETUP_COMPLETE.md)

### For Code Examples
👉 See: [`FIREBASE_QUICK_REFERENCE.md`](FIREBASE_QUICK_REFERENCE.md)

---

## 📚 Documentation Index

### 🔴 Troubleshooting Permission Error
| File | Purpose |
|------|---------|
| [`SOLUTION_PERMISSION_ERROR.md`](SOLUTION_PERMISSION_ERROR.md) | **START HERE** - Complete solution |
| [`QUICK_FIX_PERMISSION_ERROR.md`](QUICK_FIX_PERMISSION_ERROR.md) | Ultra-quick reference (2 min) |
| [`FIREBASE_PERMISSION_FIX.md`](FIREBASE_PERMISSION_FIX.md) | Detailed troubleshooting |
| [`FIRESTORE_RULES_VISUAL_GUIDE.md`](FIRESTORE_RULES_VISUAL_GUIDE.md) | Step-by-step with visuals |

### 📘 Complete Firebase Guides
| File | Purpose |
|------|---------|
| [`FIREBASE_SETUP_COMPLETE.md`](FIREBASE_SETUP_COMPLETE.md) | Full setup & deployment |
| [`FIREBASE_INTEGRATION_GUIDE.md`](FIREBASE_INTEGRATION_GUIDE.md) | Complete API reference |
| [`FIREBASE_QUICK_REFERENCE.md`](FIREBASE_QUICK_REFERENCE.md) | Quick code snippets |
| [`FIREBASE_VISUAL_SUMMARY.md`](FIREBASE_VISUAL_SUMMARY.md) | Architecture diagrams |
| [`FIREBASE_IMPLEMENTATION_SUMMARY.md`](FIREBASE_IMPLEMENTATION_SUMMARY.md) | What was implemented |

### ✅ Checklists
| File | Purpose |
|------|---------|
| [`DEPLOYMENT_CHECKLIST.md`](DEPLOYMENT_CHECKLIST.md) | Pre-deployment checklist |

---

## Tech Stack

- **Frontend**: React 18, React Router
- **Backend**: Node.js, Express (Optional)
- **Database**: Firebase Firestore ☁️
- **Authentication**: Firebase Auth
- **Real-time**: Firebase Listeners
- **Export**: jsPDF, CSV

---

## ✅ What's Configured

✅ Firebase Firestore Database
✅ User Authentication
✅ Real-time Data Listeners
✅ Offline Persistence
✅ Product Management
✅ Bill Generation
✅ Customer Management
✅ Analytics & Reports
✅ Data Validation
✅ Security Rules
✅ CSV Export

## Project Structure

```
inventory-management-system/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/      # Login & Signup
│   │   │   └── Dashboard/ # Dashboard, Stock, Bills
│   │   ├── contexts/      # Auth context
│   │   └── firebase.js    # Firebase config
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js
│   └── package.json
└── package.json
```

## Usage

1. **Sign Up**: Create a new account
2. **Login**: Sign in with your credentials
3. **Stock Management**: 
   - Add new products with name, category, price, quantity
   - View all products in a table
   - Delete products
4. **Bill Generation**:
   - Enter customer information
   - Select products from available stock
   - Add to cart and adjust quantities
   - Generate bill
   - View all generated bills

## Notes

- Make sure Firebase Authentication and Firestore are enabled in your Firebase project
- The app uses real-time updates, so changes reflect immediately
- All data is stored in Firebase Firestore

