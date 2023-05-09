import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.css';

const Header = ({ title, onSave, getContentHTML, onExport }) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isExportLoading, setExportIsLoading] = useState(false);

    const handleArrowBackClick = () => {
        navigate(-1);
    };

    const saveContent = async (event) => {
        try {
            setIsLoading(true);
            const content = getContentHTML();
            await onSave(content());
        } catch (error) {
            console.error("Some issue occurred!", error);
        } finally {
            setIsLoading(false);
        }
    };

    const exportContent = async (event) => {
        try {
            setExportIsLoading(true);
            const content = getContentHTML();
            await onExport(content());
        } catch (error) {
            console.error("Some issue occurred!", error);
        } finally {
            setExportIsLoading(false);
        }
    };

    const shareOnLinkedIn = () => {
        const shareUrl = `https://www.linkedin.com/`;
        window.open(shareUrl, '_blank');
    };

    return (
        <div className={styles.content_editor_header}>
            <div className={styles.arrow_back_container} onClick={handleArrowBackClick}>
                <IoIosArrowBack className={styles.arrow_back_icon} />
            </div>

            {/* Title */}
            <h2 className={styles.header_title} title={title}>{title}</h2>

            {/* Buttons */}
            <button className={`${styles.header_button} ${styles.header_button_cancel}`} onClick={shareOnLinkedIn}>Share</button>

            <div className={styles.vertical_divider} />

            <button className={`${styles.header_button} ${styles.header_button_create_new}`} onClick={exportContent}>{isExportLoading ? <div className={styles.loading_spinner} /> : "Export"}</button>
            <button className={`${styles.header_button} ${styles.header_button_save}`} onClick={saveContent}>{isLoading ? <div className={styles.loading_spinner} /> : "Save"}</button>
        </div>
    );
};

export default Header;