const express = require('express');
const app = express();
const userModel = require('./models/user');
const postModel = require('./models/post');
const cookieParser = require('cookie-parser');
const path = require('path');
const { hash } = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/login' , (req, res) => {
  res.render('login');
});
app.get('/profile' , isLoggedin , (req, res) => {
  console.log(req.user);
  res.render('login');
});

app.post('/login', async (req, res) => {
  let  {email,password } = req.body;
  let user = await userModel.findOne({email});
  if(!user) return res.status(500).send('User not exists');

  bcrypt.compare(password, user.password, (err,result)=>{
    if(result) {
      let token = jwt.sign({email:email, userid: user._id}, "secrete");
      res.cookie('token', token);
      res.status(200).send('Logged in');
    }
    else res.redirect('/login');
  })
  
});
app.post('/register', async (req, res) => {
  let { username, name, email, age, password } = req.body;
  let user = await userModel.findOne({email});
  if(user) return res.status(500).send('User already exists');
  
  bcrypt.genSalt(10, (error,salt)=>{
    bcrypt.hash(password, salt, async (error,hash)=>{
      // console.log(hash);
      let user = userModel.create({
        username,
        name,
        email,
        age,
        password: hash
      });
      
      let token = jwt.sign({email:email, userid: user._id}, "secrete");
      res.cookie('token', token);
      res.send('Registered Successfully');
    });
  });
});

//logout
app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

function isLoggedin(req, res, next){
  if(req.cookies.token === undefined) return res.send("You are not logged in");
  else{
      let data = jwt.verify(req.cookies.token, "secrete");
      req.user = data;
      next();
    };
  };


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});