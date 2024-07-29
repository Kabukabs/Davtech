// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
require('dotenv').config();

const firebaseConfig = {
  apiKey: sample.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: sample.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: sample.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: sample.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: sample.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: sample.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: sample.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
