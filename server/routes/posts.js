import express from "express";
import { getFeedPosts, getUserPosts, likePost, getPost, deletePost } from '../controllers/posts.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* read */
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.get('/:postId/post', verifyToken, getPost);

/* update */
router.patch('/:id/like', verifyToken, likePost);

/* delete */
router.delete('/:id/delete', verifyToken, deletePost);
export default router;

