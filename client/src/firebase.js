import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// Primary source: environment variables (REACT_APP_*)
const envConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Optional local secrets file support (local-only, must NOT be committed)
// Create `client/src/firebase.secrets.js` with a default export like:
// export default { apiKey: '...', authDomain: '...', projectId: '...', appId: '...', ... };
// This file is added to .gitignore above so it won't be committed.
let localConfig = null;
try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  // Use require so the import is optional at runtime (won't fail build if file missing)
  // NOTE: Do NOT commit client/src/firebase.secrets.js with real credentials.
  // Create it locally if you want to hardcode for testing only.
  // eslint-disable-next-line no-undef
  // @ts-ignore
  // Attempt to load local secrets (this will throw if file doesn't exist)
  // eslint-disable-next-line global-require
  const secrets = require('./firebase.secrets');
  localConfig = secrets && (secrets.default || secrets);
} catch (e) {
  localConfig = null;
}

const firebaseConfig = (localConfig && localConfig.apiKey) ? localConfig : envConfig;

// Helpful runtime validation: throw a clear error if required config is missing
const missing = [];
if (!firebaseConfig.apiKey) missing.push('REACT_APP_FIREBASE_API_KEY or client/src/firebase.secrets.js(apiKey)');
if (!firebaseConfig.projectId) missing.push('REACT_APP_FIREBASE_PROJECT_ID or client/src/firebase.secrets.js(projectId)');
if (!firebaseConfig.appId) missing.push('REACT_APP_FIREBASE_APP_ID or client/src/firebase.secrets.js(appId)');
if (missing.length > 0) {
  console.error(`Firebase configuration error: missing required values: ${missing.join(', ')}`);
  throw new Error(`Missing required Firebase configuration: ${missing.join(', ')}. Create client/.env, set env vars, or create client/src/firebase.secrets.js locally.`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence for better user experience
try {
  enableIndexedDbPersistence(db);
} catch (err) {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
}

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;

