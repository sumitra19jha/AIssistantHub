import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';


const Header = ({ title, onExport }) => {
    const navigate = useNavigate();
    const [isExportLoading, setExportIsLoading] = useState(false);

    const handleArrowBackClick = () => {
        navigate(-1);
    };

    const exportContent = async (event) => {
        try {
            setExportIsLoading(true);
            await onExport();
        } catch (error) {
            console.error("Some issue occurred!", error);
        } finally {
            setExportIsLoading(false);
        }
    };

    return (
        <div className={styles.content_editor_header}>
            <div className={styles.arrow_back_container} onClick={handleArrowBackClick}>
                <IoIosArrowBack className={styles.arrow_back_icon} />
            </div>

            {/* Title */}
            <h2 className={styles.header_title} title={title}>{title}</h2>

            <button className={`${styles.header_button} {styles.header_button_create_new}`} onClick={exportContent}>{isExportLoading ? <div className={styles.loading_spinner} /> : "Export"}</button>
 </div>
    );
};

export default Header;