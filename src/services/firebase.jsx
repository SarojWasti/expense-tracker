import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';


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
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, firestore, provider, signInWithPopup };