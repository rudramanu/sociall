const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "secret");
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else {
      res.send("Please login first");
    }
  } else {
    res.send("Please login first");
  }
};
module.exports = { authenticate };
