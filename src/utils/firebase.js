// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3HfYFmzpX9pC-9Bo0KglHUUaihyWvZrw",
  authDomain: "fooddelivery-c60b4.firebaseapp.com",
  projectId: "fooddelivery-c60b4",
  storageBucket: "fooddelivery-c60b4.firebasestorage.app",
  messagingSenderId: "891083386354",
  appId: "1:891083386354:web:b32f80dfce3980bff6cf6b",
  measurementId: "G-JSKRX3HYSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app);
export const auth = getAuth()
