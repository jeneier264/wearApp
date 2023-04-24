import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemSamples } from "../../constants";
import { NoContent } from "../../components";
import { setPosts } from "../../state";
import ItemWidget from "../widgets/ItemWidget";
import PostWidget from "./PostWidget";

const FavouritesWidget = () => {
  let emptyArray = [];
  const { favourites } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [isThereFavourites, setIsThereFavourites] = useState(
    favourites.length != 0 ? true : false
  );
  const [favouriteItems, setFavouriteItems] = useState(emptyArray);
  const [favouritePosts, setFavouritePosts] = useState(emptyArray);

  const getFavourites = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const posts = await response.json();

    let favouriteItems = [];
    let favouritePosts = [];
    favourites.map(async (favourite) => {
      if (favourite.type === "item") {
        var item = itemSamples.find((item) => item.id === Number(favourite.id));
        favouriteItems.push(item);
      }
    });
    favourites.map((favourite) => {
      if (favourite.type === "post") {
        favouritePosts.push(posts.find((post) => post._id === favourite.id));
      }
    });
    setFavouriteItems(favouriteItems);
    setFavouritePosts(favouritePosts);
  };

  useEffect(() => {
    getFavourites();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {isThereFavourites ? (
        <div className={`flex`}>
          <section><div className="grid grid-cols-3 gap-2">
            {favouriteItems.map((item) =>
              <ItemWidget id={item.id} image={item.image}/>
            )}
          </div></section>
          <section>
            <div className="grid grid-cols-1 gap-2 ">
          {favouritePosts.map(
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
                isProfile={false}
              />
            )
          )}
          </div>
          </section>
          
        </div>
      ) : (
        <div className={`grid grid-cols-1 gap-4 justify-center`}>
          <NoContent content="likes" />
        </div>
      )}
    </>
  );
};

export default FavouritesWidget;
