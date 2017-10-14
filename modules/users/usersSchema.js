const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const usersSchema = new Schema({
  username : { type : String, required : true, unique : true },
  password : { type : String, required : true },
  address : { type : String, required : true },
  dob : { type : Date },
  avatar : { type : String },
  email : { type : String, unique : true },
  status : { type : Number}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );

usersSchema.pre('save', function(next) {
  let user = this;
  if (user) {
    bcrypt.genSalt(10, function(err, salt) {
      console.log(salt);
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  }
});

module.exports = usersSchema;
