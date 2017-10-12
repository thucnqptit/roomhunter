'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.json');
const userApi = require('./modules/api/users/usersController');
const roomApi = require('./modules/api/rooms/roomsController');

var app = express();

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));

app.use('/api/users', userApi);
app.use('/api/rooms', roomApi);

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
  }
});
let port = process.env.port || config.port;
app.listen(port , () => {
  console.log(`App listen on ${port}`);
});
