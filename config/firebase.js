require('dotenv').config();
const firebase = require("firebase/app");
const firebaseAuth = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const apiKey = process.env.API_KEY;
const authDomain = process.env.AUTH_DOMAIN;
const projectId = process.env.PROJECT_ID;
const storageBucket = process.env.STORAGE_BUCKET;
const messagingSenderId = process.env.MESSAGING_SENDER_ID;
const appId = process.env.APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebaseAuth.getAuth().setPersistence();

module.exports = getStorage(app);