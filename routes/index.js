const router = require('express').Router();
const indexControls = require('../controllers/index');

router.get('/', indexControls.home_index_get);

module.exports = router;