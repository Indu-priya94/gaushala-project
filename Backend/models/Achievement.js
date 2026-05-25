const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("Achievement", achievementSchema);