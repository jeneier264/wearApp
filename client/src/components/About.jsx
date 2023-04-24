import React from 'react'
import styles from '../style'
import { mainPageMedia } from '../constants'

const img1 = mainPageMedia.find(el => el.id == "dresses")
const img2 = mainPageMedia.find(el => el.id == "woman2")

const About = () => (
    <section className={`flex md:flex-row flex-col ${styles.paddingY} justify-between`}>
      <div className={`flex-1 ${styles.flexStart} ${styles.heading1}  md:-rotate-90 md:px-0  items-center xs:rotate-0`}>
        Wear App
      </div>
      <div className={`flex-1 ${styles.flexStart} xl:px-0 items-center`}>
        <p className={`${styles.paragraph2}  mt-6 mb-4`}>
          Wide choice of items by category, color and price.
          Clothings and accessories for any occasion.
        </p>
      </div>
      <div className={`flex-1 ${styles.flexStart}  xl:px-0 items-center`} data-taos-offset="300">
      <img src={img1.image} alt="dresses" className='h-[360px]'/>
      </div>
      <div className={`flex-1 ${styles.flexStart}  xl:px-0 items-center`}>
        <p className={`${styles.paragraph2}  mt-6 mb-4`}>
          Shop directly from Wear App. Click on an item you would like to see in your wardrobe
          and purchase from the original website.
        </p>
      </div>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 items-center`}>
      <img src={img2.image} alt="shopping" className='h-[360px]'/>
      </div>
      
    </section>
  )

export default About
