// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import 'https://cdnjs.cloudflare.com/ajax/libs/js-cookie/3.0.1/js.cookie.min.js';

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

//sign up
const signupForm = document.getElementById('signup');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const phoneNumber = e.target.phoneNumber.value;
    const area = e.target.area.value;
    const block = e.target.block.value;
    const street = e.target.street.value;
    const house = e.target.house.value;
    const loader = document.getElementsByClassName('loader')[0];
    loader.style.display = 'block';
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      userCredential.user.getIdToken()
        .then((idToken) => {
          fetch('/auth/signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idToken,
              firstName,
              lastName,
              phoneNumber,
              area,
              block,
              street,
              house
            })
          })
            .then(result => result.json())
            .then(data => {
              if (data.success) {
                window.location.href = '/home';
              } else {
                window.location.href = 'auth/signup';
              }
            })
        });
    })
      .catch((error) => {
        loader.style.display = 'none';
        console.log(error.message);
      });
  });
}

//sign in
const signinForm = document.getElementById('signin');
if (signinForm) {
  signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const loader = document.getElementsByClassName('loader')[0];
    loader.style.display = 'block';
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      userCredential.user.getIdToken().then((idToken) => {
        fetch('/auth/signin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken
          })
        })
          .then(result => result.json())
          .then(data => {
            if (data.success) {
              window.location.href = '/home';
            } else {
              window.location.href = 'auth/signin';
            }
          });
      });
    })
      .catch((error) => {
        loader.style.display = 'none';
        console.log(error.message);
      });
  });
}
