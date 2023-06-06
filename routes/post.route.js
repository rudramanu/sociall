const express = require("express");
const postRouter = express.Router();
const { PostModel } = require("../models/post.model");
const { UserModel } = require("../models/user.model");

postRouter.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
});
postRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const post = await PostModel(payload);
    await post.save();
    res.send("Created a post");
  } catch (error) {
    res.send("Getting error while creating a post");
  }
});
postRouter.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  const post = await PostModel.findOne({ _id: id });
  if (!post) {
    return res.send("Not found");
  }
  try {
    await PostModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Post updated");
  } catch (error) {
    res.send("Getting error while updating post");
  }
});
postRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await PostModel.findOne({ _id: id });
  if (!post) {
    return res.send("Not found");
  }
  try {
    await PostModel.findByIdAndRemove({ _id: id });
    res.send("Post Deleted");
  } catch (error) {
    res.send("Getting error while deleting post");
  }
});
postRouter.post("/:id/like", async (req, res) => {
  const id = req.params.id;
  try {
    let user = await UserModel.find({ email: req.body.email });
    if (user) {
      const post = await PostModel.findByIdAndUpdate(
        { _id: id },
        { $push: { likes: user._id } }
      );
      if (post) {
        res.send("Post liked");
      }
    } else {
      res.send({ message: "Login first" });
    }
  } catch (error) {
    res.send("Getting error");
  }
});
postRouter.post("/:id/comment", async (req, res) => {
  const id = req.params.id;
  try {
    let user = await UserModel.find({ email: req.body.email });
    if (user) {
      const post = await PostModel.findByIdAndUpdate(
        { _id: id },
        { $push: { comments: user._id } }
      );
      if (post) {
        res.send("comment added");
      }
    } else {
      res.send({ message: "Login first" });
    }
  } catch (error) {
    res.send("Getting error");
  }
});
postRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let user = await UserModel.find({ email: req.body.email });
    if (user) {
      const post = await PostModel.findOne({ _id: id });
      res.send(post);
    } else {
      res.send({ message: "Login first" });
    }
  } catch (error) {
    res.send("Getting error");
  }
});
module.exports = { postRouter };
