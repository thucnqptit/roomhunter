const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const roomsSchema = new Schema({
  name : {
     type : String
  },
  type : {
     type : Number
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
  price : {
     type : Number
  },
  phoneNumber : {
     type : String
  },
  status : {
     type : Number
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
  numOfBedrooms: {
    type: Number
  },
  numOfBathrooms: {
    type: Number
  },
  bathroomInRoom: {
    type: Boolean
  }
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_at' }} );

roomsSchema.index({address: 'text', district: 'text', street: 'text'});
module.exports = roomsSchema;
