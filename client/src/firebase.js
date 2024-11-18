// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-14dfb.firebaseapp.com",
  projectId: "mern-estate-14dfb",
  storageBucket: "mern-estate-14dfb.firebasestorage.app",
  messagingSenderId: "1065271448236",
  appId: "1:1065271448236:web:438dc20158e8e0a7ca4509",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
