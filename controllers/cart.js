const User = require('../models/User');

//go to cart
exports.cart_index_get = async (req, res) => {
    res.render('item/cart', {
    });
}

//add to cart
exports.cart_create_get = async (req, res) => {
    if (res.locals.user) {
        const itemID = req.query.id;
        User.findOne({ firebaseID: res.locals.user.firebaseID })
            .then(async (user) => {
                const cart = user.cart;
                //TODO : ADD LOOP TO CHECK IF ITEM IS ALREADY IN CART
                cart.push(itemID);
                User.findByIdAndUpdate(user._id, { cart }, { new: true })
                    .then(user => {
                        console.log(user);
                        //success
                        res.redirect('/cart/index');
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }).catch(err => {
                console.log(err);
            })
    } else {
        res.redirect("/item/index");
        console.log('not authorized');
    }
}

//remove from cart
exports.cart_delete_get = async (req, res) => {
    if (res.locals.user) {
        const itemID = req.query.id;
        User.findOne({ firebaseID: res.locals.user.firebaseID })
            .then(async (user) => {
                const cart = user.cart;
                //TODO : ADD LOOP TO CHECK IF ITEM IS ALREADY IN CART
                cart.splice(cart.indexOf(itemID), 1);
                User.findByIdAndUpdate(user._id, { cart }, { new: true })
                    .then(user => {
                        console.log(user);
                        //success
                        res.redirect('/cart/index');
                    })
                    .catch(err => {
                        console.log(err);
                    })

            }).catch(err => {
                console.log(err);
            })
    } else {
        res.redirect("/item/index");
        console.log('not authorized');
    }
}