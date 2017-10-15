var express = require('express');
var router = express.Router();
// var env = process.env.NODE_ENV || 'dev'

/* GET home page. */

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/', function(req, res, next) {
    res.render('homepage', { title: 'Express' });
});
router.get('/detail', function(req, res, next) {
    res.render('detail', { title: 'Express' });
});
module.exports = router;
