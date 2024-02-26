import mongoose from "mongoose";

const Schema = mongoose.Schema;

// article schema
const articleSchema = new Schema({
    title: String,
    image: String, 
    description: String,
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
