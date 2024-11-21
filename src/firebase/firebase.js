// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBrr7leD5impp9uToUePo3gQDLIsH_8Vy8",
    authDomain: "cryptocurrency-tracker-website.firebaseapp.com",
    projectId: "cryptocurrency-tracker-website",
    storageBucket: "cryptocurrency-tracker-website.firebasestorage.app",
    messagingSenderId: "730141121811",
    appId: "1:730141121811:web:df54d0dde79202fc578ee6",
    measurementId: "G-06XMDRMKR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
