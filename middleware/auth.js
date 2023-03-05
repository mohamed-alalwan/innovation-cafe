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
                    console.log('User online =>', firebaseID);
                    next();
                })
                .catch((err) => {
                    console.log('Error retrieving user =>', firebaseID);
                    next();
                })
        }).catch((error) => {
            console.log('Guest user');
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
                    console.log('User online =>', firebaseID);
                    next();
                })
                .catch((err) => {
                    console.log('Error retrieving user =>', firebaseID);
                    res.redirect('/auth/signin');
                })
        }).catch((error) => {
            console.log('Guest user');
            res.redirect('/auth/signin');
        })
};

