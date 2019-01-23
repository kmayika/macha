//setup the server
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

//import schema
var User = require('./models/user');


//connection with db
var db = mongoose.connect('mongodb://localhost:27017/matcha', { useNewUrlParser: true }, function(err, response){
    if (err)
    {
        console.log("There is error connecting to mongodb")
    }
    else
    {
        console.log("There is a connection to mongodb")
    }
});

app.use(cors());
//setup port app should run in


app.set('port', process.env.port || 8080);
//use body parser
app.use(bodyParser.json());
//create default route
app.get('/', function(req, res){
    res.send("You are now connected to port 8080");
});

//create register route
app.post('/register', function(req, res){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var user = new User();
    user.username = username,
    user.emai = email,
    user.password = password;

    //save user
    user.save(function(err, result){
        if (err)
        {
            console.log("There is an error adding this user to database");
            res.send({success: "failed to add user", status: 500});
        }
        else
        {
            res.sendStatus({success: " added user", status: 200});
        }
    });
});
app.listen(app.get('port'), function(err, response){
    console.log("Server started on port :", app.get('port'));
});