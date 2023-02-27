require('dotenv').config();
const adminCode = process.env.ADMIN_CODE;
const express = require('express');
const router = express.Router();

//admin controller
const adminCntrl = require('../controllers/admin');

//admin sign up
router.get(`/${adminCode}`, adminCntrl.admin_signup_get);
router.post(`/${adminCode}`, adminCntrl.admin_signup_post);


module.exports = router;