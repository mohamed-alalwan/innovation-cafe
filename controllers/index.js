const firebase = require('firebase/auth');
const auth = firebase.getAuth();
const authCntrl = require('../controllers/auth');

//method to handle home page at root route
exports.home_index_get = async function(req, res) {
    const user = await authCntrl.returnCurrentUser();
    res.render('home/index', {
            auth: auth.currentUser,
            user
    });
}