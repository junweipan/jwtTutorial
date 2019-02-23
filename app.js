const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req, res)=>{
    res.json({
        message: "welcome to get API"
    });
});
app.post('/api/login', (req, res)=>{
    //Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brag@gmial.com'
    };
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});
app.post('/api/post', verifyToken, (req, res) => {

});

// Format of Token
// Authorization : <token>


// Verify token middle ware
function verifyToken(req, res, next){
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof (bearerHeader) !== 'undefined'){
        req.token = bearerHeader;
        // next
        jwt.verify(req.token, 'secretkey', (err, authData)=>{
            if(err){
                res.json({
                    message: "verifyToken err",
                });
            }else {
                res.json({
                    message: "post created",
                    authData
                });
            }
        });
        next();
    }else{
        // Forbidden
        // res.sendStatus(403);
    }
}

app.listen(5000, ()=>{
    console.log("server started at port 5000");
});