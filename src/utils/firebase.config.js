import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZ65j9uU5w3Pqu7ZNz8DzbR_xUIR-wrkg",
  authDomain: "fir-auth-d6d78.firebaseapp.com",
  projectId: "fir-auth-d6d78",
  storageBucket: "fir-auth-d6d78.appspot.com",
  messagingSenderId: "625667824960",
  appId: "1:625667824960:web:a26e631abec2764618eea5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)