const mongoose = require('mongoose');

const user_schema = mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    username:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    }
});

//create variable so that we can connect to this model no matter where we are

const User = module.exports = mongoose.model('User', user_schema);