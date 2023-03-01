const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    category: ['Foods', 'Drinks', 'Deserts']
})

// Model
const Category = mongoose.model('category', categorySchema)

// Export
module.exports = Category 