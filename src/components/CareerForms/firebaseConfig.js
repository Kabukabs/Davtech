import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// Firebase configuration object containing API keys and project settings.
// Values are pulled from environment variables for security.

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase with the configuration object.
const app = initializeApp(firebaseConfig);

// Initialize Firebase services.
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Function to get project data by ID
export const getProjectFromFirebase = async (projectId) => {
  try {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};

// Export Firebase services for use in other parts of the application.
export { db, storage, auth, analytics, app };
