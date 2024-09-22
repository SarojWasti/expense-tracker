// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOpgPshdmUzK1XjEfW43QgqHcD3Xneoyw",
  authDomain: "expensetracker-56e23.firebaseapp.com",
  projectId: "expensetracker-56e23",
  storageBucket: "expensetracker-56e23.appspot.com",
  messagingSenderId: "1090981621377",
  appId: "1:1090981621377:web:cae5c56dae58df1b072780",
  measurementId: "G-2TRR4X212W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and DB Services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };