const mongoose = require('mongoose');
const roomsSchema = require('./roomsSchema');

let roomsModel = mongoose.model('rooms', roomsSchema);

const createRoom = (room, callback) => {
  roomsModel.create(room, (err, doc) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, doc);
    }
  })
};

module.exports = {
  createRoom
}
