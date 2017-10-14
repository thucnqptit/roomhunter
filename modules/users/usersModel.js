const mongoose = require('mongoose');
const usersSchema = require('./usersSchema');
const uuidV4 = require('uuid/v4');

let usersModel = mongoose.model('users', usersSchema);

const createUser = (user, callback) => {
  usersModel.create(user, (err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, doc);
    }
  })
};
const login =  function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;

        usersSchema.findOne({username: username})
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
                }
            });
    }

const logout =  function (req, res, next) {
        var userId = req.user._id;
        usersModel.update({_id: userId}, {access_token: uuidV4()}, function (err) {
            if (err) res.json({code: 0, error: err});
            else {
                req.user = undefined;
                res.json({code: 1});
            }
        });
}
module.exports = {
  createUser,
  logout,
  login
}
