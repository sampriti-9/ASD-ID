// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeYlXgPmDp_TT-tqRLRsBEw1qGOALFyBA",
  authDomain: "asd-child.firebaseapp.com",
  projectId: "asd-child",
  storageBucket: "asd-child.firebasestorage.app",
  messagingSenderId: "239135321154",
  appId: "1:239135321154:web:4a883d93abb4769606d1db",
  measurementId: "G-TJG9H7ZV6G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Initialize Firestore
const db = getFirestore(app);

// ✅ Export properly
export { db, app, analytics };
export const auth = getAuth(app);
