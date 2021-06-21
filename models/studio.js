const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const studioSchema = new Schema({
  name: String,
  phone: String,
  website: String,
  typesofdance: [],
  address: {
    street: String,
    zip: Number,
    city: String,
    state: String
  },
  description: String,
  img: String,
})

const Studio = mongoose.model(`Studio`, studioSchema);
module.exports = Studio;

