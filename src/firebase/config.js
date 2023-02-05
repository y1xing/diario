import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "diario-1835a.firebaseapp.com",
  projectId: "diario-1835a",
  storageBucket: "diario-1835a.appspot.com",
  messagingSenderId: "477037432439",
  appId: "1:477037432439:web:764b22dd9ff1ac334d0072",
  measurementId: "G-YLH21Y6CQD",
};

// init firebase
initializeApp(firebaseConfig);

//init firestore
const db = getFirestore();

// init firebase auth
const auth = getAuth();

export { db, auth };
