import React from "react";
import styles from "../style";
import { Navbar, Footer } from "../components";
import PostsWidget from "./widgets/PostsWidget";
import { useSelector } from "react-redux";

const FeedPage = () => {
  const { _id } = useSelector((state) => state.user);

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.boxWidth} bg-white`}>
        <Navbar />
      </div>

      <div className={`bg-primary ${styles.flexStart} py-8`}>
        <div className={`flex flex-col justify-center`}>
          <PostsWidget userId={_id} />
        </div>
      </div>

      <div className={`${styles.boxWidth} bg-white`}>
        <Footer />
      </div>
    </div>
  );
};

export default FeedPage;
