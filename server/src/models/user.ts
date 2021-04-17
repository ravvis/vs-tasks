// import {UsersCollection} from "../firebase";
import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  githubId: {
    type: String,
  },
});

// Export Bio Model
const User = mongoose.model("user", userSchema);
exports.get = function (callback: any, limit: any) {
  User.find(callback).limit(limit);
};
export default User;