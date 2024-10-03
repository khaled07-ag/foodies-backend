const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
  Cuisines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuisine',
  }],
  image: {type: String},
});

module.exports = mongoose.model('User', UserSchema);
