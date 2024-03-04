import mongoose from "mongoose";

const Schema = mongoose.Schema;

  const likeSchema = new Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    },
    { timestamps: true }
  );
  
const Like = mongoose.model("Like", likeSchema);

export default Like;

