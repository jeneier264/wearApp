import User from "../models/User.js";
import Post from "../models/Post.js";
import Canvas from "../models/Canvas.js";


/* read */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getFollowings = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followings = await Promise.all(
      user.followings.map((id) => User.findById(id))
    );
    const formattedFollowings = followings.map(
      ({ _id, userName, profilePicture, bio }) => {
        return { _id, userName, profilePicture, bio };
      }
    );
    res.status(200).json(formattedFollowings);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const followers = await Promise.all(
      user.followers.map((id) => User.findById(id))
    );
    const formattedFollowers = followers.map(
      ({ _id, userName, profilePicture, bio }) => {
        return { _id, userName, profilePicture, bio };
      }
    );
    res.status(200).json(formattedFollowers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* update */
export const addRemoveFavourites = async (req, res) => {
  try {
    const { id, favouriteId, favouriteType } = req.params;
    const user = await User.findById(id);
    const favouriteIds = user.favourites
    .filter((el) => el.type === favouriteType)
    .map((el) => el.id);
    // if already at favourites, remove, otherwise add
    if (favouriteIds.includes(favouriteId)) {
      user.favourites = user.favourites.filter(function(obj) { return obj.id !== favouriteId});
    } else {
      user.favourites.push({ id: favouriteId, type: favouriteType });
    }
    await user.save();
   
    const formattedFavourites = user.favourites.map(
      ({ id, type }) => {
        return { id, type };
      }
    );
    res.status(200).json(formattedFavourites);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const follow = async (req, res) => {
  const { id, userId } = req.params; // id - user to follow, userId - current user
  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (!user.followers.includes(userId)) {
        await user.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
};

export const unfollow = async (req, res) => {
  const { id, userId } = req.params; // id - user to follow, userId - current user
  if (userId !== id) {
    try {
      const user = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (user.followers.includes(userId)) {
        await user.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("You dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
};

/* delete */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.deleteMany({userId: id});
    await Canvas.deleteMany({userId: id});
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};