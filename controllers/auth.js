const User = require('../models/User')
const firebase = require('firebase/auth');
const auth = firebase.getAuth();

exports.returnCurrentUser =  () => {
    if(auth.currentUser) {
        try{
            const user = User.findOne({firebaseID: auth.currentUser.uid})
            return user;
        } catch(err) {
            return err;
        }
    }
}
// HTTP Sign up Get
exports.auth_signup_get = async (req, res) => {
    const user = await this.returnCurrentUser();
    res.render('auth/signup', {
        auth: auth.currentUser,
        user
    });
}

// HTTP Sign up Post
exports.auth_signup_post = async (req, res) => {
    firebase.createUserWithEmailAndPassword(auth,req.body.email, req.body.password).then((userCredentials) => {
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
            res.redirect('/home/index');
        }).catch(err => {
            console.log("failed to sign up - error = " + err.message);
            es.redirect('/auth/signin');
            console.log(err);
        });
    }).catch((err) => {
        console.log("failed to sign up - error = " + err.message);
        res.redirect('/auth/signin');
        console.log(err);
    });
}

// HTTP Sign in Get
exports.auth_signin_get = async (req, res) => {
    const user = await this.returnCurrentUser();
        res.render('auth/signin', {
            auth: auth.currentUser,
            user
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
        res.redirect('/auth/signin');
    }).catch(err => {
        console.log(err);
    });
}

// HTTP Password Reset Get
exports.auth_forgot_password_get = async (req, res) => {
    const user = await this.returnCurrentUser();
    res.render('auth/forgot_password', {
        auth: auth.currentUser,
        user
    });
}

// HTTP Password Reset Post
exports.auth_forgot_password_post = async (req, res) => {
    firebase.sendPasswordResetEmail(auth,req.body.email)
    .then(() => {
        res.redirect('/auth/signin');
    })
    .catch(err => {
        console.log(err);
        res.redirect('/auth/signin');
    });
}


