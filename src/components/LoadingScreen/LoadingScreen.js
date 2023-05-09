import React from 'react';
import styles from './LoadingScreen.module.css';

const LoadingScreen = () => {
    const texts = ['Analyzing Internet', 'Analyzing News', 'Analyzing Videos'];

    return (
        <div className={styles.loading_screen}>
            <div className={styles.space}></div>
            
            <div className={styles.earth}></div>

            <div className={styles.text_container}>
                {texts.map((text, index) => (
                    <h1 key={index} className={`${styles.loading_text} ${styles[`loading_text_${index + 1}`]}`}>{text}</h1>
                ))}
            </div>
            
            <div className={styles.nucleus}>
                {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className={`${styles.electron} ${styles[`electron_${i + 1}`]}`}></div>
                ))}
            </div>

            
        </div>
    );
};

export default LoadingScreen;