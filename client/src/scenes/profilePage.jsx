import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "../components";
import styles from "../style";
import UserWidget from "./widgets/UserWidget";
import PostsWidget from "./widgets/PostsWidget";
import DraftsWidget from "./widgets/DraftsWidget";
import FavouritesWidget from "./widgets/FavouritesWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const [contentType, setContentType] = useState("posts");
  const isDrafts = contentType === "drafts";
  const isPosts = contentType === "posts";
  const isLikes = contentType === "likes";
  const [isCurrentUser, setIsCurrent] = useState(userId === _id);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div className="bg-primary w-full h-full overflow-hidden p-0">
      <div className={`${styles.boxWidth} bg-white`}>
        <Navbar/>
      </div>
      <div className={`${styles.flexCenter} flex-col pt-5`}>
        <UserWidget userId={userId} isCurrentUser={isCurrentUser} />
        <div className="flex flex-row ">
          {isCurrentUser && (
            <>
              <button
                onClick={() => setContentType("likes")}
                className={
                  isLikes
                    ? `${styles.slider2} pr-20`
                    : `${styles.slider1} pr-20`
                }
              >
                My Likes
              </button>
              <button
                onClick={() => setContentType("drafts")}
                className={
                  isDrafts
                    ? `${styles.slider2} pr-20`
                    : `${styles.slider1} pr-20`
                }
              >
                My Drafts
              </button>
            </>
          )}
          <button
            onClick={() => setContentType("posts")}
            className={isPosts ? `${styles.slider2}` : `${styles.slider1}`}
          >
            {isCurrentUser ? "My posts" : "Posts"}
          </button>
        </div>
      </div>
      <div className={`bg-primary ${styles.flexStart} pt-6`}>
        {isCurrentUser && isPosts && <PostsWidget userId={userId} isProfile />}
        {isCurrentUser && isDrafts && <DraftsWidget userId={userId} />}
        {isCurrentUser && isLikes && <FavouritesWidget />}
        {!isCurrentUser && <PostsWidget userId={userId} isProfile />}
      </div>
    </div>
  );
};

export default ProfilePage;
