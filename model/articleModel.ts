import mongoose from "mongoose";

const Schema = mongoose.Schema;

// article schema
const articleSchema = new Schema({
    title: String,
    image: String, 
    description: String,
});

module.exports = mongoose.model("Article", articleSchema);
