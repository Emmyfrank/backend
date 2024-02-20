const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// article schema
const articleSchema = new Schema({
    title: String,
    image: String, 
    description: String,
});

module.exports = mongoose.model("Article", articleSchema);


// const articleSchema = new mongoose.Schema({
//   title: String,
//   emage: String,
//   discription: String,
// });

// module.exports = mongoose.model("Article", articleSchema);
// >>>>>>> 1c5351904e79b44aacfc44b4358ba09dd4b60219
