var express = require('express');
var multer = require('multer');
var mongoose = require('mongoose');
var usersSchema = require('../modules/users/usersSchema');
var usersModel = mongoose.model('users', usersSchema);
// var roomsModel = mongoose.model('rooms', roomsSchema);
var roomsModel = require('../modules/rooms/roomsModel.js');


var rooms = require('../modules/rooms/roomsModel');
var roomsSchema = require('../modules/rooms/roomsSchema');
var users = require('../modules/users/usersModel');

var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    var fileNames = (file && file.originalname && file.originalname.split('.')) || [];
    var filename = '';
    for (var i = 0; i < fileNames.length - 1; i++) {
      filename = filename + fileNames[i] + '.';
    }
    filename = filename + '-' + Date.now() + '.' + fileNames[fileNames.length - 1];
    cb(null, filename);
  }
});
var upload = multer({
  storage: storage,
  limits: { fileSize: '10MB' }
});

function isVerifiedToken(req, res, next) {
  if (!req.get('Authorization')) {
    res.json({
      code: -1,
      message: 'Phiên làm việc hết hạn'
    });
  }
  else {
    var accessToken = req.get('Authorization').substring(13);
    usersModel.findOne({ access_token: accessToken }, function (err, user) {
      if (err || !user) {
        res.json({
          code: -1,
          message: 'Phiên làm việc hết hạn'
        });
      } else {
        req.user = user;
        return next();
      }
    });
  }
}

function isEditor(req, res, next) {
  if (req.user.role === 'EDITOR' || req.user.role === 'ADMIN') next();
  else res.json({ code: -2, error: 'Bạn không có quyền thực hiện chức năng này' })
}

function isAdmin(req, res, next) {
  if (req.user.role === 'ADMIN') next();
  else res.json({ code: -2, error: 'Bạn không có quyền thực hiện chức năng này' })
}


router.post('/login', users.login);
router.get('/logout', isVerifiedToken, users.logout);

router.get('/users',isVerifiedToken, users.getUsersOnPage);
router.get('/users/:uId',isVerifiedToken, users.getUserById);
router.post('/users',users.addUser);
router.put('/users', isVerifiedToken, isAdmin, users.editUser);


router.get('/rooms', rooms.getRoomsOnPage);
router.get('/rooms-number', rooms.getNumberOfRooms);
router.get('/room-detail/:id',(req, res) => {
  let id = req.params.id;
  roomsModel.getRoomById(id, (err, room) => {
    if(err) {
      res.send(err);
    }else{
      res.send(room);
    }
  })
});

router.get('/room/:id', rooms.getRoom);
router.post('/rooms', isVerifiedToken, isAdmin, rooms.addRoom);
router.put('/rooms', isVerifiedToken, isAdmin, rooms.editRoom);

module.exports = router;
