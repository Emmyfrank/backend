import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: String,
    comment: String
});

export const Comment = mongoose.model("Comment", commentSchema);

