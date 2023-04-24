import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";
import PostWidget from "./PostWidget";
import { NoContent } from "../../components";
import styles from "../../style";

// on feed page PostsWidget gonna grab all the posts from anybody
// on profile page PostsWidget grap only specific user's posts
const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [isTherePosts, setIsTherePosts] = useState(false);
  

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    
    dispatch(setPosts({ posts: data }));
    if(data.length !== 0) setIsTherePosts(true);
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    
    dispatch(setPosts({ posts: data }));

    if(data.length !== 0) setIsTherePosts(true);
  };

  // empty array in useEffect ==> so the it only calls once
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isTherePosts ? (
        <div className={posts.length === 1 ? `${styles.grid1}` : `${styles.grid2}`}>
          {posts.map(
            ({
              _id,
              userId,
              userName,
              title,
              description,
              canvasPicture,
              userProfilePicture,
              likes,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                name={`@${userName}`}
                title={title}
                description={description}
                canvasPicture={canvasPicture}
                userProfilePicture={userProfilePicture}
                likes={likes}
                isProfile={isProfile}
              />
            )
          )}
        </div>
      ) : (
        <div className={`grid grid-cols-1 gap-4 justify-center`}>
          <NoContent content="posts"/>
        </div>
      )}
    </>
  );
};

export default PostsWidget;
