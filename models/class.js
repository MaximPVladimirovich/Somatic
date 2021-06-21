const mongoose = require(`mongoose`);
const Studio = require("./studio");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: String,
  dancetype: String,
  description: String,
  price: Number,
  length: Number,
  instructor_name: String,
  img: String,
  time: Date,
  spots_left: Number,
  room: String,
  created_by:
  {
    type: Schema.Types.ObjectId,
    ref: "Studio"
  }

})

const Class = mongoose.model(`Class`, classSchema);
module.exports = Class;

