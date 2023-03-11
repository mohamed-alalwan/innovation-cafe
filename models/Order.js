const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    totalPrice: { type: Number },
    area: String,
    block: String,
    street: String,
    house: String,
    phoneNumber: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
},
    {
        timestamps: true //means createdAt and updatedAt.
    })

//Model.
const Order = mongoose.model("Order", orderSchema);

//Export.
module.exports = Order;