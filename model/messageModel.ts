import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Mess = mongoose.model("Message", messageSchema);

export default Mess;