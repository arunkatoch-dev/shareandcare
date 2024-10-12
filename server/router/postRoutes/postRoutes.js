const express = require("express");
const addPost = require("../../controller/posts/addPost");
const postRouter = express.Router();

postRouter.post("/post", addPost)

module.exports = postRouter;
