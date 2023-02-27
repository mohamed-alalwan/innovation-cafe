const User = require('../models/User')
const firebase = require('firebase/auth');
const auth = firebase.getAuth();

// HTTP Sign up Get
exports.auth_signup_get = (req, res) => {
    res.render('auth/signup', {
        user: auth.currentUser
    });
}

// HTTP Sign up Post
exports.auth_signup_post = async (req, res) => {
    firebase.createUserWithEmailAndPassword(auth,req.body.email, req.body.password).then((userCredentials) => {
        if(auth.currentUser){
            console.log(req.body);
            const user =  new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                area: req.body.area,
                block: req.body.block,
                street: req.body.street,
                house: req.body.house,
                phoneNumber: req.body.phoneNumber,
                type: 'customer',
                firebaseID: userCredentials.user.uid
            });
            user.save().then(() => {
                console.log("signed up");
                res.render('home/index');
            }).catch(err => {
                console.log("failed to sign up - error = " + err.message);
                es.redirect('/auth/signin');
                console.log(err);
            });
        }
    }).catch((err) => {
        console.log("failed to sign up - error = " + err.message);
        res.redirect('/auth/signin');
        console.log(err);
    });
}

// HTTP Sign in Get
exports.auth_signin_get = (req, res) => {
    // console.log(auth.currentUser);
    res.render('auth/signin', {
        user: auth.currentUser
    });
}

// HTTP Sign in Post
exports.auth_signin_post = async (req, res) => {
    firebase.signInWithEmailAndPassword(auth,req.body.email, req.body.password).then((userCredentials) => {
        console.log('signed in');
        res.redirect('/home/index');
    }).catch(err => {
        console.log(err);
    });
}

// HTTP Sign out Get
exports.auth_signout_get = (req, res) => {
    firebase.signOut(auth).then(() => {
        res.redirect('/auth/signin', {
            user: auth.currentUser
        });
    }).catch(err => {
        console.log(err);
    });
}


