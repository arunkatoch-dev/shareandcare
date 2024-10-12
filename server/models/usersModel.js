const mongoose = require("mongoose");

const usersModel = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
  },
});

const User = mongoose.model("USER", usersModel);
module.exports = User;
