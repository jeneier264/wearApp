import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navbar } from "../components";
import UserWidget from "./widgets/UserWidget";
import ItemsWidget from "./widgets/ItemsWidget";
import styles from "../style";

const PostPage = () => {
  const { postId } = useParams();
  const [currentPost, setCurrentPost] = useState(null);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  

  const getPost = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/post`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setCurrentPost(data);
  };

  useEffect(() => {
    getPost();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentPost) {
    return null;
  }

  const { userId, title, description, canvasPicture, items, likes } = currentPost;
  const isCurrentUser = userId === _id;

  return (
    <div className="bg-primary w-full h-full overflow-hidden p-0">
      <div className={`${styles.boxWidth} bg-white`}>
        <Navbar/>
      </div>
      <div className="flex flex-row justify-evenly py-8">
        <div className="flex flex-col">
          <div className="flex flex-row pb-4">
            <UserWidget
              userId={userId}
              isCurrentUser={isCurrentUser}
              postView
            />
          </div>
          <div className="flex flex-col w-[300px]">
            <p className={`${styles.postTitle} text-[28px] text-center`}>
              {title}
            </p>
            <p className={`${styles.postTitle} text-[15px]  text-center`}>
              {description}
            </p>
          </div>
        </div>
        <div className={`flex flex-col w-[650px] bg-white rounded-2xl`}>
          <img src={`${canvasPicture}`} alt="outfit" className="rounded-2xl" />
        </div>
      </div>
      <ItemsWidget items={items} />
    </div>
  );
};

export default PostPage;
