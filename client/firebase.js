// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6471e.firebaseapp.com",
  projectId: "mern-estate-6471e",
  storageBucket: "mern-estate-6471e.appspot.com",
  messagingSenderId: "128504519546",
  appId: "1:128504519546:web:c2d9fdae22f962ebbe94c3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);