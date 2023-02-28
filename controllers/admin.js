const User = require('../models/User')
const firebase = require('firebase/auth');
const auth = firebase.getAuth();
const authCntrl = require('../controllers/auth');

// HTTP Sign up Get
exports.admin_signup_get = async (req, res) => {
    const user = await authCntrl.returnCurrentUser();
    res.render('admin/signup', {
        auth: auth.currentUser,
        user
    });
}

// HTTP Sign up Post
exports.admin_signup_post = async (req, res) => {
    firebase.createUserWithEmailAndPassword(auth,req.body.email, req.body.password).then((userCredentials) => {
        const user =  new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            area: req.body.area,
            block: req.body.block,
            street: req.body.street,
            house: req.body.house,
            phoneNumber: req.body.phoneNumber,
            type: 'admin',
            firebaseID: userCredentials.user.uid
        });
        user.save().then(() => {
            console.log("signed up");
            res.redirect('/home/index');
        }).catch(err => {
            console.log("failed to sign up - error = " + err.message);
            res.redirect('/home');
            console.log(err);
        });
    }).catch((err) => {
        console.log("failed to sign up - error = " + err.message);
        res.redirect('/home');
        console.log(err);
    });
}