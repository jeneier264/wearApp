import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import FollowButton from "./FollowButton";
import styles from "../style";

const Following = ({ followingId, name, userProfilePicture }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col justify-center">
        <UserImage onClick={() => navigate(`/profile/${followingId}`)}
          image={userProfilePicture}
        />
      </div>
      <div className="flex flex-col justify-center">
        <p onClick={() => {
            navigate(`/profile/${followingId}`);
            navigate(0);
          }}
          className={`${styles.logLabel} cursor-pointer`}
        >
          {name}
        </p>
      </div>
      <div className="flex flex-col justify-center">
        <FollowButton followingId={followingId} />
      </div>
    </div>
  );
};

export default Following;
