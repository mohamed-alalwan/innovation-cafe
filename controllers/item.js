// Model
const Item = require("../models/Item");
const firebase = require("firebase/auth");
const auth = firebase.getAuth();
const authCntrl = require("../controllers/auth");

// HTTP index get items
exports.item_index_get = (req, res) => {
    Item.find()
    .then( async (items) => {
        const user = await authCntrl.returnCurrentUser();
        res.render('item/index', 
            {
            items, 
            auth: auth.currentUser,
            user
            }
        )
    })
    .catch(err => {
        console.log(err)
    })
}

// HTTP create Items get
exports.item_create_get = (req, res) => {
  Item.find().then(async (items) => {
    const user = await authCntrl.returnCurrentUser();
    res.render("item/add", { items, auth: auth.currentUser, user});
  });
};
// HTTP Post Items Post
exports.item_create_post = async (req, res) => {
    let item = new Item(req.body);
    item.imageURL = req.file.path;
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
}

// HTTP Get item details by ID
exports.item_show_get = (req, res) => {
    Item.findById(req.query.id)
    .then(async (item) => {
        const user = await authCntrl.returnCurrentUser();
        console.log(item);
        res.render('item/show', {item, auth: auth.currentUser, user}) 
        
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP Delete item
exports.item_delete_get = (req, res) => {
    Item.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect('/item/index')
    })
    .catch(err => {
        console.log();
    })
}

// HTTP Edit - Get
exports.item_edit_get = (req, res) => {
    const id = req.query.id
    Item.findById(id)
    .then(async(item) => {
        const user = await authCntrl.returnCurrentUser();
        res.render('item/edit', {
            item,
            auth: auth.currentUser,
            user
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

// HTTP Edit - Post
exports.item_edit_post = (req, res) => {
    const {id, title, des, category, price} = req.body
    Item.findByIdAndUpdate(id, {title, des, category, price}, {new:true})
    .then(updatedItem => {
        res.redirect('/item/index')
    })
}


