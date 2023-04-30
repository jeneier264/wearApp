import express from 'express';
import { getUser, 
    getFollowings, 
    getFollowers,
    addRemoveFavourites,
    addRemoveUploads,
    deleteUser,
    follow, unfollow} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* read */
router.get('/:id', verifyToken, getUser);
router.get("/:id/followings", verifyToken, getFollowings);
router.get("/:id/followers", verifyToken, getFollowers);

/* update */
router.put('/:userId/:id/follow', verifyToken, follow);
router.put('/:userId/:id/unfollow', verifyToken, unfollow);
router.patch('/:id/:favouriteId/:favouriteType', verifyToken, addRemoveFavourites);
router.patch('/:id/upload', verifyToken, addRemoveUploads);

/* delete */
router.delete('/:id/delete', verifyToken, deleteUser);

export default router;