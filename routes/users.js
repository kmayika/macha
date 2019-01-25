const express = require('express');
//to connect to routers outside connection
const router = express.Router();
const passport = require('passport');
const express_validator = require('express-validator');
router.use(express_validator());
const bcrypt = require('bcryptjs');
//bring in user model
let user = require('../models/users');

//register form use router instead of "app.get"
router.get('/register', function(req, res){
    res.render('register');
});

//register process
router.post('/register', function(req, res){
    const User = require('../models/users');
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_pass = req.body.confirm_pass;

    //check bodies
    req.checkBody('name', 'name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not valid').isEmail();
    req.checkBody('username', 'name is required').notEmpty();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('confirm_pass', 'passwords do not match').equals(req.body.password);
    let errors = req.validationErrors();

    if (errors){
        res.render('register', {
            errors: errors
        });
    }
    else
    {
        let new_user = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });

        //hash pass with bcyrpt
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(new_user.password, salt, function(err, hash){
                if (err)
                {
                    console.log(err);
                }
                else
                {
                    new_user.password = hash;
                    new_user.save(function(err){
                        if (err)
                        {
                            console.log(err);
                            return;
                        }
                        else
                        {
                            req.flash('success', 'You are now registered');
                            res.redirect('/users/login');
                        }
                    });
                }
            });
        });
    }
});
//login form
router.get('/login', function(req, res){
    res.render('login',{
      message: req.flash('error')
    });
});
//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

/*--- to see what callbacks or errors appear ---*/
// router.post('/login',passport.authenticate('local',{}),(req,res)=>{
//     //by default this send Unauthorized on bad authenticate
//     res.send(req.session)});

//logout

router.get('/logout', function(req, res){
    req.session.destroy();
    req.flash('success', 'You are logged Out');
    res.redirect('/users/login');
  });
module.exports = router;
