
import { GoogleAuthProvider} from "firebase/auth";
import {getAuth} from 'firebase/auth'
import { initializeApp } from "firebase/app"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "onecart-9b13a.firebaseapp.com",
  projectId: "onecart-9b13a",
  storageBucket: "onecart-9b13a.firebasestorage.app",
  messagingSenderId: "458894421003",
  appId: "1:458894421003:web:b7eaa967ee1923b4c62b0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider= new GoogleAuthProvider()

export {auth,provider}