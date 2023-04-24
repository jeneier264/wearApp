import React from 'react';
import styles from '../style';
import { Navbar, Hero, Footer, About } from '../components';


const HomePage = () => (
  <div className="bg-primary w-full overflow-hidden">
   
      <div className={`${styles.boxWidth} bg-white`}>
        <Navbar/>
      </div>
    


    <div class='hero__gradient'>
      <div className={` ${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`${styles.bgAbout} ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <About />
        
      </div>
    </div>
   
      <div className={`${styles.boxWidth} bg-white`}>
        <Footer />
      </div>
    

  </div>
);

export default HomePage;


