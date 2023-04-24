import React from 'react'
import styles from '../style'
import { Link } from "react-router-dom";
import { mainPageMedia } from '../constants'
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const img1 = mainPageMedia.find(el => el.id == "woman1");
  const img2 = mainPageMedia.find(el => el.id == "outfitsample");
  const navigate = useNavigate();

  return (

  <section id='home' className={`flex md:flex-col flex-col pt-10`}>
    <div className={`flex-1 ${styles.flexCenter} flex-row xl:px-0 sm:px-16 px-6 items-center`}>
      <img src={img1.image} alt="" className='h-[350px] pr-6'/>
      <img src={img2.image} alt="" className='h-[350px] pr-6'/>
    </div>

    <div className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6 items-center`}>
      <p className={`${styles.paragraph1} max-w-[470px] mt-6 mb-4`}>
          If you have always been interested in fashion or you just like planning outfits, 
          Wear App is a perfect lpace for you. Here you can search for new items, create outfits by mixing and meshing, 
          shop latests trends and get inspired by fashion lovers just like you
      </p>
        <button onClick={() => navigate("/create")} className={`${styles.getStartedButton}`}>
          Start creating!
        </button>
    </div>
  </section> )
};

export default Hero;
