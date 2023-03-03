const express = require('express');

const router = express.Router();

const cartCtrl = require("../controllers/cart");

//set up user auth middleware
const auth = require('../middleware/auth');
router.use(auth.setUser);

//Call API.

//index
router.get("/index", cartCtrl.cart_index_get);

//create
router.get("/add", cartCtrl.cart_create_get);

//delete
router.get("/delete", cartCtrl.cart_delete_get);


module.exports = router;