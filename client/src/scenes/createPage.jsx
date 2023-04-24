import React from "react";
import styles from "../style";
import { Navbar, FileUploader, Canvas } from "../components";
import { categories, collections, itemSamples } from "../constants";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { setAddRemoveFavourites } from "../state";
import {
  FavoriteBorderOutlined,
  FavoriteOutlined,
  AddCircleOutlineRounded,
  CloudUploadOutlined,
} from "@mui/icons-material";

const CreatePage = ({ isDraft = false, isItem = false }) => {
  let emptyArray = [];
  const [itemList, setItemList] = useState(itemSamples);
  const draftItems = useSelector((state) => state.draftItems);
  const itemForCanvas = isItem && useSelector((state) => state.itemForCanvas);
  const itemObj = isItem && formItemObject(itemForCanvas);
  const dispatch = useDispatch();
  const [isMainShown, setIsMainShown] = useState(true);
  const [favouriteSection, setFavouriteSection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [ItemsForCanvasArray, setItemsForCanvasArray] = useState(emptyArray);
  const [isHovering, setIsHovering] = useState(-1);
  const { draftId } = useParams();
  const { _id, favourites } = useSelector((state) => state.user);
  const isFavourite = favourites
    .filter((el) => el.type === "item")
    .map((el) => el.id);
  const token = useSelector((state) => state.token);

  const handleMouseOver = (i) => {
    setIsHovering(i);
  };

  const handleMouseOut = () => {
    setIsHovering(-1);
  };

  function handleClickCategory(event) {
    setSelectedCategory(event.currentTarget.value);
    setIsMainShown((current) => !current);
  }

  function getFilteredList() {
    if (!selectedCategory) {
      return itemList;
    }
    return itemList.filter((item) => item.category === selectedCategory);
  }

  var filteredList = useMemo(getFilteredList, [selectedCategory, itemList]);

  const handleAddToFavourites = async (itemId) => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${itemId}/item`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setAddRemoveFavourites({ favourites: data }));
  };

  function formItemObject(itemId) {
    var imgOrigin = new Image();
    imgOrigin.src = itemList.find((el) => el.id == itemId).image;
    var originalIndex = itemList.find((el) => el.id == itemId).id;
    var imgWidth = imgOrigin.naturalWidth * 0.25;
    var imgHeight = imgOrigin.naturalHeight * 0.25;
    var Item = {
      id: originalIndex,
      x: 120,
      y: 80,
      scaleX: 1,
      width: imgWidth,
      height: imgHeight,
      img: imgOrigin.src,
    };
    return Item;
  }

  function handleClickItem(event) {
    setIsItemSelected(true);
    setItemsForCanvasArray([
      ...ItemsForCanvasArray,
      formItemObject(event.currentTarget.value),
    ]);
  }

  useEffect(() => {
    if (isItem) {
      setIsItemSelected(true);
      setItemsForCanvasArray([itemObj]);
    } else if (isDraft) {
      setIsItemSelected(true);
      setItemsForCanvasArray(draftItems);
    }
  }, []);
  return (
    <div className="bg-primary w-full overflow-hidden p-0">
      <div className={`${styles.boxWidth}`}>
        <Navbar isCreatePage />
      </div>

      <div className="flex justify-evenly pb-3 md:flex-row flex-col">
        {isItemSelected ? (
          <Canvas
            height={413}
            width={690}
            items={ItemsForCanvasArray}
            isItemSelected={setIsItemSelected}
            setItems={setItemsForCanvasArray}
            draftId={draftId} 
          />
        ) : (
          <div
            className={`flex-col ${styles.canavsSection1} ${styles.flexCenter} justify-between`}
          >
            <div className="flex-row justify-between"></div>
            <div className="flex-row w-[690px]">
              <p className={`${styles.paragraph1}`}>add items...</p>
            </div>
            <div className="flex-row justify-between"></div>
          </div>
        )}

        <div
          className={`flex-col ${styles.canavsSection2} ${styles.flexCenter} justify-between`}
        >
          {isMainShown && !favouriteSection && (
            <div>
              <div className="flex-row ">
                <p className={`${styles.paragraph1} p-2`}>Categories</p>
              </div>
              <div className="grid gap-x-12 gap-y-4 grid-cols-3 grid-rows-2 justify-items-center">
                {categories.map((category, index) => (
                  <div className="flex-col ">
                    <button
                      value={category.id}
                      onClick={handleClickCategory}
                      className={`${styles.categoryHover}`}
                    >
                      <img
                        key={category.id}
                        src={category.image}
                        alt={category.id}
                        className={`h-[55px] object-contain cursor-pointer`}
                      />
                    </button>
                    <p className={`${styles.paragraph1}`}>{category.id}</p>
                  </div>
                ))}
              </div>
              <hr className="flex my-4 mx-auto h-[0.5px] w-3/4 p-0 border-1 border-black" />
              <div className="flex flex-row justify-between ">
                <FileUploader />
                <div className="flex flex-col justify-between pr-3 cursor-pointer items-center">
                  <CloudUploadOutlined sx={{ fontSize: 30 }} />
                  <p className={`${styles.paragraph3}`}>My uploads</p>
                </div>
                <button
                  onClick={() => setFavouriteSection(!favouriteSection)}
                  className="flex flex-col justify-between cursor-pointer items-center"
                >
                  <FavoriteBorderOutlined sx={{ fontSize: 30 }} />
                  <p className={`${styles.paragraph3}`}>My likes</p>
                </button>
              </div>
              <hr className="flex my-4 mx-auto h-[0.5px] w-3/4 p-0 border-1 border-black" />
              <div className="flex-row ">
                <p className={`${styles.paragraph1} p-2`}>Collections</p>
              </div>
              <div className="grid gap-8 grid-cols-3 justify-items-center">
                {collections.map((collection, index) => (
                  <div className="flex-col ">
                    <button
                      value={collection.id}
                      className={`${styles.categoryHover}`}
                    >
                      <img
                        key={collection.id}
                        src={collection.image}
                        alt={collection.id}
                        className={`h-[55px] object-contain cursor-pointer`}
                      />
                    </button>
                    <p className={`${styles.paragraph1}`}>{collection.id}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!isMainShown && !favouriteSection && (
            <div>
              <div className="sticky top-0  h-6 bg-white bg-opacity-50 flex flex-row justify-center">
                <button
                  value={null}
                  onClick={handleClickCategory}
                  className={`p-2 justify-self-start hover:underline`}
                >
                  <p className={`${styles.paragraph1}`}>Go back</p>
                </button>
              </div>
              <div className="pb-10 pt-4 grid gap-4 grid-cols-3 justify-between">
                {filteredList.map((item, index) => (
                  <div
                    className="container h-[70px] p-3 m-3"
                    onMouseOver={() => handleMouseOver(index)}
                    onMouseOut={handleMouseOut}
                  >
                    <div className="flex justify-center">
                      <button value={item.id} onClick={handleClickItem}>
                        <img
                          key={item.id}
                          src={item.image}
                          alt={item.id}
                          className={`cursor-pointer object-center h-[70px]`}
                        ></img>
                      </button>
                    </div>
                    {isHovering === index ? (
                      <div className="flex justify-between">
                        <button value={item.id} onClick={handleClickItem}>
                          <AddCircleOutlineRounded sx={{ fontSize: 25 }} />
                        </button>
                        <button onClick={() => handleAddToFavourites(item.id)}>
                          {isFavourite.includes(String(item.id)) ? (
                            <FavoriteOutlined sx={{ fontSize: 25 }} />
                          ) : (
                            <FavoriteBorderOutlined sx={{ fontSize: 25 }} />
                          )}
                        </button>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          )}
          {favouriteSection && (
            <div>
              <div className="sticky top-0  h-6 bg-white bg-opacity-50 flex flex-row justify-center">
                <button
                  value={null}
                  onClick={() => setFavouriteSection(!favouriteSection)}
                  className={`p-2 justify-self-start hover:underline`}
                >
                  <p className={`${styles.paragraph1}`}>Go back</p>
                </button>
              </div>
              <div className="p-6 grid gap-x-7 gap-y-4 grid-cols-3 justify-between">
                {itemList.map(
                  (item, index) =>
                    isFavourite.includes(String(item.id)) && (
                      <div
                        className="container h-[70px] w-[140px] p-3 m-3"
                        onMouseOver={() => handleMouseOver(index)}
                        onMouseOut={handleMouseOut}
                      >
                        <div className="flex justify-center">
                          <button value={item.id} onClick={handleClickItem}>
                            <img
                              key={item.id}
                              src={item.image}
                              alt={item.id}
                              className={`cursor-pointer object-center h-[70px]`}
                            ></img>
                          </button>
                        </div>
                        {isHovering === index ? (
                          <div className="flex justify-between">
                            <button value={item.id} onClick={handleClickItem}>
                              <AddCircleOutlineRounded sx={{ fontSize: 25 }} />
                            </button>
                            <button
                              onClick={() => handleAddToFavourites(item.id)}
                            >
                              <FavoriteOutlined sx={{ fontSize: 25 }} />
                            </button>
                          </div>
                        ) : null}
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
