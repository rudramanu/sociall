const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../models/user.model");
const { authenticate } = require("../middleware/authentication");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
userRouter.post("/register", (req, res) => {
  const { name, email, password, dob, bio } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, encrypted) => {
      if (err) {
        res.send({ message: err });
      } else {
        const user = new UserModel({
          name,
          email,
          password: encrypted,
          dob,
          bio,
        });
        await user.save();
        res.send({ message: "User Registered" });
      }
    });
  } catch (error) {
    res.send({ message: "Something went wrong while registering" });
  }
});
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    console.log(user);
    const hashed = user?.password;
    bcrypt.compare(password, hashed, (err, result) => {
      if (err) {
        res.send({ message: "Invalid credentials" });
      } else if (result) {
        const token = jwt.sign({ userID: user._id }, "secret");
        res.send({ message: "Logged in successfully", token });
      }
    });
  } catch (error) {
    res.send("Error", error);
  }
});
userRouter.get("/users", authenticate, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.send({ message: error });
  }
});
userRouter.get("/users/:id/friends", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    let friends = await UserModel.findOne({ _id: id });
    res.send("Friends", friends);
  } catch (error) {
    res.send("Getting error while fetching friends");
  }
});
userRouter.post("/users/:id/friends", authenticate, async (req, res) => {
  const id = req.params.id;
  try {
    let friend = await UserModel.findOne({ email: req.body.email });
    if (friend) {
      let user = await UserModel.findByIdAndUpdate(
        { _id: id },
        { $push: { friends: friend._id } }
      );
      if (user) {
        res.send("Added user to friends");
      }
    } else {
      res.send("Login first");
    }
  } catch (error) {
    res.send({ message: "Error while adding users to friend list" });
  }
});
module.exports = { userRouter };
