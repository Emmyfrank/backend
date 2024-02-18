// const mongoose = require("mongoose");
// const commentSchema = new mongoose.Schema({

//     name: string,
//     comment: string,
// });
// module.exports = mongoose.model("Comment", commentSchema);



const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: String,
    comment: String
});

module.exports = mongoose.model("Comment", commentSchema);
