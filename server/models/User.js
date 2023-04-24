import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        bio: {
            type: String,
            min: 1,
            max: 100,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        followings: {
            type: Array,
            default: [],
        },
        followers: {
            type: Array,
            default: [],
        },
        favourites: {
            type: Array,
            default: [],
        }
    },
    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);
export default User;