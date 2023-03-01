const firebase = require('firebase/auth');
const auth = firebase.getAuth();
const authCntrl = require('../controllers/auth');
const User = require('../models/User');

//add to cart
exports.cart_create_get = async (req, res) => {
    if(auth.currentUser){
        const itemID = req.query.id;
        User.findOne({ firebaseID: auth.currentUser.uid })
        .then(user => {
            const cart = user.cart;
            cart.push(itemID);
            //TODO : ADD LOOP TO CHECK IF ITEM IS ALREADY IN CART
            User.findByIdAndUpdate(user._id, {cart}, {new: true})
            .then(user => {
                console.log(user);
            })

        }).catch(err => {
            console.log(err);
        })
    }else{
        res.redirect("/item/index");
        console.log('not authorized');
    }
    

}