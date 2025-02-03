const express = require('express');
const app = express();

const userModel = require('./usermodel'); 

app.get('/',(req,res)=>{
    res.send("Hello World");
});
app.get('/create', async (req,res)=>{
    let createduser = await userModel.create({
        name: "Prashant",
        username: "prashant123",
        email: "prashant@gmail.com"
    })
    res.send(createduser);
    // console.log("User Created"); 
});
app.get('/update', async (req,res)=>{
    let updateduser = await userModel.findOneAndUpdate({username:"prashant123"}, {name: "Prashant Singh"}, {new: true});
    res.send(updateduser);
});

//find -> for array of objects
//findOne -> for single object
app.get('/read', async (req,res)=>{
    let users = await userModel.find({});
    res.send(users);
});
app.get('/delete', async (req,res)=>{
    let users = await userModel.findOneAndDelete({username: "prashant7023"});
    res.send(users);
});


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});