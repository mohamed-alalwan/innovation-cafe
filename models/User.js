const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    //personal:
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    phoneNumber: {type:String, required: true},
    avatarURL: String,
    //adddress:
    area: {type:String},
    block: {type:String},
    street: {type:String},
    house: {type:String},
    //user type:
    type: {type:String, required: true},
    //firebase id:
    firebaseID: {type:String, required: true},
    //cart:
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }]
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;