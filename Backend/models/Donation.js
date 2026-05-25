const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  amount: String,
  purpose: String,
  status: {
    type: String,
    default: "Demo / Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", donationSchema);