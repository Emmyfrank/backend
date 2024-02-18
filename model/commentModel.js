const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({

    name: string,
    comment: string,
});
module.exports = mongoose.model("Comment", commentSchema);