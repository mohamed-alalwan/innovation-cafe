//method to handle home page at root route
exports.home_index_get = function(req, res) {
    res.render('home/index');
}