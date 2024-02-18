

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {type:String,unique:true},
  username: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);