// const http = require('http'); //core module installed in the system
// const fs = require('fs');
// const hostname = '127.0.0.1';//host
// const port = 8080;//port
//
//
// fs.readFile('index.html', (err,html) =>
// {
//   if (err)
//   {
//     throw err;
//   }
//   const server = http.createServer((req,res) =>
//   {
//     res.statusCode = 200;//Status code
//     res.setHeader('Content-type', 'text/html');//set header
//     res.write(html);
//     res.end();//take response and call end
//   });//create server
//
//   server.listen(port,hostname,() => //call back that uses arrow funct
//   {
//     console.log('Server started on port'+port);
//   });
// });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//connect to db
mongoose.connect('mongodb://localhost/users');
let db = mongoose.connection;
//check connect
db.once('open', function(){
  console.log("Connected to mongodb");
});
//check for db errors
db.on('error', function(err){
  console.log(err);
});
//initialise app
const app = express();
//bring in models
let Article = require('./models/article');
//load view/template engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//home "/" route
app.get('/', function(req,res){
  //empty {}  because we want all articles
  Article.find({}, function(err, articles){
    if (err)
    {
      console.log(err);
    }
    else
    {
      //render templates
      res.render('index', {
          title: "Matcha Dating Sit",
          articles: articles
      });
    }

  });

});

//add route to another page
app.get('/articles/add', function(req,res)
{
  res.render('add_article',
  {
    title: 'Add Articlesss'
  });
});

//add submit POST request
app.post('/articles/add', function(req,res)
{
  let article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

//save
  article.save(function(err){
    if (err)
    {
      console.log(err);
    }
    else {
      //redirect to home
      res.redirect('/');
    }
  });
  // console.log(req.body.title);
});
//start server
app.listen(8080, function(){
  console.log('Server started on port 8080');
});
