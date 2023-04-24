import { UserImage, FollowButton } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { setLogout } from "../../state";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const UserWidget = ({ userId, isCurrentUser, postView = false }) => {
  const [user, setUser] = useState(null); // grabbing user from the backend
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const deleteUser = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/delete`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(setLogout());
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const { userName, bio, followings, followers, profilePicture } = user;

  return (
    <div
      className={postView ? `${styles.userWidgetPost}` : `${styles.userWidget}`}
    >
      <div className="flex flex-row pb-2 justify-between" >
        <div className="flex flex-col justify-center">
          <UserImage image={profilePicture} isProfile />
        </div>
        <div className="flex flex-col p-3">
          <div className="flex flex-row justify-between pb-3">
            <p onClick={() => navigate(`/profile/${userId}`)} className={`${styles.logLabel} cursor-pointer align-bottom`}>
              @{userName}
            </p>
            {isCurrentUser && !postView && (
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <SettingsRoundedIcon color="action" sx={{ fontSize: 22 }} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={() => dispatch(setLogout())}><p className={`${styles.paragraph1}`}>log out</p></MenuItem>
                  <MenuItem onClick={deleteUser}><p className={`${styles.paragraph1}`}>delete account</p></MenuItem>
                </Menu>
              </div>
            )}
            {!isCurrentUser && <FollowButton followingId={userId} />}
          </div>
          <div className="flex flex-row">
            <p className={`${styles.userInfo} mr-2`}>
              {followers.length} followers
            </p>
            <p className={`${styles.userInfo}`}>
              {followings.length} followings
            </p>
          </div>
          {!postView && (
            <div className="flex flex-row justify-center">
              <p className={`${styles.bio} p-2`}>{bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
