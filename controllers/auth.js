// const User = require('../models/User')
const firebase = require('firebase/auth');
const auth = firebase.getAuth();

// HTTP Sign up Get
exports.auth_signup_get = (req, res) => {
    res.render('auth/signup');
}

// HTTP Sign up Post
exports.auth_signup_post = async (req, res) => {
    firebase.createUserWithEmailAndPassword(auth,req.body.email, req.body.password).then((userCredentials) => {
        userCredentials.user.displayName = req.body.firstName + " " + req.body.lastName;
        res.send('Welcome ' + userCredentials.user.displayName + '!');
        console.log(userCredentials.user);
    }).catch(err => {
        console.log(err);
    });
}

// HTTP Sign in Get
exports.auth_signin_get = (req, res) => {
    console.log('Status: ' + (auth.currentUser ? 'user is signed in' : 'no user is signed in'));
    res.render('auth/signin');
}

// HTTP Sign in Post
exports.auth_signin_post = async (req, res) => {
    firebase.signInWithEmailAndPassword(auth,req.body.email, req.body.password).then((userCredentials) => {
        console.log(userCredentials.user);
    }).catch(err => {
        console.log(err);
    });
}

// HTTP Sign out Get
exports.auth_signout_get = (req, res) => {
    firebase.signOut(auth).then(() => {
        res.redirect('/auth/signin');
    }).catch(err => {
        console.log(err);
    });
}


