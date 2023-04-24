import Canvas from '../models/Canvas.js';

/* create */
export const createCanvas = async (req, res) => {
    try {
        const {userId, items, snapshot, isPost}  = req.body;
        
        const newCanvas = new Canvas({
            userId: String(userId),
            items,
            snapshot: String(snapshot),
            isPost
        })
        await newCanvas.save(); 

        const canvas = await Canvas.find();
        res.status(201).json(canvas);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* read */
export const getUserDrafts = async (req, res) => {
    try {
        const { userId } = req.params;
        const canvas = await Canvas.find({ userId });
        res.status(200).json(canvas);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getDraftsItemsForEdit = async (req, res) => {
    try {
        const { id } = req.params;
        const draft = await Canvas.findById(id);
        res.status(200).json(draft);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* delete */
export const deleteDraft = async (req, res) => {
    try {
        const { id } = req.params;
        await Canvas.findByIdAndDelete(id);
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* update */
export const  updateDraft = async (req, res) => {
    try {
        const { id } = req.params;
        const { items, snapshot, isPost } = req.body;
        const updatedDraft = await Canvas.findByIdAndUpdate(
            id,
            { items: items, snapshot: snapshot, isPost: isPost },
            { new: true }
        );

        res.status(200).json(updatedDraft);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};