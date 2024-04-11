import Lottie from 'react-lottie';

import animationData from './data/loader.json';
import styles from './loader.module.css';
export const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className={styles['wrapper-loader']} data-test-id='loader'>
            <Lottie options={defaultOptions} height={150} width={150} />
        </div>
    );
};
