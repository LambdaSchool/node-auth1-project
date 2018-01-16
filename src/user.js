const mongoose = require('mongoose');

// Clear out mongoose's model cache to allow --watch to work for tests:
// https://github.com/Automattic/mongoose/issues/1251
mongoose.models = {};
mongoose.modelSchemas = {};
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/bcrypt-users', { useMongoClient: true });

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
