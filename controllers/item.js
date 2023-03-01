// Model
const Item = require("../models/Item");
const firebase = require("firebase/auth");
const auth = firebase.getAuth();
const authCntrl = require("../controllers/auth");
const fs = require("fs");

// HTTP index get items
exports.item_index_get = (req, res) => {
    //search for items if search term is provided
    if (req.query.search) {
        Item.find({title: new RegExp(req.query.search, "i")})
      .then(async (items) => {
            const user = await authCntrl.returnCurrentUser();
            res.render('item/index', {items, auth: auth.currentUser, user})
        })
      .catch(err => {
            console.log(err)
        })
    } else {
        Item.find()
      .then(async (items) => {
            const user = await authCntrl.returnCurrentUser();
            res.render('item/index', {items, auth: auth.currentUser, user})
        })
      .catch(err => {
            console.log(err)
        })
    }
}

// HTTP create Items get
exports.item_create_get = async (req, res) => {
    if(auth.currentUser){
        Item.find().then(async (items) => {
        const user = await authCntrl.returnCurrentUser();
        res.render("item/add", { items, auth: auth.currentUser, user});
    });
    }else{
        res.redirect("/item/index");
        console.log('not authorized');
    }
};

// HTTP Post Items Post
exports.item_create_post = async (req, res) => {
    if(auth.currentUser){
        let item = new Item(req.body);
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
    }else{
        res.redirect("/item/index");
        console.log('not authorized');
    }
    
}

// HTTP Get item details by ID
exports.item_show_get = (req, res) => {
    Item.findById(req.query.id)
    .then(async (item) => {
        const user = await authCntrl.returnCurrentUser();
        res.render('item/show', {item, auth: auth.currentUser, user}) 
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP Delete item
exports.item_delete_get = (req, res) => {
    if(auth.currentUser){
        Item.findByIdAndDelete(req.query.id)
        .then((item) => {
            fs.unlink('public'+item.imageURL, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            res.redirect('/item/index')
        })
        .catch(err => {
            console.log();
        })
    }else{
        res.redirect("/item/index");
        console.log('not authorized');
    }
}

// HTTP Edit - Get
exports.item_edit_get = (req, res) => {
    if(auth.currentUser){
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
    }else{
        res.redirect("/item/index");
        console.log('not authorized');
    }
   
}

// HTTP Edit - Post
exports.item_edit_post = (req, res) => {
    if(auth.currentUser){
        try{
            const {id, title, des, category, price} = req.body
            const imageURL = req.file.path.replace("public", "");
            Item.findById(id)
            .then(async (item) => {
                fs.unlink('public'+item.imageURL, (err) => {
                    if (err) {
                        console.log(err);
                    }else{
                        Item.findByIdAndUpdate(id, {imageURL, title, des, category, price}, {new:true})
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
        }catch(err){
            console.log(err);
            res.redirect('/item/index');
        }
    }else{
        res.redirect("/item/index");
        console.log('not authorized');
    }
}


