const router = require('express').Router();
const indexControls = require('../controllers/index');

router.get('/', indexControls.home_index_get);
router.get('/index', function(req, res){
    res.redirect('/home')
});

module.exports = router;