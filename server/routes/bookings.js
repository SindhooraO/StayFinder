// server/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

router.post('/', authenticate, async (req, res) => {
  const { listingId, checkIn, checkOut, guests } = req.body;

  try {
    // Step 1: Check if the user already booked same listing for same or overlapping dates
    const existing = await Booking.findOne({
      user: req.user._id,
      listing: listingId,
      $or: [
        { checkIn: { $lt: new Date(checkOut) }, checkOut: { $gt: new Date(checkIn) } }
      ]
    });

    if (existing) {
      return res.status(409).json({ error: "You've already reserved this listing for these dates." });
    }

    // Step 2: If no duplicate, create booking
    const booking = new Booking({
      user: req.user._id,
      listing: listingId,
      checkIn,
      checkOut,
      guests,
    });

    await booking.save();
    res.status(201).json({ message: "Booking successful", booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Booking failed" });
  }
});


module.exports = router;