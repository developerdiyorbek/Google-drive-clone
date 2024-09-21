import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "drive-clone-c9e62.firebaseapp.com",
  projectId: "drive-clone-c9e62",
  storageBucket: "drive-clone-c9e62.appspot.com",
  messagingSenderId: "41912071878",
  appId: "1:41912071878:web:0ecb1549686dc2f47009c7",
};

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

const storage = getStorage();

export { db, storage };
