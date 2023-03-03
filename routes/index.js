const router = require('express').Router();
const indexControls = require('../controllers/index');

//set up user auth middleware
const auth = require('../middleware/auth');
router.use(auth.setUser);

router.get('/', indexControls.home_index_get);
router.get('/index', function (req, res) {
    res.redirect('/home')
});

module.exports = router;