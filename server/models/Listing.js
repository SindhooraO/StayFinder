const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: Number,
  maxGuests: Number,
  images: [String], 
  description: String
});

module.exports = mongoose.model('Listing', ListingSchema);
