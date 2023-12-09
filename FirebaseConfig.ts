import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyB0CtLKz2yZ4x4heTtHKQ0ns3nX-AxiEaw",
    authDomain: "simao-project-pioneer.firebaseapp.com",
    databaseURL: "https://simao-project-pioneer-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "simao-project-pioneer",
    storageBucket: "simao-project-pioneer.appspot.com",
    messagingSenderId: "832432520804",
    appId: "1:832432520804:web:56470e42108f3269952971",
    measurementId: "G-PGQKP2S4K2"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig,);

// Create a root reference
export const STORAGE = getStorage();

const auth = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getDatabase();