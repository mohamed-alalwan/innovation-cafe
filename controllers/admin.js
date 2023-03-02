// HTTP Sign up Get
exports.admin_signup_get = async (req, res) => {
    res.render('admin/signup', {
    });
}

// HTTP Sign up Post
exports.admin_signup_post = async (req, res) => {
    // const user =  new User({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     area: req.body.area,
    //     block: req.body.block,
    //     street: req.body.street,
    //     house: req.body.house,
    //     phoneNumber: req.body.phoneNumber,
    //     type: 'admin',
    //     firebaseID: userCredentials.user.uid
    // });
    res.redirect('/home/index');
}