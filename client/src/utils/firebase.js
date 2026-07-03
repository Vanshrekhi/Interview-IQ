import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiqba6ba.firebaseapp.com",
  projectId: "interviewiqba6ba",
  storageBucket: "interviewiqba6ba.firebasestorage.app",
  messagingSenderId: "201320499625",
  appId: "1:201320499625:web:b10011ecf00cfc695e9cb8",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };