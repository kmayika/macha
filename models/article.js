let mongoose = require('mongoose');

//article schema: for different preferences

let articleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type:String,
    required: true
  },
  body:{
    type: String,
    required: true
  }
});
//compile schema into model
let Article = module.exports = mongoose.model('Article', articleSchema);
