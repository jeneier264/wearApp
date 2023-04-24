import React from 'react'
import styles from '../style';
import instagram from "../assets/logo-instagram.svg";
import facebook from "../assets/logo-facebook.svg";
import youtube from "../assets/logo-youtube.svg";
import pinterest from "../assets/logo-pinterest.svg";

const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/",
  },
  {
    id: "social-media-2",
    icon: facebook,
    link: "https://www.facebook.com/",
  },
  {
    id: "social-media-3",
    icon: pinterest,
    link: "https://ru.pinterest.com/",
  },
  {
    id: "social-media-4",
    icon: youtube,
    link: "https://www.youtube.com/",
  },
];



const Footer = () => (
  <>
  <section className={`flex flex-row justify-center h-[90px] w-full border-black border-t p-6 items-center`}> 
    <div className='flex-col pr-6 md:mt-0 mt-6'>
      <h1 className={`${styles.heading2}`}>Follow us</h1>
    </div>
    <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
  </section>
  </>
  )


export default Footer