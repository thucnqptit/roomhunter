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
function setOption(key){
  if (key === undefined) return;
  if (key !== 'undefined'){
      if(typeOfSearch(key) === 'regex'){
          options = { $or:[{'address': { "$regex": key, "$options": "i" }},{'street': { "$regex": key, "$options": "i" }},{'district': { "$regex": key, "$options": "i" }}] };
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
        var options = {};
        setOption(key);
        roomsModel.find(options)
            .populate('users')
            .sort({price: sort, created_at: -1})
            .skip((page - 1) * 20)
            .limit(20)
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
            price : req.body.price,
            phoneNumber : req.body.phoneNumber,
            status : req.body.status,
            area: req.body.area,
            description: req.body.description,
            images: req.body.images,
            owner: req.body.owner,
            numOfBedrooms: req.body.numOfBedrooms,
            numOfBathrooms: req.body.numOfBathrooms,
            bathroomInRoom: req.body.bathroomInRoom
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

var getRoom = function (req, res) {
        roomsModel.findOne({id: req.query.id})
            .populate('users')
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

module.exports = {
  addRoom,
  editRoom,
  getRoomsOnPage,
  getNumberOfRooms,
  getRoomById
}
