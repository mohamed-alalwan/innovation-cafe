// Model
const Item = require ('../models/Item')

// HTTP index get items
exports.item_index_get = (req, res) => {
    res.render('item/index')
}

// HTTP create Items get 
exports.item_create_get = (req, res) => {
    Item.find()
    .then((items) => {
        res.render('item/add', {items})
    })
}

// HTTP Post Items Post
exports.item_create_post = (req, res) => {
    let item = new Item(req.body)

    item.save()
    .then(() => {
        res.redirect('/item/index')
    })
    .catch((err) => {
        console.log(err);
        res.send('Error please try again later')
    })
}