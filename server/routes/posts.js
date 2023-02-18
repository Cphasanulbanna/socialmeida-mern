//packages
import express from "express";
//imports
import { createPost, getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//CREATE
router.post("/", verifyToken, createPost);

//READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//UPDATE
router.put("/:id/like", verifyToken, likePost);

export default router;
