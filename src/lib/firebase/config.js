import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYJ74CHHCIAt8nmQvX5JtvmTfbRzfqtio",
  authDomain: "ai-blog-generator-468.firebaseapp.com",
  projectId: "ai-blog-generator-468",
  storageBucket: "ai-blog-generator-468.appspot.com",
  messagingSenderId: "649055983103",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
