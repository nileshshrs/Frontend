// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxr8Ef99UWKr9gFzEMVg0wsTRPWclBK1Y",
  authDomain: "clothing-store-images-uploads.firebaseapp.com",
  projectId: "clothing-store-images-uploads",
  storageBucket: "clothing-store-images-uploads.appspot.com",
  messagingSenderId: "912487924898",
  appId: "1:912487924898:web:89d89fd2eebaa62da1c3fb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);