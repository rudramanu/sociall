const express = require("express");
const { connection } = require("./configs/db");
const { authenticate } = require("./middleware/authentication");
const { userRouter } = require("./routes/user.route");
const { postRouter } = require("./routes/post.route");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/", userRouter);
app.use("/posts", postRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected with DB");
  } catch (error) {
    console.log("Getting error while connecting with DB");
  }
  console.log(`Running at port ${process.env.port}`);
});
