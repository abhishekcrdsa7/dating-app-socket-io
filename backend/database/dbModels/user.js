const mongoose = require('mongoose');

const user = {
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picture: String
};

const userSchema = new mongoose.Schema(user);
module.exports = mongoose.model('user',userSchema);
