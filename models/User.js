const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    area: {type:String, required: true},
    block: {type:String, required: true},
    street: {type:String, required: true},
    house: {type:String, required: true},
    phoneNumber: {type:String, required: true},
    type: {type:String, required: true},
    firebaseID: {type:String, required: true},
    avatarURL: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
    
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;