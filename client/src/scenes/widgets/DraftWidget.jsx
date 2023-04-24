import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import styles from "../../style";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { setDraftItems } from "../../state";
import { useNavigate } from "react-router";
import PublishWidget from "./PublishWidget";
import Modal from '@mui/material/Modal';


const DraftWidget = ({draftId}) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const getDraft = async () => {
    const response = await fetch(`http://localhost:3001/canvases/${draftId}/canvas`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json(); 
    if(data) {
      setDraft(data);
      dispatch(
        setDraftItems( { draftItems: data.items })
      );
    }
  };

  const deleteDraft = async () => {
    const response = await fetch(`http://localhost:3001/canvases/${draftId}/delete`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(
      setDraftItems( { draftItems: null })
    );
    window.location.reload(false);
  };

  useEffect(() => {
    getDraft();
  }, []);

  if (!draft) {
    return null;
  }

  const { snapshot, items } = draft;

  return (
    <div className={`${styles.draftWidget}`}>
      <div className="flex flex-row justify-center">
      <img
                className={ `${styles.draftPicture}` }
                alt="draft"
                src={`${snapshot}`}
      />
      </div>
      <div className="flex flex-row justify-between">
        <IconButton onClick={() => navigate(`/create/${draftId}`)} >
          <ModeEditRoundedIcon />
        </IconButton>  
        <button onClick={handleOpenModal} className={`p-2 justify-self-start hover:underline`}>
          <p className={`${styles.paragraph1}`}>Publish</p>
        </button>
        <IconButton onClick={deleteDraft} >
          <DeleteRoundedIcon />
        </IconButton>      
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
          <PublishWidget handleClose={handleCloseModal} canvas={snapshot} items={items} fromDraft={draftId}/>
      </Modal>
    </div>
  );
};

export default DraftWidget;
