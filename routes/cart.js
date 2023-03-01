const express = require('express');

const router = express.Router();

const cartCtrl = require("../controllers/cart");

//Call API.

//index
router.get("/index", cartCtrl.cart_index_get);

//create
router.get("/add", cartCtrl.cart_create_get);

//delete
router.get("/delete", cartCtrl.cart_delete_get);


module.exports = router;