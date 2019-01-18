const express = require('express');
const app = express();
const path = require('path');
const login_controller = require('./controller/login_controller');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('./public'));
login_controller(app);
app.listen(8080);





















// const path = require('path');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// //bring in article models
// let Article = require('./models/article');
// //connect to db
// mongoose.connect('mongodb://localhost/matcha', {useNewUrlParser: true});
// let db = mongoose.connection;
// //check for database errors
// db.once('open', function(){
//   console.log('Connected to mongoDB');
// });
//
// db.on('error', function(err){
//   console.log(err);
// });
// //initialise app
// const app = express();
// //load view engine pug
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
// //body parser middleware application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
//
// // parse application/json
// app.use(bodyParser.json())
//
// //set public folder
// app.use(express.static(path.join(__dirname, 'public')));
//
// const port = 8080;
//
// //home route :respond with hello world when a get request is made to homepage
// app.get('/', function(req, res){
//   Article.find({}, function(err, articles){
//     if (err){
//       console.log(err);
//     }
//     else {
//       res.render('index', {
//         title: 'Welcome to Matcha Dating Sites',
//         articles: articles
//         });
//     }
//   });
// });
//
// //add route
// app.get('/articles/add', function(req,res){
//   res.render('add_article',{
//     title: 'Add article'
//   });
// });
//
// //add submit post route
// app.post('/articles/add', function(req, res){
//   let article = new Article();
//   article.title = req.body.title;
//   article.author = req.body.author;
//   article.body = req.body.body;
//
//   //save this info
//   article.save(function(err){
//     if (err){
//       console.log(err);
//       return;
//     }
//     else {
//       //redirect to home page
//       res.redirect('/');
//     }
//   });
// });
//
// //get single articles
// app.get('/article/:id', function(req,res){
//   Article.findById(req.params.id, function(err, article){
//     res.render('article',{
//       article: article
//     });
//   });
// });
//
// //load edit form
// app.get('/article/edit/:id', function(req,res){
//   Article.findById(req.params.id, function(err, article){
//     res.render('edit_article',{
//       title: 'Edit Article',
//       article: article
//     });
//   });
// });
//
// //update Submit
// app.post('/articles/edit/:id', function(req, res){
//   let article = {};
//   article.title = req.body.title;
//   article.author = req.body.author;
//   article.body = req.body.body;
//
//   let query = {_id:req.params.id}
//   //update this info
//   Article.update(query,article,function(err){
//     if (err){
//       console.log(err);
//       return;
//     }
//     else {
//       //redirect to home page
//       res.redirect('/');
//     }
//   });
// });
//
// app.listen(port, function(){
//   console.log('server started on port ${port}');
// });
