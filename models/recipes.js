const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  mealName: {type: String, required: true},
  description: {type: String},
  ingredients: [{type: String}],
  cuisine: {type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine'},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipeImage: {type: String},
});

module.exports = mongoose.model('Recipe', RecipeSchema);
