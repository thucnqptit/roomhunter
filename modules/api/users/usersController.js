const express = require('express');
const Router = express.Router();
const usersModel = require('./usersModel');

Router.post('/', (req, res) => {
  let newUser = {
    username : req.body.username,
    password : req.body.password,
    email : req.body.email,
    avatar : req.body.avatar,
    address : req.body.address,
    dob : req.body.dob
  };

  usersModel.createUser(newUser, (err, doc) => {
    if (err) {
      res.send(err.errmsg);
    } else {
      res.send(doc);
    }
  });
});

module.exports = Router;
