const express = require('express')
const router = express.Router()

const itemCntrl = require('../controllers/item')

// Call API
router.get('/index', itemCntrl.item_index_get)
router.get('/add', itemCntrl.item_create_get)
router.post('/add', itemCntrl.item_create_post)
router.get('/show', itemCntrl.item_show_get)
router.get('/delete', itemCntrl.item_delete_get)
router.get('/edit', itemCntrl.item_edit_get)
router.post('/edit', itemCntrl.item_edit_post)


module.exports = router