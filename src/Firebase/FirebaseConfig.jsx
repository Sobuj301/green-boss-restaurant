// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClHqWc5LU-X-fSZ8HB9lcDny2ASP1Hclg",
  authDomain: "payment-green-boss.firebaseapp.com",
  projectId: "payment-green-boss",
  storageBucket: "payment-green-boss.appspot.com",
  messagingSenderId: "47029083381",
  appId: "1:47029083381:web:e10c8d6dd7c32287ec79bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app