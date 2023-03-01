//Model.
const Article = require("../models/Article");
const Author = require('../models/Author')

//HTTP GET - Load Article form.
exports.article_create_get = (req, res) => {
    Author.find().populate('name')
        .then((authors) => {
            res.render("article/add", { authors })
        })
        .catch(err => {
            console.log(err)
        })
}

//HTTP POST - To Post the data.
exports.article_create_post = (req, res) => {
    console.log(req.body);
    let article = new Article(req.body);

    //Save article in the database.
    article.save()
    .then(() => {
        res.redirect("/article/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!");
    })
}

//HTTP GET  Index.
exports.article_index_get = (req, res) => {
    Article.find().populate('author')
        .then(articles => {
            console.log(articles.author)
            res.render("article/index", {articles}) //{articles : articles})
    })
    .catch(err => {
        console.log(err);
    })
}

//HTTP GET - Article by ID
exports.article_show_get = (req,res) =>{
    Article.findById(req.query.id)
    .then(article => {
        res.render("article/detail", {article});
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP DELETE - Article
exports.article_delete_get = (req, res) => {
    Article.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/article/index")
    })
    .catch(err => {
        console.log(err);
    })
}