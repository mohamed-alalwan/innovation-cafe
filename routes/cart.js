const express = require('express');

const router = express.Router();

const cartCtrl = require("../controllers/cart");

//Call API.
router.get("/add", cartCtrl.cart_create_get);
// router.post("/cart/add", cartCtrl.cart_create_post);
// router.get("/cart/index", cartCtrl.cart_index_get);
// router.get("/cart/detail", cartCtrl.cart_show_get);
// router.delete("/cart/delete", cartCtrl.cart_delete_get);

module.exports = router;