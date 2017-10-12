const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const roomsSchema = new Schema({
  name : { type : String},
  type : { type : Number},
  address : { type : String},
  price : { type : Number},
  numOfRooms : { type : String},
  status : { type : Number},
  area: {type: Number},
  des: {type: String},
  images: {type: String},
  owner_id: {type: String},
  numOfBedrooms: {type: Number},
  numOfBathrooms: {type: Number},
  numOfFloors: {type: Number},
  floor: {type: Number},
  bathroomInRoom: {type: Boolean}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );


module.exports = roomsSchema;
