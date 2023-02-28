const express = require('express');
const router = express.Router();

//profile controller
const profileCntrl = require('../controllers/profile');

//multer initialization
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/profile');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({storage: storage});
router.use(upload.single('avatarURL'));

//show profile
router.get('/', profileCntrl.profile_show_get);

//edit personal info
router.get('/edit_personal', profileCntrl.profile_edit_personal_get);
router.post('/edit_personal', profileCntrl.profile_edit_personal_post);

//edit address info
router.get('/edit_address', profileCntrl.profile_edit_address_get);
router.post('/edit_address', profileCntrl.profile_edit_address_post);




module.exports = router;