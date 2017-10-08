const mongoose = require('mongoose');
const usersSchema = require('./usersSchema');

let usersModel = mongoose.model('users', usersSchema);

const createUser = (user, callback) => {
  usersModel.create(user, (err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, doc);
    }
  })
};

module.exports = {
  createUser
}
