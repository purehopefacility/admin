// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMN8TyE6WGuG-2AZy7kmCYC5Nrxx59qzs",
  authDomain: "purehope-web.firebaseapp.com",
  projectId: "purehope-web",
  storageBucket: "purehope-web.appspot.com",
  messagingSenderId: "458513442949",
  appId: "1:458513442949:web:17f004684478b705f3a1ec",
  measurementId: "G-D1NM1J58LQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
