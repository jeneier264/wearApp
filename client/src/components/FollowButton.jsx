import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setFollow, setUnfollow } from "../state";
import { IconButton } from "@mui/material";


const FollowButton = ({ followingId }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const followings = useSelector((state) => state.user.followings);

  const [followed, setFollowed] = useState(followings.includes(followingId));

  const handleClick = async () => {
    try {
      if (followed) {
        await fetch(
          `http://localhost:3001/users/${_id}/${followingId}/unfollow`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setUnfollow({ userId: followingId }));
        setFollowed(!followed);
      } else {
        await fetch(
          `http://localhost:3001/users/${_id}/${followingId}/follow`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        dispatch(setFollow({ userId: followingId }));
        setFollowed(!followed);
      }
    } catch (err) {}
  };

  return (
    <IconButton onClick={handleClick}>
      {followed ? (
        <PersonRemoveRoundedIcon  sx={{ fontSize: 22 }} />
      ) : (
        <PersonAddRoundedIcon  sx={{ fontSize: 22 }} />
      )}
    </IconButton>
  );
};

export default FollowButton;
