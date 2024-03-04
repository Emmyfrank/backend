

import mongoose from "mongoose";
import { Roles } from "../helpers/types";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [Roles.user, Roles.admin],
    default: Roles.user,
  },
});
const User = mongoose.model("User", userSchema);
export default User;