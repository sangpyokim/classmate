// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { } from 'firebase/firestore';
import { } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAph2dcaiydnZV-9y5oUw4z0M_SBX0_Bp4",
  authDomain: "classmate-e.firebaseapp.com",
  projectId: "classmate-e",
  storageBucket: "classmate-e.appspot.com",
  messagingSenderId: "313234961038",
  appId: "1:313234961038:web:16f0184d0e139946a14fdf",
  measurementId: "G-SJKKWT6BCP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app)
const analytics = getAnalytics(app);