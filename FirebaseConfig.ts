// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0CtLKz2yZ4x4heTtHKQ0ns3nX-AxiEaw",
  authDomain: "simao-project-pioneer.firebaseapp.com",
  projectId: "simao-project-pioneer",
  storageBucket: "simao-project-pioneer.appspot.com",
  messagingSenderId: "832432520804",
  appId: "1:832432520804:web:56470e42108f3269952971",
  measurementId: "G-PGQKP2S4K2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);