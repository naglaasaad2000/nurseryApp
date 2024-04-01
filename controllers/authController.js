const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("./../models/teacherSchema");
require("dotenv").config()

exports.login = async (req, res, next) => {
  try {
     
    user = await Teacher.findOne({ fullname:req.body.fullname });
    if (!user) {
     throw new Error("User isn't exist")
    }

     
      let token = jwt.sign(
        {
          _id:user._id,
          fullname: user.fullname,
          role: user.role
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    
  } catch (error) {
    next(error);
  }
};
