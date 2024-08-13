import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";


// Firebase configuration object containing API keys and project settings.
// Values are pulled from environment variables for security.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,  // Your Firebase API key.
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,  // Authentication domain for your Firebase project.
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,  // Unique identifier for your Firebase project.
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,  // Cloud storage bucket for storing files.
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,  // Sender ID for Cloud Messaging.
  appId: import.meta.env.VITE_FIREBASE_APP_ID,  // Unique identifier for your Firebase application.
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,  // Measurement ID for Analytics.
};

// Initialize Firebase with the configuration object.
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics for tracking user interactions.
const analytics = getAnalytics(app);

// Initialize Firestore database and storage services.
const db = getFirestore(app);  // Firestore service for database operations.
const storage = getStorage(app);  // Storage service for file uploads and downloads.

// Export Firestore and Storage instances for use in other parts of the application.
export { db, storage };
