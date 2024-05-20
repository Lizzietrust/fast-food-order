import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCmhLLGL8zoRKc0P4toEMiwrcnWbiUNIZs",
  authDomain: "jazzy-shop.firebaseapp.com",
  projectId: "jazzy-shop",
  storageBucket: "jazzy-shop.appspot.com",
  messagingSenderId: "293008630403",
  appId: "1:293008630403:web:10a7353e815fad8136b1b6"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;