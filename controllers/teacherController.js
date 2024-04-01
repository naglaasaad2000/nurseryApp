const bcrypt = require("bcrypt") // for teacher pass
const path = require("path");
const upload = require("./../MiddleWares/multerConfig");
// import schema from model
const Teachers = require("./../models/teacherSchema");

exports.getAllTeachers = async (req, res, next) => {
  try {
    const data = await Teachers.find({});
    if (!data) {
      throw new Error("No teachers found");
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};

exports.addTeacher = async (req, res, next) =>
{
  req.body.image=req.file.filename
  try {
    const newTeacher = new Teachers(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    newTeacher.password=hashedPassword
    const insertedTeacher = await newTeacher.save();
    res.status(201).json({ data: insertedTeacher });
  } catch (error) {
    next(error);
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    const { fullname, password, email } = req.body;

    let updateFailds = {};
    if (req.file && req.file.filename) {
      this.updateFailds.image = req.file.filename;
    }
    // check first what user sended
    if (fullname) updateFailds.fullname = fullname;
    if (password) updateFailds.password = password;
    if (email) updateFailds.email = email;

    const updatedTeacher = await Teachers.findByIdAndUpdate(
      req.body.id,
      updateFailds
    );

    if (!updatedTeacher) {
      console.log(req.body);
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.status(200).json({ data: updatedTeacher });
  } catch (error) {
    next(error);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    const deletedTeacher = await Teachers.findByIdAndDelete(req.body.id);
    if (!deletedTeacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res
      .status(200)
      .json({ message: "Delete Successfuly", data: deletedTeacher });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { id, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the teacher's password
    await Teachers.findByIdAndUpdate(id, { password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};

exports.findTeacherById = async (req, res, next) => {
  try {
    const data = await Teachers.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Sorry can't find it!" });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    next(error);
  }
};
