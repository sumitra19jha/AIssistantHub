import React, { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

import './Header.css';

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
        <div className="content-editor-header">
            <div className="arrow-back-container" onClick={handleArrowBackClick}>
                <IoIosArrowBack className="arrow-back-icon" />
            </div>

            {/* Title */}
            <h2 className="header-title" title={title}>{title}</h2>

            {/* Buttons */}
            <button className="header-button header-button-cancel" onClick={shareOnLinkedIn}>Share</button>
            
            <div className="vertical-divider" />

            <button className="header-button header-button-create-new" onClick={exportContent}>{isExportLoading ? <div className="loading-spinner" /> : "Export"}</button>
            <button className="header-button header-button-save" onClick={saveContent}>{isLoading ? <div className="loading-spinner" /> : "Save"}</button>
        </div>
    );
};

export default Header;