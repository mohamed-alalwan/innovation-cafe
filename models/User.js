const mongoose = require ('mongoose')

const userSchema = mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    area: String,
    block: String,
    street: String,
    house: String,
    phoneNumber: String,
    type: {type:String, required: true},
    firebaseID: {type:String, required: true}
},
{
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User