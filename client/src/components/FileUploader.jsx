import React from 'react';
import upload from '../assets/cloud-upload-outline.svg'
import styles from '../style';
import { itemSamples } from '../constants';

const FileUploader = props => {
  const hiddenFileInput = React.useRef(null);
  
  const handleClick = event => {

    console.log(itemSamples);
  };
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };
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
    </>
  );
};
export default FileUploader;