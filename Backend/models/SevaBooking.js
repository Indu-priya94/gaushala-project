const mongoose = require("mongoose");

const sevaBookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  sevaName: String,
  date: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SevaBooking", sevaBookingSchema);