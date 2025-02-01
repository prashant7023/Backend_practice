// console.log(path.join(__dirname, 'public')); //joining the path

const express = require('express');
const app = express();
const path = require('path'); //path module

//parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public') ));
app.set('view engine', 'ejs');

app.get("/",(req,res)=>{
    // res.send("Hello World");
    res.render("index");
}); 

// dynamic routing
app.get("/profile/:name",(req,res)=>{
    // res.send("Welcome "+req.params.name);
    res.send(`Welcome ${req.params.name}`);
});
app.get("/profile/:name/:age",(req,res)=>{
    // res.send("Welcome "+req.params.name);
    res.send(`Welcome ${req.params.name} of age ${req.params.age}`);
});

PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
