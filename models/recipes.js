const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  ingredients: [{type: String}],
  Cuisine: {type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine'},
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  image: {type: String},
});

module.exports = mongoose.model('Recipe', RecipeSchema);
