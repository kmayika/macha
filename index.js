const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const config = require('./config/database');
const passport = require('passport');
const messages = require('express-messages');

const app = express();
//connect to database
mongoose.connect(config.database,{ useNewUrlParser: true });
let database = mongoose.connection;

//check conn
database.once('open', function(){
    console.log('Connected to database');
});
//check errors
database.on('error', function(err){
    console.log(err);
});

//load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//body parser middleware connection
app.use(body_parser.urlencoded({extended: false}));
//parse app/json
app.use(body_parser.json());

//set publick folder
app.use(express.static(path.join(__dirname, 'public')))

//express flash message middleware
app.use(flash());
app.use(function(req, res, next){
    res.locals.messages = messages(req, res);
    next();
});

//session middleware

app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'babulale',
    resave: false, 
    saveUninitialized: false}));

//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

//Connect to home

app.get('/', function(req, res){
    res.render('index', {
        title: 'Matcha Dating'
    })
});

//route files
let users = require('./routes/users');
app.use('/users', users);

//listen to server start
app.listen(8080, function(){
    console.log('Server started on port 8080...');
});