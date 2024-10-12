const mongoose = require("mongoose");

const postsModel = new mongoose.Schema({
  post: {
    type: String,
    minlength: 100,
    trim: true,
    required: true,
  },
  postByUserId: { type: String, trim: true, required: true },
  postBy: {
    type: String,
  },
  postOn: {
    type: String,
  },
});

const Post = mongoose.model("POST", postsModel);
module.exports = Post;
