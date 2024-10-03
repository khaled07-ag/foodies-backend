const mongoose = require('mongoose');

const CuisineSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
  User: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  
});

module.exports = mongoose.model('Cuisine', CuisineSchema);
