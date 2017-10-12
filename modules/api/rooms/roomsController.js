const express = require('express');
const Router = express.Router();
const roomsModel = require('./roomsModel');

Router.post('/', (req, res) => {
  let newRoom = {
    name : req.body.name,
    type : req.body.type,
    address : req.body.address,
    price : req.body.price,
    numOfRooms : req.body.numOfRooms,
    status : req.body.status,
    area: req.body.area,
    des: req.body.des,
    images: req.body.images,
    owner_id: req.body.owner_id,
    numOfBedrooms: req.body.numOfBedrooms,
    numOfBathrooms: req.body.numOfBathrooms,
    numOfFloors: req.body.numOfFloors,
    floor: req.body.floor,
    bathroomInRoom: req.body.bathroomInRoom
  };

  roomsModel.createRoom(newRoom, (err, doc) => {
    if (err) {
      res.send(err.errmsg);
    } else {
      res.send(doc);
    }
  });
});

Router.get('/', (req, res) => {


  roomsModel.getRoomsOnPage(page, key, (err, doc) => {
    if (err) {
      res.send(err.errmsg);
    } else {
      res.send(doc);
    }
  });
});

module.exports = Router;
