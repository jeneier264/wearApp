import express from "express";
import { getUserDrafts, getDraftsItemsForEdit, deleteDraft, updateDraft } from '../controllers/canvases.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* read */
router.get('/:userId/canvases', verifyToken, getUserDrafts);
router.get('/:id/canvas', verifyToken, getDraftsItemsForEdit); // change 'edit' into something else
router.delete('/:id/delete', verifyToken, deleteDraft);

/* update */
router.patch('/:id/patch', updateDraft);


export default router;

