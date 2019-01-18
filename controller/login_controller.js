const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false});
const mongo_client = require('mongodb').mongo_client;
const url = 'mongodb://localhost/matcha';

module.exports = (function(app){
  //home route
  app.get('/', function(req, res){
    res.render('index');
  });
//register route
  app.get('/register', function(req, res){
    res.render('register');
  });
  //login route
  app.get('/login', function(req, res){
    res.render('login');
  });

  //login to the database, check if user exists,if not then login invalid
  app.post('/demo', urlencodedParser, function(req, res){
    //connect to database if no error
    mongo_client.connect(url, function(err, db){
      db.collection('users').findOne({name: req.body.name},
      function(err, user){
        if (user === null)
        {
          res.end("Error: Login Invalid");
        }
        else if (user.name === req.body.name && user.password === req.body.password)
        {
          res.render('completeprofile', {profile_Data: user});
        }
        else
        {
            console.log("Error: Wrong credentials");
            res.end("Error: Invalid Login");
        }
      });
    });
  });

  //register to database
  app.post('/register_to_db', urlencodedParser, function(req, res){
    //data must be seen as string
    const object = JSON.stringify(req.body);
    const json_object = JSON.parse(object);

    res.render('profile', {login_Data: req.body});
  });
  //register profile to mongoDB
  app.post('/completeprofile', urlencodedParser, function(req, res){
    const object = JSON.stringify(req.body);
    console.log("Final registeration data: "+object);
    //change string to javascript object
    const json_object = JSON.parse(object);

    mongo_client.connect(url, function(err, db){
      db.collection('users').insertOne(json_object, function(err, res){
        if (err)
        {
          throw err;
        }
        else
        {
            console.log('User Registered to database');
            db.close();
        }
      });
      res.render('completeprofile', {profile_Data: req.body});
    });

  });
});
