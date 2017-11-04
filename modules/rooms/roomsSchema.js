const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const roomsSchema = new Schema({
  name : {
     type : String
  },
  type : {
     type : String,
  },
  address : {
     type : String
  },
  street : {
     type : String
  },
  district : {
     type : String
  },
  city: {
    type: String
  },
  price : {
     type : Number
  },
  phoneNumber : {
     type : String
  },
  area: {
    type: Number
  },
  description: {
    type: String
  },
  images: {
    type: [String]
  },
  owner: {
    type: ObjectId,
    ref: 'rooms'
  },
  typeOfRoom: {
    type: [String]
  },
  touristPlaces: {
    type: [String]
  }
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );

roomsSchema.index({address: 'text', district: 'text', street: 'text', city: 'text'});
module.exports = roomsSchema;
