var express = require('express');
var multer = require('multer');

var users = require('../modules/users');
var rooms = require('../controllers/rooms');

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
    Staff.findOne({ access_token: accessToken }, function (err, staff) {
      if (err || !staff) {
        res.json({
          code: -1,
          message: 'Phiên làm việc hết hạn'
        });
      } else {
        req.staff = staff;
        return next();
      }
    });
  }
}

function isEditor(req, res, next) {
  if (req.staff.role === 'EDITOR' || req.staff.role === 'ADMIN') next();
  else res.json({ code: -2, error: 'Bạn không có quyền thực hiện chức năng này' })
}

function isAdmin(req, res, next) {
  if (req.staff.role === 'ADMIN') next();
  else res.json({ code: -2, error: 'Bạn không có quyền thực hiện chức năng này' })
}


router.post('/login', staffs.login);
router.get('/logout', isVerifiedToken, staffs.logout);

router.get('/users', users.getUsersOnPage);
router.get('/users/:uId', users.getUserById);
router.post('/users', isVerifiedToken, isAdmin, gifts.addUser);
router.put('/users', isVerifiedToken, isAdmin, gifts.editUser);


router.get('/rooms', rooms.getRoomsOnPage);
router.get('/rooms-number', gifts.getNumberOfRooms);
router.post('/rooms', isVerifiedToken, isAdmin, gifts.addRoom);
router.put('/rooms', isVerifiedToken, isAdmin, gifts.editRoom);

module.exports = router;
