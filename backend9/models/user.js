const mongoose = require('mongoose');
// import mongoose,  { connect, Schema, model } from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/miniProjet');

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    age: Number,
    password: String,
    profilepic:{
        type: String,
        default: "default.jpg",
    },
    posts: [
        {type:mongoose.Schema.Types.ObjectId, ref: 'post'}
    ],
});

module.exports = mongoose.model('user', userSchema);