const express = require('express');
const router = express.Router();

//auth controller
const authCntrl = require('../controllers/auth');

//sign up
router.get('/signup', authCntrl.auth_signup_get);

//sign in
router.get('/signin', authCntrl.auth_signin_get);

module.exports = router;