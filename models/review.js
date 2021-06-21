const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  title: String,
  body: String,
  rating: Number,
  date: new Date()
})

const Review = mongoose.model(`Review`, reviewSchema);
module.exports = Review;

