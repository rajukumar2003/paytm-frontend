const mongoose = require('mongoose');
const { Schema } = mongoose;
const { z } = require('zod');


mongoose.connect('mongodb+srv://rajukumar:JRi01RKSdIRKe2nU@cluster0.n3dvs3d.mongodb.net/paytm');

// User Schema---------------------------------
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    password: {
        type: String,
        required: true,
    },
});


// Bank related Schema--------------------------
const accountschema = new mongoose.Schema({
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }],
    balance: {
        type: Number,
        required:true
    }
});


const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountschema);


module.exports = {
    User,
    Account
}
