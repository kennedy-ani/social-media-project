// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaS-vmNfOzL4NvfNR_lqdjy1z3Kj_He7U",
  authDomain: "react-socialmedia-5b90d.firebaseapp.com",
  projectId: "react-socialmedia-5b90d",
  storageBucket: "react-socialmedia-5b90d.appspot.com",
  messagingSenderId: "133092542928",
  appId: "1:133092542928:web:e2c3c3e9b727f8a58011d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);