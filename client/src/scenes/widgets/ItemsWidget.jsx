import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import styles from "../../style";
import { useState } from "react";
import ItemWidget from "./ItemWidget";

const ItemsWidget = ({ items }) => {
  const [expand, setExpand] = useState(items.length > 4 ? true : false);
  const [showingItems, setShowingItems] = useState(items.length > 4 ? items.slice(0, 4) : []);  

  return (
    <div className={`${styles.itemsWidget}`}>
      <div className="pt-6">
        <p className={`${styles.postTitle} text-[23px] text-center pb-8`}>
          Featured items
        </p>
      </div>

      <div className="grid gap-x-2 grid-cols-4 justify-items-center pb-2">
        {expand
          ? showingItems.map(({ id, img }) => (
              <ItemWidget id={id} image={img}/>
            ))
          : items.map(({ id, img }) => (
            <ItemWidget id={id} image={img}/>
            ))}
      </div>
      {expand && showingItems.length>1 && <div onClick={() => setExpand(!expand)} className="flex justify-center cursor-pointer pb-2"><ExpandMoreRoundedIcon sx={{ fontSize: 45}}/></div>}
      {!expand && showingItems.length>1 && <div onClick={() => setExpand(!expand)} className="flex justify-center cursor-pointer pb-2"><ExpandLessRoundedIcon sx={{ fontSize: 45}}/></div>}
    </div>
  );
};

export default ItemsWidget;
