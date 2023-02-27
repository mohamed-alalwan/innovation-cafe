// definding the Schema

const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    imageURL: {type:String, required:true},
    title: {type:String, required: true},
    description: {type:String, required: true},
    price: {type:String, required: true}
    // quantity: Number
},
{
    timestamps: true
})

// Model
const Item = mongoose.model('item', itemSchema)

// Export
module.exports = Item
