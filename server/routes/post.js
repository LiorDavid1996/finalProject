const express = require("express");
const { createPost,getAllPosts } = require("../controllers/Post");
const { authUser } = require("../middlwares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPost",getAllPosts );


module.exports = router;