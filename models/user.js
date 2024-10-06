const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  description: {type: String},
  recipes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Recipe'}],
  Cuisines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuisine',
  }],
  userImage: {type: String},
});

module.exports = mongoose.model('User', UserSchema);
