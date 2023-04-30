import React, {useRef, useState, Fragment} from 'react';
import upload from '../assets/cloud-upload-outline.svg'
import styles from '../style';
import { setAddRemoveUploads } from '../state';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const FileUploader = () => {
  const hiddenFileInput = useRef(null);
  const [success, setSucces] = useState(false);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state)=>state.token)
  const dispatch = useDispatch();
  
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const handleChange = async event => {
    const fileUploaded = event.target.files[0];

    var imgUrl = "";
    const cloudData = new FormData();
    cloudData.append("file", fileUploaded);
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
    
    var response = await fetch(`http://localhost:3001/users/${_id}/upload`, {
        method: "PATCH",
        body: JSON.stringify({
          imgUrl: imgUrl,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      dispatch(setAddRemoveUploads({uploads: data}));
      setSucces(true);
  };
  
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
  return (
    <>
      <button type="button" className={`${styles.uploadButton} pr-3`} onClick={handleClick}>
      <img src={upload} alt="" className='w-[21px] mr-2' />
      <p className={`${styles.paragraph1}`}>Upload a file</p>
      </button>
      <input type="file"
             ref={hiddenFileInput}
             onChange={handleChange}
             style={{display:'none'}} 
      /> 
      <Snackbar
          open={success}
          autoHideDuration={5000}
          onClose={closeNotification}
          message="Item has been uploaded!"
          action={action}
        />
    </>
  );
};
export default FileUploader;