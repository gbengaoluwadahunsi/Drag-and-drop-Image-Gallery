// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDmH2BwcjlwN5Qc5BvXufIladd5I-8qpp8',
  authDomain: 'gallery-login-authentication.firebaseapp.com',
  projectId: "gallery-login-authentication",
  storageBucket: "gallery-login-authentication.appspot.com",
  messagingSenderId: "969722529565",
  appId: "1:969722529565:web:46d4bc842aac9a81ce83f4",
  measurementId: "G-169KS0F89L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
 export const auth = getAuth(app);