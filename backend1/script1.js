const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Middleware->
app.use((req,res,next)=>{
    console.log("Middleware 1");
    next();
});

// Routing->
// app.get("/", requestHandler)    
app.get('/', (req,res)=>{
    res.send('New Data again');
} );
app.get('/profile', (req,res)=>{
    return next(new  Error('Error Occured'));
}); 

app.use((err,req,res,next)=>{
    console.log(err.stack)
    res.status(500).send('Something broke!')
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});