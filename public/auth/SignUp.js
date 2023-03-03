// Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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


document.getElementById('signup').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;
  console.log(auth);
  createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    userCredential.user.getIdToken()
    .then((idToken) => {
      fetch('/auth/signin', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'CSRF-Token': Cookies.get('XSRF-Token'),
          body: JSON.stringify({email, password, idToken})
        }
      })
    })
  })
  .then(() => {
    auth.signOut()
  })
  // .then(() => {
  //   window.location.assign('/profile')
  // })
  .catch((error) => {
      console.log(error);
  });
});