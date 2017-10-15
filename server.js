'use strict'
const ls = require('local-storage');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config.json');
const api = require('./routers/api');
const index = require('./routers/index');

var app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json({ extended : true}));
app.use(bodyParser.urlencoded({ extended : true}));
app.use('/*', function(req, res, next){
    req.headers['Authorization'] = 'access_token ' + ls.get('at');
    next();
});
// app.use('/', index);
app.use('/api', api);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to db success');
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App listen on ${port}`);
});

// mongodb://localhost/roomhunter
