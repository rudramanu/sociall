const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  user: String,
  text: String,
  image: String,
  createdAt: { type: Date, default: Date.now },
  likes: [{ type: String }],
  comments: [
    {
      user: { type: String },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const PostModel = mongoose.model("post", postSchema);
module.exports = { PostModel };
