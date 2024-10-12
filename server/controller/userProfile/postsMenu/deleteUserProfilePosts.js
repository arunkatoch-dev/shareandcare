const express = require("express");
const Post = require("../../../models/postsSchema");

const deleteUserProfilePosts = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.json({ msg: "failed", details: "post Id not found" });
    }
    const deletePost = await Post.findOneAndDelete({ _id });
    if (deletePost) {
      return res.json({
        msg: "success",
        details: "post deletion successfull.",
      });
    }
  } catch (err) {
    res.json({ msg: "error", err     });
  }
};

module.exports = deleteUserProfilePosts;
