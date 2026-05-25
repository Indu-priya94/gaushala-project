const mongoose = require("mongoose");

const cowServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("CowService", cowServiceSchema);