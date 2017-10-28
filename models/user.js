const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./role-types');

const userSchema = new Schema({
  userRole      : { type: String, enum: TYPES, default: 'User' },
  email      : String,
  username   : String,
  password   : String,
  facebookID: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
