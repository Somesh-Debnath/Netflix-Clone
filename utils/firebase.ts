// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDak01LUQrLQjpW_y1dVupuEnFXsCogHyA",
  authDomain: "netflix-clone-v-f3bc3.firebaseapp.com",
  projectId: "netflix-clone-v-f3bc3",
  storageBucket: "netflix-clone-v-f3bc3.appspot.com",
  messagingSenderId: "1015519995323",
  appId: "1:1015519995323:web:76cd97b5f5b9e7c8d6109e",
  measurementId: "G-5FXYR548XQ"
};

// Initialize Firebase
const app=!getApps().length?initializeApp(firebaseConfig):getApp();
const db=getFirestore();
const auth=getAuth();
const analytics=getAnalytics();
const functions=getFunctions();
export default app
export {db,auth,analytics,functions};