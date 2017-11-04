const mongoose = require('mongoose');
const roomsSchema = require('./roomsSchema');

let roomsModel = mongoose.model('rooms', roomsSchema);

var typeOfSearch = function(key){
    var s = "ueoaiy";
    for(var i = 0; i < s.length; i++){
        if(key.indexOf(s[i]) !== -1){
            return "fulltext";
        }
    }
    return "regex";
}

var options = {};
function setOption(key){
  if (key === undefined) return;
  if (key !== 'undefined'){
      if(typeOfSearch(key) === 'regex'){
          options = { $or:[{'touristPlaces': { "$regex": key, "$options": "i" }}] };
      }
      else{
          options = {$text: {$search: key}};

      }
  }
}
var getRoomsOnPage = function (req, res) {
        var page = req.query.page || 1;
        var key = req.query.key;
        var sort = req.query.sort || 1;
        // var options = {};
        setOption(key);
        roomsModel.find(options)
            .populate('rooms')
            .sort({price: sort, created_at: -1})
            .skip((page - 1) * 10)
            .limit(10)
            // .select('_id	name	address	street	district	price	type	area	description	images	phoneNumber	status	owner	numOfBedrooms	numOfBathRooms	bathRoomInRoom createdAt updatedAt')
            .exec(function (err, room) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: room
                    });
                }
            });
}
var getNumberOfRooms = function (req, res) {
        var options = {}
        var key = req.query.key;
        setOption(key);
        roomsModel.count(options)
            .exec(function (err, c) {
                if (err) {
                    res.json({ code: 1, error: err });
                } else {
                    res.json({
                        code: 1,
                        result: c
                    });
                }
            });
    }
var addRoom = function(req, res) {
          var room = new roomsModel({
            name : req.body.name,
            type : req.body.type,
            address : req.body.address,
            street : req.body.street,
            district : req.body.district,
            city: req.body.city,
            price : req.body.price,
            phoneNumber : req.body.phoneNumber,
            area: req.body.area,
            description: req.body.description,
            images: req.body.images,
            owner: req.body.owner,
            typeOfRoom: req.body.typeOfRoom,
            touristPlaces: req.body.touristPlaces
          });
          room.save(function (err) {
              if (err) res.json({code: 0, error: err});
              else {
                  res.json({code: 1, result: room});
              }
          });
      }
var editRoom = function () {

}

const getRoomById = (id, callback) => {
  roomsModel.findOne({'_id' : id}, (err, doc)=> {
    if(err) {
      res.send(err);
    } else{
      callback(null, doc);
    }
  });
};

module.exports = {
  addRoom,
  editRoom,
  getRoomsOnPage,
  getNumberOfRooms,
  getRoomById
}
