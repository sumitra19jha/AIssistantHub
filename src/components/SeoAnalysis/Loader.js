import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading_circle}></div>
    </div>
  );
};

export default Loader;