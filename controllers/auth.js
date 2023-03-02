const User = require('../models/User')


// HTTP Sign up Get
exports.auth_signup_get = async (req, res) => {
    res.render('auth/signup', {
    });
}

// HTTP Sign up Post
exports.auth_signup_post = async (req, res) => {
    // const user =  new User({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     area: req.body.area,
    //     block: req.body.block,
    //     street: req.body.street,
    //     house: req.body.house,
    //     phoneNumber: req.body.phoneNumber,
    //     type: 'customer',
    // });
}

// HTTP Sign in Get
exports.auth_signin_get = async (req, res) => {
    res.render('auth/signin', {
    }); 
}

// HTTP Sign in Post
exports.auth_signin_post = async (req, res) => {
    // firebase.signInWithEmailAndPassword(auth,req.body.email, req.body.password);
    res.redirect('/home/index');
}

// HTTP Sign out Get
exports.auth_signout_get = (req, res) => {
    res.redirect('/auth/signin');
}

// HTTP Password Reset Get
exports.auth_forgot_password_get = async (req, res) => {
    res.render('auth/forgot_password', {
    });
}

// HTTP Password Reset Post
exports.auth_forgot_password_post = async (req, res) => {
    res.redirect('/auth/signin');
}


