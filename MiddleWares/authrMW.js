const jwt = require("jsonwebtoken");
require("dotenv").config()

module.exports = (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    console.log(token)
    const decoded = jwt.verify(token,  process.env.JWT_SECRET_KEY);
    console.log(decoded)
    req.decoded = decoded;
    next();
  } catch (error) {
    error.message = "Unauthorized";
    error.status = 403;
    next(error);
  }
};

module.exports.isAdmin = (req, res, next) => {
  console.log(req.decoded.role);
  if (req.decoded.role == "admin") {
    next();
  } else {
    let error = new Error("Not authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isTeacher = (req, res, next) => {
  if (req.token.role == "teacher") {
    next();
  } else {
    let error = new Error("Not authorized");
    error.status = 403;
    next(error);
  }
};
