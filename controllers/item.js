// Model
const Item = require("../models/Item");
const fs = require("fs");

// HTTP index get items
exports.item_index_get = (req, res) => {
    //search for items if search term is provided
    if (req.query.search) {
        Item.find({ title: new RegExp(req.query.search, "i") })
            .then(async (items) => {
                res.render('item/index', { items })
            })
            .catch(err => {
                console.log(err)
            })
    } else if (req.query.filter) {
        Item.find({ category: req.query.filter })
            .then(async (items) => {
                res.render('item/index', { items })
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        Item.find()
            .then(async (items) => {
                res.render('item/index', { items })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

// HTTP create Items get
exports.item_create_get = async (req, res) => {
    if (res.locals.user && res.locals.user.type === "admin") {
        Item.find().then(async (items) => {
            res.render("item/add", { items });
        });
    } else {
        res.sendStatus(401);
    }
};

// HTTP Post Items Post
exports.item_create_post = async (req, res) => {
    if (res.locals.user && res.locals.user.type === "admin") {
        let item = new Item(req.body);
        item.quantity = 1;
        const imageURL = req.file.path.replace("public", "");
        item.imageURL = imageURL;
        item
            .save()
            .then(() => {
                res.redirect("/item/index");
                console.log();
            })
            .catch((err) => {
                console.log(err);
                res.send('Error please try again later')
            })
    } else {
        res.sendStatus(401);
    }
}

// HTTP Get item details by ID
exports.item_show_get = (req, res) => {
    Item.findById(req.query.id)
        .then(async (item) => {
            res.render('item/show', { item })
        })
        .catch(err => {
            console.log(err);
        })
}

// HTTP Delete item
exports.item_delete_get = (req, res) => {
    if (res.locals.user && res.locals.user.type === "admin") {
        Item.findByIdAndDelete(req.query.id)
            .then((item) => {
                fs.unlink('public' + item.imageURL, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.redirect('/item/index')
            })
            .catch(err => {
                console.log();
            })
    } else {
        res.sendStatus(401);
    }
}

// HTTP Edit - Get
exports.item_edit_get = (req, res) => {
    if (res.locals.user && res.locals.user.type === "admin") {
        const id = req.query.id
        Item.findById(id)
            .then(async (item) => {
                res.render('item/edit', { item });
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        res.sendStatus(401);
    }
}

// HTTP Edit - Post
exports.item_edit_post = (req, res) => {
    if (res.locals.user && res.locals.user.type === "admin") {
        try {
            const { id, title, des, category, price } = req.body
            const imageURL = req.file.path.replace("public", "");
            Item.findById(id)
                .then(async (item) => {
                    fs.unlink('public' + item.imageURL, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            Item.findByIdAndUpdate(id, { imageURL, title, des, category, price }, { new: true })
                                .then(updatedItem => {
                                    res.redirect('/item/index');
                                });
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/item/index');
                });
        } catch (err) {
            console.log(err);
            res.redirect('/item/index');
        }
    } else {
        res.sendStatus(401);
    }
}


