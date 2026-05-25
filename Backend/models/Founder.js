const mongoose = require("mongoose");

const founderSchema = new mongoose.Schema({
  name: String,
  role: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("Founder", founderSchema);