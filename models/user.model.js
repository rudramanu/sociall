const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: String }],
  friends: [{ type: String }],
  friendRequests: [{ type: String }],
});

const UserModel = mongoose.model("user", userSchema);
module.exports = { UserModel };
