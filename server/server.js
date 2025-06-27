const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/stayfinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Routes
const listingsRoute = require('./routes/listings');
const authRoute = require('./routes/auth');
const bookingsRoute = require('./routes/bookings');
app.use('/api/bookings', bookingsRoute);


app.use('/api/listings', listingsRoute); // Property listings route
app.use('/api/auth', authRoute);         // Login & Register routes

// ✅ Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
