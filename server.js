'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config.json');
const imageApi = require('./modules/api/users/usersController');
// const staffApi = require('./modules/api/staffs/staffsController');
const roomApi = require('./modules/api/rooms/roomsController');

var app = express();

app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));

app.use('/api/users', imageApi);
app.use('/api/staffs', imageApi);
app.use('/api/room', imageApi);

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
  }
});

app.listen(config.port , () => {
  console.log(`App listen on ${config.port}`);
});
