const mongoose = require ('mongoose')
// const bcrypt = require ('bcrypt')

const userSchema = mongoose.Schema({
    firstName: {Type:String, required: true},
    lastName: {Type:String, required: true},
    area: String,
    block: String,
    street: String,
    house: String,
    phoneNumber: String
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User