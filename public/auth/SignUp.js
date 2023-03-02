// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAFc8EFwIr7JaaemMdcvbbOCvOL2gv_b4",
  authDomain: "innovation-cafe-b0fe2.firebaseapp.com",
  projectId: "innovation-cafe-b0fe2",
  storageBucket: "innovation-cafe-b0fe2.appspot.com",
  messagingSenderId: "819898910286",
  appId: "1:819898910286:web:60fb077bdf70f94aee651f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// auth.setPersistence(auth.Auth.Persistence.LOCAL );
console.log('Hi')