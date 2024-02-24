import React from 'react'
import styles from './loader.module.css'
import Lottie from 'react-lottie';
import animationData from './data/loader.json'
const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };


  return (
      <div className={styles['wrapper-loader']}>
          <Lottie options={defaultOptions} height={150} width={150} />
      </div>
  );
}

export default Loader
