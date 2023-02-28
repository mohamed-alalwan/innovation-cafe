const express = require('express')
const router = express.Router()

const itemCntrl = require('../controllers/item');

//multer initialization
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/items');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});
router.use(upload.single('imageURL'));

// Call API
router.get('/index', itemCntrl.item_index_get)
router.get('/add', itemCntrl.item_create_get)
router.post('/add', itemCntrl.item_create_post)
router.get('/show', itemCntrl.item_show_get)
router.get('/delete', itemCntrl.item_delete_get)
router.get('/edit', itemCntrl.item_edit_get)

module.exports = router