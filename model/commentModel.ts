import mongoose from "mongoose";

const Schema = mongoose.Schema;

// const commentSchema = new Schema({
//     name: String,
//     comment: String
// });

const commentSchema = new Schema({
    comment: {
      type: String,
      required: true,
    },
    article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },  { timestamps: true });
  
export const Comment = mongoose.model("Comment", commentSchema);

