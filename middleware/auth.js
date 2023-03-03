const admin = require('firebase-admin');
const User = require('../models/User');

exports.setUser = (req, res, next) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true)
        .then((decodedToken) => {
            const firebaseID = decodedToken.uid;
            User.findOne({ firebaseID: firebaseID })
                .populate('cart')
                .then((user) => {
                    res.locals.user = user;
                    console.log(res.locals.user);
                    next();
                })
                .catch((err) => {
                    console.log(err);
                    next();
                })
        }).catch((error) => {
            console.log(error);
            next();
        })
};

exports.authenticate = (req, res, next) => {
    const sessionCookie = req.cookies.session || "";
    admin.auth().verifySessionCookie(sessionCookie, true)
        .then((decodedToken) => {
            const firebaseID = decodedToken.uid;
            User.findOne({ firebaseID: firebaseID })
                .then((user) => {
                    res.locals.user = user;
                    console.log(res.locals.user);
                    next();
                })
                .catch((err) => {
                    console.log(err);
                    res.redirect('/auth/signin');
                })
        }).catch((error) => {
            console.log(error);
            res.redirect('/auth/signin');
        })
};

