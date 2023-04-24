import React, { Fragment, useRef, useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import PropTypes from "prop-types";
import flip from "../assets/flip-svgrepo-com.svg";
import up from "../assets/arrow-up-outline.svg";
import down from "../assets/arrow-down-outline.svg";
import duplicate from "../assets/copy-outline.svg";
import close from "../assets/close-circle-outline.svg";
import back from "../assets/arrow-back-outline.svg";
import forward from "../assets/arrow-forward-outline.svg";
import download from "../assets/download-outline.svg";
import styles from "../style";
import { useDispatch, useSelector } from "react-redux";
import { setCanvas, setCanvases } from "../state";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MyImage from "./MyImage";
import PublishWidget from "../scenes/widgets/PublishWidget";
import Modal from "@mui/material/Modal";

const Canvas = ({
  height,
  width,
  items,
  isItemSelected,
  setItems,
  draftId,
}) => {
  const dispatch = useDispatch();
  const [selectedId, selectShape] = useState(null);
  const stageRef = useRef(null);
  const { _id } = useSelector((state) => state.user);
  const [success, setSucces] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [flipped, setFlip] = useState(false); // for render once item is flipped
  const [history, setHistory] = useState([[items[0]]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [state, setState] = useState({ position: [history[0]] });

  // pop-up notification about successful saving draft
  const closeNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSucces(false);
  };
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={closeNotification}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  const handleSaveDraft = async () => {
    // create image of current canvas and upload to cloudinary
    var imgUrl = "";
    const cloudData = new FormData();
    var uri = stageRef.current.toDataURL();
    cloudData.append("file", uri);
    cloudData.append("upload_preset", "wearapp");
    cloudData.append("cloud_name", "dpclhozin");
    await fetch(" https://api.cloudinary.com/v1_1/dpclhozin/image/upload", {
      method: "post",
      body: cloudData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        imgUrl = data.url;
      })
      .catch((err) => console.log(err));

    if (draftId) {
      var response = await fetch(
        `http://localhost:3001/canvases/${draftId}/patch`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            items: items,
            snapshot: imgUrl,
            isPost: false,
          }),
        }
      );
      const updatedDraft = await response.json();
      dispatch(setCanvas({ canvas: updatedDraft }));
    } else {
      var response = await fetch(`http://localhost:3001/canvases`, {
        method: "POST",
        body: JSON.stringify({
          userId: _id,
          items: items,
          snapshot: imgUrl,
          isPost: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const canvases = await response.json();
      dispatch(setCanvases({ canvases }));
    }

    setSucces(true);
  };

  const deselectShape = () => {
    selectShape(null);
  };

  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  const handleExport = () => {
    deselectShape();
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, "stage.png");
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  function handleClickDelete() {
    if (selectedId != null) {
      items.splice(selectedId, 1);
      selectShape(null);
      if (items.length == 0) {
        isItemSelected(false);
      }
    }
  }

  function handleClickForward() {
    if (selectedId != null && selectedId != items.length - 1) {
      [items[selectedId], items[selectedId + 1]] = [
        items[selectedId + 1],
        items[selectedId],
      ];
      selectShape(selectedId + 1);
    }
  }

  function handleClickBack() {
    if (selectedId != null && selectedId != 0) {
      [items[selectedId - 1], items[selectedId]] = [
        items[selectedId],
        items[selectedId - 1],
      ];
      selectShape(selectedId - 1);
    }
  }

  function handleClickFlip() {
    if (selectedId != null) {
      items[selectedId].scaleX = -items[selectedId].scaleX;
      setFlip(!flipped);
    }
  }

  function handleClickDuplicate() {
    if (selectedId != null) {
      items.push(items[selectedId]);
      selectShape(items.length - 1);
    }
  }

  const [btnPressed, setBtnPressed] = useState(false);

  function handleClickUndo() {
    if (historyStep === 0) {
      return;
    }
    if (historyStep === 1) {
      setHistoryStep(historyStep - 1);
      const previous = [history[historyStep - 1]];
      setState({ position: previous });
    } else {
      setHistoryStep(historyStep - 1);
      const previous = history[historyStep - 1];
      setState({ position: previous });
    }
    setBtnPressed(true);
  }

  function handleClickRedo() {
    if (historyStep === history.length - 1) {
      return;
    }
    setHistoryStep(historyStep + 1);
    const next = history[historyStep + 1];
    setState({ position: next });
    setBtnPressed(true);
  }

  useEffect(() => {
    if (items.length > 1) {
      setHistory([...history, [items]]);
      setHistoryStep((current) => current + 1);
      setState({ position: [items] });
    }
  }, [items.length]);

  useEffect(() => {
    if (btnPressed === true) {
      setItems(state.position[0]);
      setBtnPressed(false);
    }
  }, [btnPressed]);

  return (
    <div
      className={`flex-col ${styles.canavsSection1} ${styles.flexCenter} justify-between`}
    >
      <div className="flex-row justify-between">
        <button title="flip" onClick={handleClickFlip} className="px-2 pb-0 pt-2">
          <img src={flip} alt="flip" className="w-[23px] h-[23px]" />
        </button>
        <button title="move forward" onClick={handleClickForward} className="px-2 pb-0 pt-2">
          <img src={up} alt="forward" className="w-[23px] h-[23px]" />
        </button>
        <button title="move back" onClick={handleClickBack} className="px-2 pb-0 pt-2">
          <img src={down} alt="back" className="w-[23px] h-[23px]" />
        </button>
        <button title="duplicate" onClick={handleClickDuplicate} className="px-2 pb-0 pt-2">
          <img src={duplicate} alt="duplicate" className="w-[23px] h-[23px]" />
        </button>
        <button title="move delete" onClick={handleClickDelete} className="px-2 pb-0 pt-2">
          <img src={close} alt="close" className="w-[23px] h-[23px]" />
        </button>
        <button title="download" onClick={handleExport} className="px-2 pb-0 pt-2">
          <img src={download} alt="download" className="w-[23px] h-[23px]" />
        </button>
      </div>
      <div className="flex-row w-[690px]">
        <Stage
          ref={stageRef}
          width={width}
          height={height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {items.map((item, i) => {
              return (
                <MyImage
                  imageSrc={item.img}
                  key={i}
                  shapeProps={item}
                  offsetX={item.width / 2}
                  isSelected={i === selectedId}
                  onSelect={() => {
                    selectShape(i);
                  }}
                  onChange={(newAttrs) => {
                    const itms = items.slice();
                    itms[i] = newAttrs;
                    setHistory([...history, [itms]]);
                    setHistoryStep((current) => current + 1);
                    setState({ position: [itms] });
                    setItems(itms);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>
      <div className="flex-row ">
        <button className={`p-2 justify-self-start hover:underline`}>
          <p onClick={handleSaveDraft} className={`${styles.paragraph1}`}>
            Save draft
          </p>
        </button>
        <button title="undo" onClick={handleClickUndo} className="px-2 pb-2 pt-0">
          <img src={back} alt="undo" className="w-[23px] h-[23px]" />
        </button>
        <button title="redo" onClick={handleClickRedo} className="px-2 pb-2 pt-0">
          <img src={forward} alt="redo" className="w-[23px] h-[23px]" />
        </button>
        <button
          onClick={handleOpenModal}
          className={`p-2 justify-self-start hover:underline`}
        >
          <p className={`${styles.paragraph1}`}>Publish</p>
        </button>
        <Snackbar
          open={success}
          autoHideDuration={5000}
          onClose={closeNotification}
          message="Draft has been saved!"
          action={action}
        />
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <PublishWidget
          handleClose={handleCloseModal}
          canvas={stageRef}
          items={items}
          fromDraft={null}
        />
      </Modal>
    </div>
  );
};

Canvas.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
};

export default Canvas;
