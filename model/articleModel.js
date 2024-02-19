const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  emage: String,
  discription: String,
});

module.exports = mongoose.model("Article", articleSchema);