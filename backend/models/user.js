//create schemer for users

var mongoose = require('mongoose');

var userSchemer = mongoose.Schema({
    username : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true}
});
//export the schemer 
var User = module.exports = mongoose.model('User', userSchemer);