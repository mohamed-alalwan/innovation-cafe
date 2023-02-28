const User = require('../models/User')
const firebase = require('firebase/auth');
const auth = firebase.getAuth();
const authCntrl = require("../controllers/auth");
const fs = require("fs");

// HTTP show get
exports.profile_show_get = async (req, res) => {
    if(auth.currentUser){
        const user = await authCntrl.returnCurrentUser();
        res.render('profile/show', {
            auth: auth.currentUser,
            user
        });
    }else{
        res.redirect('/auth/signin');
    }
    
}

// HTTP perosnal edit get
exports.profile_edit_personal_get = async (req, res) => {
    if(auth.currentUser){
        const user = await authCntrl.returnCurrentUser();
        res.render('profile/edit_personal', {
            auth: auth.currentUser,
            user
        });
    }else{
        res.redirect('/auth/signin');
    }
}

// HTTP personal edit post
exports.profile_edit_personal_post = async (req, res) => {
     if(auth.currentUser){
        try{
            const {id, firstName, lastName, phoneNumber} = req.body;
            const avatarURL = req.file.path.replace("public", "");
            User.findById(id)
            .then(async (user) => {
                fs.unlink('public'+user.avatarURL, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    User.findByIdAndUpdate(id, {avatarURL, firstName, lastName, phoneNumber}, {new:true})
                    .then(() => {
                        res.redirect('/profile');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
            })
            .catch((err) => {
                console.log(err);
            });
        }
        catch(err){
            console.log(err);
            res.redirect('/profile');
        }
        
     }else{
        res.redirect('/auth/signin');
     }
}

// HTTP address edit get
exports.profile_edit_address_get = async (req, res) => {
    if(auth.currentUser){
        const user = await authCntrl.returnCurrentUser();
        res.render('profile/edit_address', {
            auth: auth.currentUser,
            user
        });
    }else{
        res.redirect('/auth/signin');
    }
}

// HTTP address edit post
exports.profile_edit_address_post = async (req, res) => {
    if(auth.currentUser){
        const {id, area, block, street, house} = req.body;
        User.findByIdAndUpdate(id, {area, block, street, house}, {new:true})
        .then(() => {
            res.redirect('/profile');
        })
        .catch((err) => {
            console.log(err);
        });
    }else{
        res.redirect('/auth/signin');
    }
}

