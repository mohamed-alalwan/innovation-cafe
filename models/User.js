const mongoose = require ('mongoose')
// const bcrypt = require ('bcrypt')

const userSchema = mongoose.Schema({
    firstName: {Type:String, required: true},
    lastName: {Type:String, required: true},
    Address: {Type:String, required: true},
    phoneNumber: {Type:String, required: true}
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User