const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        min: 10,
        max: 50,
        unique: true,
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        min: 15,
        max: 16,
        unique: true,
        // match: [/^\d{10}$/, 'Please fill a valid phone number'],
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 20,
    },

})

const User = mongoose.model('User', userSchema);

module.exports = User;