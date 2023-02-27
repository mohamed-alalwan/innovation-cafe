const express = require('express')
const router = express.Router()

const itemCntrl = require('../controllers/item')

router.get('/index', itemCntrl.item_index_get)
router.get('/add', itemCntrl.item_create_get)
router.post('/add', itemCntrl.item_create_post)

module.exports = router