// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database";

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
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app)
export const FireStore = getFirestore(app)
export const Storage = getStorage(app)
export const DataBase = getDatabase(app);
const analytics = getAnalytics(app);