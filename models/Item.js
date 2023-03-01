// definding the Schema

const mongoose = require('mongoose')

const itemSchema = mongoose.Schema({
    imageURL: {type:String},
    title: {type:String},
    des: {type:String},
    category: {type:String},
    price: {type:String},
    quantity: Number
},
{
    timestamps: true
})

// Model
const Item = mongoose.model('Item', itemSchema)

// Export
module.exports = Item
