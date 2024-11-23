// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhKRAYUWiiWqGTx5G_SqiluvsYlGVNugM",
    authDomain: "moneymint-f52bc.firebaseapp.com",
    databaseURL: "https://moneymint-f52bc-default-rtdb.firebaseio.com",
    projectId: "moneymint-f52bc",
    storageBucket: "moneymint-f52bc.appspot.com",
    messagingSenderId: "31302857811",
    appId: "1:31302857811:web:afec1803ca54c7111582a6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
export { auth, googleProvider, database,db,doc, setDoc};