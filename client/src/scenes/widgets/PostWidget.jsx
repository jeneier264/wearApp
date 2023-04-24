import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { IconButton } from "@mui/material";
import { Following } from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setAddRemoveFavourites } from "../../state";
import styles from "../../style";

const PostWidget = ({
  postId,
  postUserId,
  name,
  title,
  description,
  canvasPicture,
  userProfilePicture,
  likes,
  isProfile,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const { favourites } = useSelector((state) => state.user);
  const favouriteIds = favourites.length > 0 ? favourites
    .filter((el) => el.type === "post")
    .map((el) => el.id) : [];
  const likeCount = Object.keys(likes).length;
  const [isCurrentUser, setIsCurrentUser] = useState(
    postUserId === loggedInUserId ? true : false
  );

  const patchLike = async () => {
    const likedPost = await fetch(
      `http://localhost:3001/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );

    const addedToFavs = await fetch(
      `http://localhost:3001/users/${loggedInUserId}/${postId}/post`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const addedPost = await addedToFavs.json();
    dispatch(setAddRemoveFavourites({ favourites: addedPost }));
    const updatedPost = await likedPost.json();
    dispatch(setPost({ post: updatedPost }));
    
  };

  const deletePost = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/delete`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    window.location.reload(false);
  };

  return (
    <div className={`${styles.postWidget}`}>
      {!isProfile && (
        <div>
          <Following
            followingId={postUserId}
            name={name}
            userProfilePicture={userProfilePicture}
          />
        </div>
      )}
      <div className="flex flex-row justify-center">
        <p className={`${styles.postTitle} text-[17px]`}>{title}</p>
      </div>
      <div className="flex flex-row justify-center">
        <img
          width="100%"
          height="auto"
          alt="post"
          className="cursor-pointer"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${canvasPicture}`}
          onClick={() => navigate(`/post/${postId}`)}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <IconButton onClick={patchLike}>
            {favouriteIds.includes(postId) ? (
              <FavoriteOutlined color="disabled" />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <p className={`${styles.number}`}>{likeCount}</p>
        </div>

        {isCurrentUser && (
          <div className="flex flex-row">
            <IconButton onClick={deletePost}>
              <DeleteRoundedIcon />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostWidget;
