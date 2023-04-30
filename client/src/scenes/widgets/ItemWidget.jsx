import {
  AddCircleOutlineRounded,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import styles from "../../style";
import { useSelector, useDispatch } from "react-redux";
import { setAddRemoveFavourites, setItemForCanvas } from "../../state";
import { useNavigate } from "react-router";
import { useState } from "react";
import { IconButton } from "@mui/material";

const ItemWidget = ({ id, image }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, favourites } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const favouriteIds = favourites.length > 0 ? favourites
    .filter((el) => el.type === "item")
    .map((el) => el.id) : [];

  const handleAddToFavourites = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${String(id)}/item`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setAddRemoveFavourites({ favourites: data }));
  };
  const handleAddToCanvas = () => {
    dispatch(setItemForCanvas({itemForCanvas: String(id)}));
    navigate('/create/item');
  };
  return (
    <div className={`${styles.itemContainer}`}>
      <div className="flex justify-center">
        <button value={id}>
          <img
            src={image}
            alt="item"
            className={`cursor-pointer object-center h-[140px]`}
          />
        </button>
      </div>
      <div className="flex justify-between">
        <IconButton onClick={handleAddToCanvas}>
          <AddCircleOutlineRounded />
        </IconButton>
        <IconButton onClick={handleAddToFavourites}>
          {favouriteIds.includes(String(id)) ? (
            <FavoriteOutlined sx={{ fontSize: 25 }} />
          ) : (
            <FavoriteBorderOutlined sx={{ fontSize: 25 }} />
          )}
        </IconButton>
      </div>
    </div>
  );
};

export default ItemWidget;
