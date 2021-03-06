var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  role: Number,
  about: String,

  // A user can link multiple accounts to their OpenUserJS account
  auths: Array,
  strategies: Array
});

var User = mongoose.model('User', userSchema);

exports.User = User;

