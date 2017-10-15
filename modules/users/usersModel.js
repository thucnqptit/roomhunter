const mongoose = require('mongoose');
const usersSchema = require('./usersSchema');
const uuidV4 = require('uuid4');
const ls = require('local-storage');

let usersModel = mongoose.model('users', usersSchema);

const addUser = function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        usersModel.findOne({username: username}, function (err, user) {
            if (err) res.json({code: 0, error: err});
            else if (user) res.json({code: 2, error: 'ten dang nhap da ton tai'});
            else {
                var user = new usersModel({
                    username: username,
                    access_token: uuidV4()
                });
                user.password = user.generateHash(password);
                user.university = req.body.university;
                user.address = req.body.address;
                user.phone = req.body.phone;
                user.email = req.body.email;
                user.phoneNumber = req.body.phoneNumber;
                user.dob = req.body.dob;
                user.avatar = req.body.avatar;
                user.role = req.body.role;
                user.fullname = req.body.fullname;
                user.save(function (err) {
                    if (err) res.json({code: 0, error: err});
                    else {
                        res.json({code: 1, result: user});
                    }
                });
            }
        })

    }
const login =  function (req, res) {
        var username = req.body.username;
        var password = req.body.password;
        usersModel.findOne({username: username})
            .exec(function (err, user) {
                if (err) {
                    res.json({code: 0, error: err});
                }
                else if (!user) {
                    res.json({code: 2, error: 'Sai ten dang nhap'});
                }
                else if (!user.validPassword(password)) {
                    res.json({code: 3, error: 'Sai mat khau'});
                }
                else {
                    res.json({
                        code: 1,
                        access_token: user.access_token,
                        user: user
                    });
                    ls.set('at', user.access_token)
                    // let url = config.API_HOST + req.ur
                    // req.headers['Authorization'] = 'access_token ' + user.access_token;
                    // req.pipe(request(url)).pipe(res)
                }
            });
    }

const logout =  function (req, res) {
        var userId = req.user._id;
        usersModel.update(
          {_id: userId},
          {access_token: uuidV4()},
          function (err) {
            if (err) res.json({code: 0, error: err});
            else {
                req.user = undefined;
                res.json({code: 1});
            }
        });
}
const editUser = function() {
}
const getUserById = function (req, res) {
  var id = req.query.id;
  usersModel.findOne({_id : id})
      .exec(function (err, user) {
          if (err) {
              res.json({ code: 1, error: err });
          } else {
              res.json({
                  code: 1,
                  result: user
              });
          }
      });
}
const getUsersOnPage = function (req, res) {

}
module.exports = {
  addUser,
  editUser,
  logout,
  login,
  getUserById,
  getUsersOnPage
}
