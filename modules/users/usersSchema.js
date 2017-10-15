const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const usersSchema = new Schema({
  username : {
    type : String,
    required : true,
    unique : true },
  password : {
    type : String,
    required : true
  },
  address : {
    type : String
  },
  dob : {
    type : Date
  },
  avatar : {
    type : String
  },
  email : {
    type : String,
    unique : true
  },
  status : {
    type : Number,
    default: 0,
  },
  phoneNumber: {
    type: String
  },
  role: {
    type: String,
    enum: ['ADMIN', 'EDITOR', 'MEMBER'],
    required: true
  },
  access_token:{
    type: String,
    required: true
  }

}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );

// generating a hash
usersSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
usersSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = usersSchema;
