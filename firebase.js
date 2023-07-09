// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPSxvZ4M8tYRMRYrZzkVVpnLGCX1Hb8WM",
  authDomain: "notebook-4dea6.firebaseapp.com",
  projectId: "notebook-4dea6",
  storageBucket: "notebook-4dea6.appspot.com",
  messagingSenderId: "726637748992",
  appId: "1:726637748992:web:d5ec0286f5a7877d9009e5",
  measurementId: "G-NHM3JXKYCG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
