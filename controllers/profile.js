const User = require('../models/User')
const fs = require("fs");

// HTTP show get
exports.profile_show_get = async (req, res) => {
    res.render('profile/show');
}

// HTTP perosnal edit get
exports.profile_edit_personal_get = async (req, res) => {
    res.render('profile/edit_personal');
}

// HTTP personal edit post
exports.profile_edit_personal_post = async (req, res) => {
    try {
        const { id, firstName, lastName, phoneNumber } = req.body;
        const avatarURL = req.file.path.replace("public", "");
        User.findById(id)
            .then(async (user) => {
                fs.unlink('public' + user.avatarURL, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    User.findByIdAndUpdate(id, { avatarURL, firstName, lastName, phoneNumber }, { new: true })
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
    catch (err) {
        console.log(err);
        res.redirect('/profile');
    }
}

// HTTP address edit get
exports.profile_edit_address_get = async (req, res) => {
    res.render('profile/edit_address');
}

// HTTP address edit post
exports.profile_edit_address_post = async (req, res) => {
    const { id, area, block, street, house } = req.body;
    User.findByIdAndUpdate(id, { area, block, street, house }, { new: true })
        .then(() => {
            res.redirect('/profile');
        })
        .catch((err) => {
            console.log(err);
        });
}

