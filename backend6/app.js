const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(cookieParser());

app.get('/', (req, res) => {  
    let token = jwt.sign({email:"prashant@gmail.com"}, "secret");
    console.log(token);
    res.cookie('token', token);
    res.send('Token is applied!');

});

app.get('/read', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        //encrypting the password
        bcrypt.hash('prashant', salt, (err, hash) => {
            res.cookie('password', hash); // Set cookie inside the callback

            //decrypting the password
            bcrypt.compare("prashant", "$2b$10$rdy9fzMmMpusG7.5B8QLxuE4yW4gESG73eWjN8zy2pTMCwdAKUdqC", (err, result) => {
                console.log(result);
                
                // Extract JWT after bcrypt finishes
                let data = jwt.verify(req.cookies.token, "secret");
                console.log(data);
                res.send(data); // Now send the response safely
            });
        });
    });
});


app.listen(3000, () =>{
    console.log('Server is running on port 3000');
})