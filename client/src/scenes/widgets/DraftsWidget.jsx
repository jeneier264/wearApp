import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCanvases } from "../../state";
import { NoContent } from "../../components";
import DraftWidget from "./DraftWidget";

const DraftsWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const canvases = useSelector((state) => state.canvases);
  const token = useSelector((state) => state.token);
  const [isThereDrafts, setIsThereDrafts] = useState(false);

  const getUserDrafts = async () => {
    const response = await fetch(
      `http://localhost:3001/canvases/${userId}/canvases`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setCanvases({ canvases: data }));
    if(data.length !== 0) setIsThereDrafts(true);
  };

  useEffect(() => {
    getUserDrafts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      { isThereDrafts ? (
        <div className={`grid grid-cols-3 gap-4 justify-center`}>
        {
          canvases.map(({ _id }) => (
            <DraftWidget draftId={_id}/>
          ))
        }
      </div>
      ) : (
        <div className={`grid grid-cols-1 gap-4 justify-center`}>
          <NoContent content="drafts" />
        </div>
      )
      }
    </>
  );
};

export default DraftsWidget;
