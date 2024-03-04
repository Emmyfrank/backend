import mongoose from "mongoose";

const Schema = mongoose.Schema;

// article schema
const articleSchema = new Schema({
    title: String,
    image: String, 
    description: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
        }],  
    comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    }],
});

const Article = mongoose.model("Article", articleSchema);

export default Article;
