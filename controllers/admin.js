const admin = require("firebase-admin");
const User = require("../models/User");

// HTTP Sign up Get
exports.admin_signup_get = async (req, res) => {
    res.render('admin/signup', {
    });
}

// HTTP Sign up Post
exports.admin_signup_post = async (req, res) => {
    admin
        .auth()
        .createUser({
            email: req.body.email,
            password: req.body.password
        })
        .then((userRecord) => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                area: req.body.area,
                block: req.body.block,
                street: req.body.street,
                house: req.body.house,
                phoneNumber: req.body.phoneNumber,
                type: 'admin',
                firebaseID: userRecord.uid
            });
            user.save()
                .then(() => {
                    console.log("Admin User created successfully");
                    res.redirect('/auth/signin');
                })
        }).catch((error) => {
            console.log(error);
            res.redirect('/auth/signin');
        });
}