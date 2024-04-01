const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  _id: {
    type:mongoose.Schema.Types.ObjectId,required:true
  },
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type:String,
    enum: ['teacher', 'admin'],
    default:'teacher'
  },
  email: { type: String },
  image: String,
});

module.exports = mongoose.model("teachers", Schema);
