import React from 'react';
import styles from './Header.module.css';

const Header = ({ name, onClose }) => {
    return (
        <div className={styles.headerContainer}>

            <h1 className={styles.title_social_media_dialog}>{name}</h1>
            <button className={styles.close_button_social_media_dialog} onClick={onClose}>
                &times;
            </button>
        </div>
    );
};

export default Header;
