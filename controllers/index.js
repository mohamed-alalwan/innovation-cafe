const firebase = require('firebase/auth');
const auth = firebase.getAuth();

//method to handle home page at root route
exports.home_index_get = function(req, res) {
    res.render('home/index', {
        auth: auth.currentUser
    });
}