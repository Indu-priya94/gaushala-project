const mongoose = require("mongoose");

const cowSchema = new mongoose.Schema({
  name: String,
  dob: String,
  gender: String,
  breed: String,
  health: String,
  image: String,
});

module.exports = mongoose.model("Cow", cowSchema);