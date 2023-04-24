import mongoose from "mongoose";

const canvasSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            default: [],
        },
        snapshot: {
            type: String,
            default: "",
        },
}
);

const Canvas = mongoose.model("Canvas", canvasSchema);
export default Canvas;