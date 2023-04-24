import React from 'react'
import styles from '../style'
import { mainPageMedia } from '../constants'


const NoContent = ({content}) => {
  const img = mainPageMedia.find(el => el.id == "mannequin");

  return (

  <section className={`flex p-6 h-full`}>
    <div className={`flex-1 ${styles.flexCenter} flex-row xl:px-0 sm:px-16 px-6 items-center`}>
      <img src={img.image} alt="" className='h-[300px] mr-6 opacity-70'/>
      <p className={`${styles.paragraph1}`}>{`No ${content} yet...`}</p>
    </div>
  </section> )
};

export default NoContent;
