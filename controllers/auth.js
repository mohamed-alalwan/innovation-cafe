const User = require('../models/User');
const admin = require('firebase-admin');


// HTTP Sign up Get
exports.auth_signup_get = async (req, res) => {
    res.render('auth/signup', {
    });
}

// HTTP Sign up Post
exports.auth_signup_post = async (req, res) => {
    console.log(req.body);
    const idToken = req.body.idToken;
    admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
            const firebaseID = decodedToken.uid;
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                area: req.body.area,
                block: req.body.block,
                street: req.body.street,
                house: req.body.house,
                phoneNumber: req.body.phoneNumber,
                type: 'customer',
                firebaseID: firebaseID
            });
            user.save().then(() => {
                console.log('User created =>', user);
                createSessionCookie(res, req);
            }).catch(err => {
                console.log(err);
                res.json({ success: false });
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

// HTTP Sign in Get
exports.auth_signin_get = async (req, res) => {
    res.render('auth/signin');
}

// HTTP Sign in Post
exports.auth_signin_post = async (req, res) => {
    console.log(req.body);
    createSessionCookie(res, req);
}

async function createSessionCookie(res, req) {
    const idToken = req.body.idToken;
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    await
        admin
            .auth()
            .createSessionCookie(idToken, { expiresIn })
            .then(sessionCookie => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie('session', sessionCookie, options);
                res.json({ success: true });
            })
            .catch(error => {
                console.log(error);
                res.json({ success: false });
            });
}

// HTTP Sign out Get
exports.auth_signout_get = (req, res) => {
    res.clearCookie('session');
    res.redirect('/auth/signin');
}

// HTTP Password Reset Get
exports.auth_forgot_password_get = async (req, res) => {
    res.render('auth/forgot_password');
}