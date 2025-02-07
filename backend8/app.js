const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/posts');
const user = require('./models/user');


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/create', async (req, res) => {
    let user = await userModel.create({
        username: "prashant",
        age: 25,
        email: "prashant@gmail.com"

    });
    res.send(user);
});

app.get('/post/create', async (req, res) => {
    let post = await postModel.create({
        postdata: "This is my first post",
        user: "67a66c7e620ccdfc2f800764"
    })

    let user = await userModel.findOne({_id: "67a66c7e620ccdfc2f800764" })
    user.posts.push(post._id);
    await user.save();
    res.send({post, user})
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});