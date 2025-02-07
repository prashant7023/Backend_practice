const mongoose = require('mongoose');
const { type } = require('os');

mongoose.connect('mongodb://localhost:27017/testingDB');

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    posts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]

})

module.exports = mongoose.model('user', userSchema);