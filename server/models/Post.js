import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        title: String,
        description: String,
        canvasPicture: String,
        items: {
            type: Array,
            default: [],
        },
        isPost: Boolean,
        userProfilePicture: String,
        likes: {
            type: Map,
            of: Boolean,
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;