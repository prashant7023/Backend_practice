// const mongoose = require('mongoose');
// const usermodel = require('../../backend4/usermodel');
// mongoose.connect(`mongodb://127.0.0.1:3000/testapp1`);

import { connect, Schema, model } from 'mongoose';
connect(`mongodb://127.0.0.1:27017/testapp1`);

const userSchema = Schema({
    name: String,
    email: String,
    image: String
});
let userModel = model('user', userSchema);

export default userModel;