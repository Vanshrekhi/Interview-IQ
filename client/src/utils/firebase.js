import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiqba6ba.firebaseapp.com",
  projectId: "interviewiqba6ba",
  storageBucket: "interviewiqba6ba.firebasestorage.app",
  messagingSenderId: "862159592601",
  appId: "1:862159592601:web:7308d702cd708076ddec08"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();