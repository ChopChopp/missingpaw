import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getDatabase} from "firebase/database";
import {initializeAuth, getReactNativePersistence} from 'firebase/auth';
import {getStorage} from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyCy6RE6Y5zoFe5rHOkwOWpNAzUBfCypBZk",
    authDomain: "missing-paw.firebaseapp.com",
    databaseURL: "https://missing-paw-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "missing-paw",
    storageBucket: "missing-paw.appspot.com",
    messagingSenderId: "80490557072",
    appId: "1:80490557072:web:1675414e46fc36f982f215",
    measurementId: "G-HSP1BZC9WD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Create a root reference.
export const STORAGE = getStorage();

const auth = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getDatabase();